import React from 'react';
import {saveAs} from 'file-saver'
import {Button} from "flowbite-react";

const Finish = () => {

    const downloadImage = () => {
        saveAs('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqbsLiMpA4ji13w8oIxzkxfp-LWWX8ev9vicG6oJGaQ&s', 'image.jpg')
    }
    return (
        <div className="flex flex-col justify-center items-center w-100">
            <div className="flex flex-col justify-center -space-y-14">
                <p className="dark:text-gray-400">
                    Спасибо за покупку! Вы можете скачать билет или посмотреть его в личном кабинете.
                    <Button color="gray" onClick={downloadImage} className={"flex flex-col mt-10"}>
                        Скачать билет
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default Finish;