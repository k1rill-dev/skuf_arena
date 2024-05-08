import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Datepicker} from "flowbite-react";
import formatDate from "../../tools/formatDate";
import getCookie from "../../tools/getCookie";

async function createUser(dataUser) {
    try {
        console.log(dataUser);
        // 👇️ const data: CreateUserResponse
        const {data, status} = await axios.post(
            'http://localhost:8000/api/auth/register',
            dataUser,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': getCookie("csrftoken"),
                },
                withCredentials: true
            },
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            // 👇️ error: AxiosError<any, any>
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}


const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPassword = (event) => {
        setRepeatPassword(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);

    }

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let userData = {
            email: email,
            username: makeid(10),
            first_name: name,
            last_name: surname,
            password1: password,
            password2: repeatPassword,
            date_of_birth: formatDate(dateOfBirth),
        }

        const userInfo = await createUser(userData).then(
            r => {
                return JSON.stringify(r, null, 4)
            })
        try {
            if ("Success" in JSON.parse(userInfo))
                localStorage.setItem("userInfo", userInfo);
            nav('/login')
        } catch (e) {

        }
    };
    const handleDateChange = (date) => {
        setDateOfBirth(date);
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img
                        className="mx-auto h-12 w-auto"
                        src=""
                        alt="СкуфАрена"
                    />
                    <h2 className="text-2xl font-semibold mt-4">Регистрация на Скуф Арене</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={email}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                            Фамилия
                        </label>
                        <input
                            id="surname"
                            name="surname"
                            type="text"
                            autoComplete="surname"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={surname}
                            onChange={handleSurnameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                            Дата рождения
                        </label>
                        <Datepicker
                            onSelectedDateChanged={handleDateChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Повторите пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={repeatPassword}
                            onChange={handleRepeatPassword}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 font-medium text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            Регистрация
                        </button>
                        <a href={"/login"}
                           className="text-sm text-indigo-600 hover:underline">
                            Есть аккаунт? Войти.
                        </a>
                    </div>
                </form>
                {errorMessage && (
                    <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default RegistrationForm;