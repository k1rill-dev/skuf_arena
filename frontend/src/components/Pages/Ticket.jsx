import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import getCookie from "../../tools/getCookie";

const ticket = {qrCode: 'ticket1_qr_code_data', event: 'Concert A'}

const Ticket = ({...props}) => {
    const [ticket, setTicket] = useState({});
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const id = Number(params.id);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://localhost:8000/api/tickets/' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    withCredentials: true
                });
                setTicket(response)
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    if (!loading) {
        return (
            <div className="max-w-xl mx-auto mb-100 p-8 bg-white rounded-lg shadow-lg md:w-3/4 lg:w-1/2 xl:w-2/5">
                <div className="mb-8">
                    <img
                        src={ticket.qr_code}
                        alt="QR Code" className="mx-auto w-64 md:w-full"/>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Покупатель:</h2>
                    <p>{props.user.email}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Места:</h2>
                    <p>{ticket.price.place}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Что за концерт:</h2>
                    <p>{ticket.event.title}</p>
                    <p>{ticket.event.artist}</p>
                    <p>{ticket.event.address}</p>
                    <p>{ticket.event.date}</p>
                </div>
            </div>
        );
    } else {
        <div>Loading</div>
    }


};

export default Ticket;