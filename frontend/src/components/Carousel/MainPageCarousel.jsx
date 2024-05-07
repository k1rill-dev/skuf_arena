import React from 'react';
import {Carousel} from "flowbite-react";

const MainPageCarousel = ({concerts}) => {
    if (concerts && concerts.length > 1) {
        return (
            <div className="container px-2 py-4 mx-auto flex flex-wrap rounded-md ">
                <Carousel pauseOnHover slideInterval={3000} className="lg:w-2/3 mx-auto">
                    {concerts.map((concert, index) => (
                        <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4 rounded-md">
                            <img alt="gallery"
                                 className="w-full object-cover h-full object-center block opacity-100 brightness-50 absolute inset-0 rounded-md"
                                 src={"http://127.0.0.1:8000" + concert.photo_concert.photo}></img>
                            <div className="text-center relative z-10 w-full">
                                <a href={"/concert/" + concert.id}
                                   className="text-2xl text-white font-bold title-font mb-2">{concert.artist}</a>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    }
    return (
        <div className="container px-2 py-4 mx-auto flex flex-wrap rounded-md">
            <Carousel pauseOnHover slideInterval={3000} className="mx-auto">
                <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4 rounded-md">
                    <img alt="gallery"
                         className="w-full object-cover h-full object-center block opacity-100 brightness-50 absolute inset-0 rounded-md"
                         src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUKYp45hHgAtINjEKQu9Z2nvPzoYXYfD1AlVzQmwV-A&s"}></img>
                    <div className="text-center relative z-10 w-full">
                        <a href={"props.link"}
                           className="text-2xl text-white font-bold title-font mb-2">концерт ага</a>
                    </div>
                </div>
                <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4 rounded-md">
                    <img alt="gallery"
                         className="w-full object-cover h-full object-center block opacity-100 brightness-50 absolute inset-0 rounded-md"
                         src={"https://images.genius.com/7cb68026fa87bf12459ba05396bf09d5.800x450x1.jpg"}></img>
                    <div className="text-center relative z-10 w-full">
                        <a href={"props.link"}
                           className="text-2xl text-white font-bold title-font mb-2">концерт ага</a>
                    </div>
                </div>
                <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4 rounded-md">
                    <img alt="gallery"
                         className="w-full object-cover h-full object-center block opacity-100 brightness-50 absolute inset-0 rounded-md"
                         src={"https://i.ytimg.com/vi/BZ-zzoOdHM8/maxresdefault.jpg"}></img>
                    <div className="text-center relative z-10 w-full">
                        <a href={"props.link"}
                           className="text-2xl text-white font-bold title-font mb-2">концерт ага</a>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default MainPageCarousel;