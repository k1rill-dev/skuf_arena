import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {FaVk} from 'react-icons/fa'; // Импорт иконки VK
import CustomCarousel from "../Carousel/CustomCarousel";
import CardComponent from "../Card/CardComponent";
import {Button} from "flowbite-react";
import BuyTicketForm from "../Forms/BuyTicketForm";
import axios from "axios";

const Concert = ({...props}) => {
    const [concerts, setConcerts] = useState([]);
    const [concertInfo, setConcertInfo] = useState({});
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const handleModal = (state) => {
        setOpenModal(state)
    }
    const params = useParams();
    const id = Number(params.id);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://127.0.0.1:8000/api/concert/' + id + '/');
                const {data: response_next} = await axios.get('http://127.0.0.1:8000/api/concerts');
                setConcerts(response_next.results)
                setConcertInfo(response);
                setUrl(response.videos[0].video)
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
     const authCheck = () => {
        try {
            if (JSON.parse(localStorage.userInfo).Success === "Login successfully")
                return true;
        } catch (e) {
            return false;
        }
        return false;
    }
    const isAuthorized = authCheck();
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*[&?]v=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading && <div>Loading</div>}
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-3/4 lg:pr-4">
                    <CustomCarousel concert={concertInfo}/>
                    <div className="bg-gray-100 rounded-lg p-6 mt-4 lg:mt-0">
                        <h1 className="text-3xl font-bold">{concertInfo.artist}</h1>
                        <p className="text-gray-500 mt-2">{concertInfo.date}</p>
                        <p className="text-gray-500 mt-2">{concertInfo.location}</p>
                        <p className="text-lg mt-4">{concertInfo.description}</p>
                        <div className="mt-4 flex items-center">
                            {isAuthorized ?
                                <div>
                                    <Button onClick={() => setOpenModal(true)}>Купить билет</Button>
                                    <BuyTicketForm concertInfo={concertInfo} openModal={openModal}
                                                   handleModal={handleModal}/>
                                </div>
                                : <a href={"/login"}>Чтобы купить билет - авторизируйтесь</a>
                            }

                        </div>
                        <div className="mt-4 flex items-center">
                            <FaVk className="mr-2" size={24}/>
                            <a href={concertInfo.vk_event}><p className="text-gray-500">Группа в VK</p></a>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Видео</h2>
                        <div className="w-full h-screen">
                            <iframe
                                title="concert-video"
                                src={"https://www.youtube.com/embed/" + match[1]}
                                frameBorder="0"
                                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/4 mt-4 lg:mt-0">
                    <h2 className="text-2xl font-bold mb-4 hidden lg:block">Рекомендуемое</h2>
                    <div className="lg:flex lg:flex-col lg:items-start lg:justify-start">
                        <div className="lg:hidden">
                            <h2 className="text-2xl font-bold mb-4">Рекомендуемое</h2>
                        </div>
                        {concerts.map((item) => (
                            <CardComponent class={"max-w-md flex w-64 h-96 overflow-hidden"} id={item.id}
                                           name={item.title} artist={item.artist} date={item.date}
                                           price={item.price.price}
                                           img={"http://127.0.0.1:8000/" + item.photo_concert.photo}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Concert;
