import React from "react";

const Form = ({ getWeather }) => {
  return (
    <form onSubmit={getWeather} className="mb-4">
      <div className="flex items-center justify-center">
        <input type="text" name="city" placeholder="City..." className="border border-gray-300 rounded py-2 px-4 mr-2" />
        <input type="text" name="country" placeholder="Country..." className="border border-gray-300 rounded py-2 px-4 mr-2" />
        <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Forecast Weather</button>
      </div>
    </form>
  );
};

export default Form;
