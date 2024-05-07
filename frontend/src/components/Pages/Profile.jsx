import React, { useState, useEffect } from 'react';
import { Button } from "flowbite-react";
import axios from "axios";

const Profile = ({ user }) => {
  const [tickets, setTickets] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:8000/api/tickets/ticket', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true
        });
        setTickets(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative pb-2/3">
        <img
          src={user.avatar ? `http://127.0.0.1:8000/${user.avatar}` : "https://via.placeholder.com/150"}
          alt={user.name}
          className="flex h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-gray-800">{user.first_name} {user.last_name}</h2>
        <div className="mt-4">
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Дата рождения: {user.date_of_birth}</p>
          <a href="/edit-profile">
            <Button color="gray" className="mt-2">
              Изменить профиль
            </Button>
          </a>
        </div>
        <div className="mt-8">
          {loading ?
            <div>Loading...</div> :
            Object.keys(tickets).length !== 0 && tickets.constructor === Object ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">Купленные билеты</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img
                      src={`http://localhost:8000/${tickets.qr_code}`}
                      alt={`QR Code for ticket`}
                      className="mx-auto mb-2"
                    />
                    <p className="text-center text-gray-700">{tickets.event.artist}</p>
                    <a href={`/ticket/${tickets.id}`} className="text-blue-500 block text-center mt-2">Просмотреть...</a>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-4">Билетов нет</h3>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
