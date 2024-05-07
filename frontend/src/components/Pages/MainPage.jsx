import React, {useEffect, useState} from 'react';
import CardComponent from "../Card/CardComponent";
import SubscribeForm from "../Forms/SubscribeForm";
import axios from "axios";
import MainPageCarousel from "../Carousel/MainPageCarousel";

const MainPage = () => {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://localhost:8000/api/concerts');
                setConcerts(response.results)
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    return (
        <div>
            {loading && <div>Loading</div>}
            <MainPageCarousel concerts={concerts}/>
            <h1 className={"text-center text-xl font-bold"}>Популярные концерты</h1>
            <div className="mt-4"></div>
            <div className="flex flex-wrap items-center justify-center space-x-4">
                {concerts.map((item) => (
                    <CardComponent class={"max-w-md flex w-80 h-100 overflow-hidden"} id={item.id} name={item.title} artist={item.artist} date={item.date}
                                   price={item.price.price}
                                   img={"http://127.0.0.1:8000/" + item.photo_concert.photo}/>
                ))}
            </div>
            <div className="mt-4"></div>
            <SubscribeForm/>
        </div>
    );
};

export default MainPage;
