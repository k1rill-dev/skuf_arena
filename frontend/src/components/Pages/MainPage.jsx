import React from 'react';
import CustomCarousel from "../Carousel/CustomCarousel";
import {Card} from "flowbite-react";
import CardComponent from "../Card/CardComponent";

const MainPage = () => {
    return (
        <div>
            <CustomCarousel/>
            <h1 className={"text-center text-xl font-bold"}>Популярные концерты</h1>
            <div className="mt-4"></div>
            <div className="flex flex-wrap items-center justify-center space-x-4">
                <CardComponent img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
                <CardComponent img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
                <CardComponent img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
                <CardComponent img={"https://sun9-51.userapi.com/impg/5WTBMDvL7_d7egKXCc8Db8kcHBdDpb6jdTtB2Q/lXmsIV60tGo.jpg?size=960x960&quality=95&sign=acff66a3bcd6754797ae248fb0b11e6a&type=album"}/>
            </div>
        </div>
    );
};

export default MainPage;
