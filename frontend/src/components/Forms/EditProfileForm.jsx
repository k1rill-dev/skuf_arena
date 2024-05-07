import React, {useState} from 'react';
import {Datepicker} from "flowbite-react";
import formatDate from "../../tools/formatDate";


const EditProfileForm = ({user}) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.avatar);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(user.date_of_birth));
    const [newAvatar, setNewAvatar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            email: email,
            avatar: newAvatar ? URL.createObjectURL(newAvatar) : avatar
        };

    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file);
            setAvatar(URL.createObjectURL(file));
        }
    };
    const handleDateChange = (date) => {
        setDateOfBirth(formatDate(date));
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
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Имя</label>
                    <input
                        type="text"
                        id="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Фамилия</label>
                    <input
                        type="text"
                        id="name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className={"mb-4"}>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Дата рождения
                    </label>
                    <Datepicker
                        defaultDate={dateOfBirth}
                        onSelectedDateChanged={handleDateChange}
                    />

                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save
                </button>
            </form>
        </div>
    );
};

export default EditProfileForm;
