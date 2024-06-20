import React, { useState } from 'react';

const Form = ({ getWeather }) => {
  const [district, setDistrict] = useState('');
  const [crop, setCrop] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(district, crop);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center justify-center">
        <input
          type="text"
          name="district"
          placeholder="District..."
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mr-2"
        />
        <input
          type="text"
          name="crop"
          placeholder="Crop..."
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Calendar
        </button>
      </div>
    </form>
  );
};

export default Form;
