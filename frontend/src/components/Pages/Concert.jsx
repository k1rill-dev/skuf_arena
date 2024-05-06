import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {FaVk} from 'react-icons/fa'; // Импорт иконки VK
import CustomCarousel from "../Carousel/CustomCarousel";
import CardComponent from "../Card/CardComponent";
import {Button, Modal} from "flowbite-react";
import BuyTicketForm from "../Forms/BuyTicketForm";

const Concert = ({...props}) => {
    const [openModal, setOpenModal] = useState(false);
    const handleModal = (state) => {
        setOpenModal(state)
    }
    const params = useParams();
    const id = Number(params.id);
    const concertInfo = {
        id: 1,
        artist: "Some Artist",
        date: "2024-05-04",
        venue: "Some Venue",
        location: "Some Location",
        description: "Some Description",
        imageUrl: "https://example.com/image.jpg"
    };
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-3/4 lg:pr-4">
                    <CustomCarousel/>
                    <div className="bg-gray-100 rounded-lg p-6 mt-4 lg:mt-0">
                        <h1 className="text-3xl font-bold">{concertInfo.artist}</h1>
                        <p className="text-gray-500 mt-2">{concertInfo.date}</p>
                        <p className="text-gray-500 mt-2">{concertInfo.venue}, {concertInfo.location}</p>
                        <p className="text-lg mt-4">{concertInfo.description}</p>
                        <div className="mt-4 flex items-center">
                            <Button onClick={() => setOpenModal(true)}>Купить билет</Button>
                            <BuyTicketForm openModal={openModal} handleModal={handleModal} />
                        </div>
                        <div className="mt-4 flex items-center">
                            <FaVk className="mr-2" size={24}/>{/* Иконка VK */}
                            <a href={"https://vk.com"}><p className="text-gray-500">Группа в VK</p></a>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4">Видео</h2>
                        <div className="w-full h-screen">
                            <iframe
                                title="concert-video"
                                src="https://www.youtube.com/embed/PLToBW9oiRA"
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
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Concert;
