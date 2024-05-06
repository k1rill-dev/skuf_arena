import React, {useState} from 'react';

const Payment = ({goNext}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');

    const formatCardNumber = (value) => {
        // Функция форматирования номера карты (добавление пробелов после каждых 4 цифр)
        return value.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const handleCardNumberChange = (e) => {
        // Функция изменения номера карты с форматированием и ограничением длины
        const formattedValue = formatCardNumber(e.target.value.replace(/\s/g, ''));
        if (formattedValue.length <= 19) {
            setCardNumber(formattedValue);
        }
    };

    const handleExpiryChange = (e) => {
        // Функция изменения срока действия карты с автоматической подстановкой символа "/" и ограничением на количество символов
        let value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`; // Добавляем символ "/" после первых двух цифр
        }
        setExpiry(value.slice(0, 7)); // Ограничиваем количество символов
    };

    const handleCvvChange = (e) => {
        // Функция изменения CVV с ограничением на количество символов
        const value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardNumber === '' || expiry === '' || cvv === '' || name === '') {
            alert('Заполните все поля!');
        } else {
            console.log('Форма отправлена');
            goNext();
            // Добавьте здесь логику для обработки отправки формы
        }
    };

    return (
        <div className="container mt-8"> {/* Используем классы из Flowbite для контейнера */}
            <form onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> {/* Убираем лишние классы и устанавливаем отступы внутри формы */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> {/* Используем классы Tailwind для респонсивности */}
                    <div>
                        <label htmlFor="card-number" className="block text-sm font-bold mb-2">Номер карты</label>
                        <input
                            type="text"
                            id="card-number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Номер карты"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="expiry" className="block text-sm font-bold mb-2">Срок действия</label>
                        <input
                            type="text"
                            id="expiry"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="MM/YYYY"
                            value={expiry}
                            onChange={handleExpiryChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-sm font-bold mb-2">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleCvvChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2">Имя на карте</label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Имя на карте"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center mt-4"> {/* Устанавливаем отступ для кнопки */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Оплатить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
