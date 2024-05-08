import React, {useState} from 'react';
import {Datepicker} from "flowbite-react";
import formatDate from "../../tools/formatDate";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import getCookie from "../../tools/getCookie";

const EditProfileForm = ({user}) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.avatar);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(user.date_of_birth));
    const [newAvatar, setNewAvatar] = useState(null);
    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('date_of_birth', formatDate(dateOfBirth));
        if (newAvatar) {
            formData.append('avatar', newAvatar);
        }

        try {
            const response = await axios.patch('http://localhost:8000/api/auth/update-profile/' + user.id,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    withCredentials: true
                });
            response.data.Success = "Login successfully"
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            nav('/profile')
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
        }

    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file);
            setAvatar(URL.createObjectURL(file));
        }
    };
    const handleDateChange = (date) => {
        setDateOfBirth(date);
    };
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                    <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">Фото профиля</label>
                    <img src={avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2"/>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                    <label htmlFor="avatar"
                           className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Изменить</label>
                </div>
                <div className={"mb-8 mx-auto"}>
                    <label htmlFor="dateOfBirth" className="block text-gray-700 font-bold mb-2">
                        Дата рождения
                    </label>
                    <Datepicker
                        defaultDate={dateOfBirth}
                        onSelectedDateChanged={handleDateChange}
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Имя</label>
                    <input
                        type="text"
                        id="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Фамилия</label>
                    <input
                        type="text"
                        id="name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save
                </button>
            </form>
        </div>
    );
};

export default EditProfileForm;
