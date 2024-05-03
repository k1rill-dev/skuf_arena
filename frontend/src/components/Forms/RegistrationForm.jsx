import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({
            email: email,
            password: password,
            name: name,
            surname: surname
        });
        nav('/login')
        // let userData = {
        //     email: email,
        //     password: password
        // }
        // const userInfo = await loginUser(userData).then(
        //     r => {
        //         return JSON.stringify(r, null, 4)
        //     })
        // try {
        //     if ("Success" in JSON.parse(userInfo))
        //         localStorage.setItem("userInfo", userInfo);
        //     nav('/index')
        // } catch (e) {
        //
        // }
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