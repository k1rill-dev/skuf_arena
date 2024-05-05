import React, { useState } from 'react';
const userData = {
  name: 'John Doe',
  bio: 'Frontend Developer',
  email: 'john@example.com',
  location: 'New York, USA',
  avatar: 'https://via.placeholder.com/150' // Замените на другую ссылку на изображение
};
const EditProfileForm = ({  onSave }) => {
  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.bio);
  const [email, setEmail] = useState(userData.email);
  const [location, setLocation] = useState(userData.location);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [newAvatar, setNewAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name: name,
      bio: bio,
      email: email,
      location: location,
      avatar: newAvatar ? URL.createObjectURL(newAvatar) : avatar
    };
    onSave(updatedUser);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
          <img src={avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label htmlFor="avatar" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Change</label>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          ></textarea>
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
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
