import React, {useEffect, useState} from 'react';
import CardComponent from "../Card/CardComponent";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Concerts = () => {

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/concerts?page=1")
            .then((res) => setItems(res.data.results))
            .catch((err) => console.log(err));
    }, []);

    const fetchMoreData = () => {
        axios
            .get(`http://127.0.0.1:8000/api/concerts?page=${index}`)
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data.results]);
                res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
            })
            .catch((err) => console.log(err));

        setIndex((prevIndex) => prevIndex + 1);
    };
    console.log(items)
    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div><br></br><br></br></div>}
        >
            <div className='flex flex-wrap items-center justify-center space-x-4 space-y-7'>
                {items &&
                    items.map((item) => <CardComponent className={"max-w-xs"} id={item.id} name={item.title} artist={item.artist}
                                                       date={item.date} price={item.price.price}
                                                       img={"http://127.0.0.1:8000" + item.photo_concert.photo}/>)}
            </div>
        </InfiniteScroll>
    );

    // return (
    //     <div className={"flex flex-wrap items-center justify-center space-x-4 space-y-4"}>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //         <CardComponent className={"max-w-xs"}
    //                        img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
    //     </div>
    // );
};

export default Concerts;