import React from 'react';
import {saveAs} from 'file-saver'
import {Button} from "flowbite-react";

const Finish = ({tickets}) => {

    const downloadImage = () => {
        saveAs("http://127.0.0.1:8000" + tickets.qr_code, 'image.jpg')
    }
    return (
        <div className="flex flex-col justify-center items-center w-100">
            <div className="flex flex-col justify-center -space-y-14">
                <img src={"http://127.0.0.1:8000" + tickets.qr_code} alt="" />
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