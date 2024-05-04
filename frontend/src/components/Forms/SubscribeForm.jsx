import React, { useState } from 'react';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлен email:', email);
    setEmail('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-4">Подпишитесь на нашу рассылку</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center w-full">
        <input
          type="email"
          className="flex-grow appearance-none bg-transparent border-b border-teal-500 w-full sm:w-auto text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm text-white py-2 px-4 rounded mt-4 sm:mt-0"
          type="submit"
        >
          Подписаться
        </button>
      </form>
    </div>
  );
};
export default SubscribeForm;
