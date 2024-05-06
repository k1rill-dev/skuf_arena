import React, {useState, useEffect} from 'react';
import {Button} from "flowbite-react";

// Тестовые данные пользователя и QR-кодов
const userData = {
    name: 'John Doe',
    bio: 'Frontend Developer',
    email: 'john@example.com',
    location: 'New York, USA',
    avatar: 'https://via.placeholder.com/150' // Замените на другую ссылку на изображение
};


const ticketsData = [
    {qrCode: 'ticket1_qr_code_data', event: 'Concert A'},
    {qrCode: 'ticket2_qr_code_data', event: 'Concert B'},
    {qrCode: 'ticket3_qr_code_data', event: 'Concert C'}
];

const Profile = () => {
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        // Эмуляция загрузки данных
        setTimeout(() => {
            setUser(userData);
            setTickets(ticketsData);
        }, 1000); // задержка для эмуляции загрузки данных
    }, []);

    if (!user) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative pb-2/3">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="flex h-full w-full object-cover"
                />
            </div>
            <div className="p-6">
                <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 mt-2">{user.bio}</p>
                <div className="mt-4">
                    <p className="text-gray-700">Email: {user.email}</p>
                    <p className="text-gray-700">Location: {user.location}</p>
                    <a href={'/edit-profile'}>
                        <Button color="gray" className={"flex flex-col mt-2"}>
                            Изменить профиль
                        </Button>
                    </a>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Purchased Tickets</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tickets.map((ticket, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticket.qrCode}`}
                                    alt={`QR Code for ticket ${index + 1}`}
                                    className="mx-auto mb-2"
                                />
                                <p className="text-center text-gray-700">{ticket.event}</p>
                                <a href={'/ticket/' + ticket.id}>
                                        Просмотреть...
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
