import React from 'react';
import {Button} from "flowbite-react";

const SubmitTickets = ({tickets, clearCart}) => {
    return (
        <div className="flex flex-col justify-center items-center w-100">
            <div className="flex flex-col justify-center -space-y-14">
                <p className="dark:text-gray-400">
                    Выбранные билеты: {tickets.map(ticket => (
                    <a>{ticket.zone} {ticket.placeNum}, </a>
                ))}
                </p>
            </div>
            <Button color="gray" onClick={() => clearCart()} className={"flex flex-col mt-10"}>
                Очистить корзину
            </Button>
        </div>
    );
};

export default SubmitTickets;