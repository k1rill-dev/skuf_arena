import React, {useState} from 'react';

const ChooseTicket = ({tickets, setTickets}) => {
    const [zoneInfo, setZoneInfo] = useState(null);

    const handleZoneClick = (zone, price, placeNum) => {
        setZoneInfo({zone, price, placeNum});
    };

    const handleAddToCart = () => {
        if(zoneInfo){
            setTickets([...tickets, zoneInfo])
        }
    };

    const handleCloseInfo = () => {
        setZoneInfo(null);
    };

    const balconySeats = Array.from({length: 10}, (_, index) => index + 1);

    return (
        <div className="flex flex-col justify-center items-center w-100">
            <div
                className="w-full md:max-w-lg h-24 bg-gray-200 opacity-50 cursor-pointer flex justify-center items-center text-center mb-4 rounded-lg mt-0"
                onClick={() => handleZoneClick('Фан-зона', '$50', null)}
            >
                <span>Фан-зона</span>
            </div>
            <div
                className="w-full md:max-w-lg h-24 bg-gray-200 opacity-50 cursor-pointer flex justify-center items-center text-center mb-4 rounded-lg"
                onClick={() => handleZoneClick('Танцпол', '$100', null)}
            >
                <span>Танцпол</span>
            </div>
            <div
                className="w-full md:max-w-lg bg-gray-200 opacity-50 flex flex-col justify-center items-center text-center mb-4 rounded-lg relative mb-0">
                <span className="mb-2">Балкон</span>
                <div className="flex flex-wrap justify-center">
                    {balconySeats.map(seat => (
                        <button
                            key={seat}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2 mb-2"
                            onClick={() => handleZoneClick('Балкон', '$75', seat)}
                        >
                            Место {seat}
                        </button>
                    ))}
                </div>
            </div>
            {zoneInfo && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white border border-gray-300 rounded shadow">
                    <p>{zoneInfo.zone}: Цена - {zoneInfo.price}</p>
                    <button className="bg-blue-500 text-white px-2 py-1 mt-2 rounded hover:bg-blue-600 mr-2"
                            onClick={handleAddToCart}>Добавить в корзину
                    </button>
                    <button className="bg-gray-300 text-gray-800 px-2 py-1 mt-2 rounded hover:bg-gray-400"
                            onClick={handleCloseInfo}>Закрыть
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChooseTicket;
