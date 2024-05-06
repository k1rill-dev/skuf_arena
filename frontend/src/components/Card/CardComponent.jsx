import React from 'react';
import { Button, Card } from "flowbite-react";

const CardComponent = ({ ...props }) => {
    let date = new Date(props.date);

    return (
        <Card className={props.class}>
            <div className="relative h-64 overflow-hidden">
                <img
                    className="object-cover w-full h-full rounded-lg"
                    src={props.img}
                    alt="Meaningful alt text for an image that is not purely decorative"
                />
            </div>
            <div className="p-2">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    {props.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                    {props.artist}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                    {date.getDay()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:
                    {date.getMinutes() < 10 ? (
                        <span>0{date.getMinutes()}</span>
                    ) : (
                        <span>{date.getMinutes()}</span>
                    )}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                    От {props.price} &#8381;
                </p>
                <a href={"/concert/" + props.id}>
                    <Button>
                        Купить билет
                        <svg
                            className="-mr-1 ml-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </a>
            </div>
        </Card>
    );
};

export default CardComponent;
