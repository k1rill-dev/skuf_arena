import React, { useEffect, useState } from 'react';
import CardComponent from '../Card/CardComponent';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Concerts = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/concerts?page=1')
            .then((res) => {
                setItems(res.data.results);
                setFilteredItems(res.data.results);
            })
            .catch((err) => console.log(err));
    }, []);

    const fetchMoreData = () => {
        axios
            .get(`http://127.0.0.1:8000/api/concerts?page=${index}`)
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data.results]);
                setFilteredItems((prevItems) => [...prevItems, ...res.data.results]);
                res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
            })
            .catch((err) => console.log(err));

        setIndex((prevIndex) => prevIndex + 1);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filterItems = (item) => {
        return (
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.artist.toLowerCase().includes(searchText.toLowerCase()));
    };

    const sortItems = (a, b) => {
        if (sortBy === 'price') {
            return a.price.price - b.price.price;
        } else if (sortBy === 'date') {
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Поиск по названию, артисту или тэгам"
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 ml-2"
                >
                    <option value="">Сортировать по</option>
                    <option value="price">Цене</option>
                    <option value="date">Дате</option>
                </select>
            </div>
            <InfiniteScroll
                dataLength={filteredItems.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div key={0}>Загрузка...</div>}
            >
                <div className="flex flex-wrap items-center justify-center space-x-4 space-y-7">
                    {filteredItems.length > 0 &&
                        filteredItems
                            .filter(filterItems)
                            .sort(sortItems)
                            .map((item) => (
                                <CardComponent
                                    key={item.id}
                                    className={'max-w-xs'}
                                    id={item.id}
                                    name={item.title}
                                    artist={item.artist}
                                    date={item.date}
                                    price={item.price.price}
                                    img={'http://127.0.0.1:8000' + item.photo_concert.photo}
                                />
                            ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Concerts;
