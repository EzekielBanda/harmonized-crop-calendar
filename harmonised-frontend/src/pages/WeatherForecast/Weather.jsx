import React from "react";

const Weather = ({ temperature, city, country, humidity, pressure, windSpeed, sunrise, sunset, icon, error }) => {
  return (
    <div className="text-white mb-8">
      {city && country && <p className="text-2xl">{city}, {country}</p>}
      {temperature && <p>Temperature: {temperature}</p>}
      {humidity && <p>Humidity: {humidity}</p>}
      {pressure && <p>Pressure: {pressure}</p>}
      {windSpeed && <p>Wind Speed: {windSpeed}</p>}
      {sunrise && <p>Sunrise: {sunrise}</p>}
      {sunset && <p>Sunset: {sunset}</p>}
      {icon && <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Weather;
