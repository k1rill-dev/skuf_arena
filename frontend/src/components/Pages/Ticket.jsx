import React from 'react';
import {useParams} from "react-router-dom";

const ticket = {qrCode: 'ticket1_qr_code_data', event: 'Concert A'}

const Ticket = ({...props}) => {
    const params = useParams();
    const id = Number(params.id);


    return (
        <div className="max-w-xl mx-auto mb-100 p-8 bg-white rounded-lg shadow-lg md:w-3/4 lg:w-1/2 xl:w-2/5">
            <div className="mb-8">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWUTqAhTw20Z-XS0LRKM2CzjKetp93S9CYPoQdaHUdw&s" alt="QR Code" className="mx-auto w-64 md:w-full"/>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Buyer Information:</h2>
                <p>buyer</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Selected Seats:</h2>
                <p>места</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Concert Information:</h2>
                <p>concertInfo</p>
            </div>
        </div>
    );

};

export default Ticket;