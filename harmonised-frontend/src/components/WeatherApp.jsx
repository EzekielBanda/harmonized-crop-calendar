import React from 'react';
import Forecast from '../pages/WeatherForecast/Forecast';
import Form from '../pages/WeatherForecast/Form';
import Weather from '../pages/WeatherForecast/Weather';

const API_KEY = "034fa1f439d5c604451a9f3fa492ab36";

class WeatherApp extends React.Component {
  state = {
    currentTemperature: undefined,
    currentCity: undefined,
    currentCountry: undefined,
    currentHumidity: undefined,
    currentPressure: undefined,
    currentWindSpeed: undefined,
    currentSunrise: undefined,
    currentSunset: undefined,
    currentIcon: undefined,
    error: undefined,
    forecast: []
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    try {
      const current_weather_api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`);
      const current_weather_data = await current_weather_api_call.json();

      const forecast_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`);
      const forecast_data = await forecast_api_call.json();

      if (current_weather_data.cod === '404' || forecast_data.cod === '404') {
        throw new Error("City not found");
      }

      const filteredForecast = forecast_data.list.filter((day, index) => index % 8 === 0).slice(0, 7);
      this.setState({
        currentTemperature: current_weather_data.main.temp + " °C",
        currentCity: current_weather_data.name,
        currentCountry: current_weather_data.sys.country,
        currentHumidity: current_weather_data.main.humidity + " %",
        currentPressure: current_weather_data.main.pressure + " hPa",
        currentWindSpeed: current_weather_data.wind.speed + " m/s",
        currentSunrise: new Date(current_weather_data.sys.sunrise * 1000).toLocaleTimeString(),
        currentSunset: new Date(current_weather_data.sys.sunset * 1000).toLocaleTimeString(),
        currentIcon: current_weather_data.weather[0].icon,
        error: "",
        forecast: [{ label: 'Current Weather', ...current_weather_data }, ...filteredForecast]
      });
    } catch (error) {
      this.setState({
        currentTemperature: undefined,
        currentCity: undefined,
        currentCountry: undefined,
        currentHumidity: undefined,
        currentPressure: undefined,
        currentWindSpeed: undefined,
        currentSunrise: undefined,
        currentSunset: undefined,
        currentIcon: undefined,
        error: "City not found",
        forecast: []
      });
    }
  }

  render() {
    return (
      <div className="bg-green-500  min-h-screen flex flex-col justify-center items-center">
        <Form getWeather={this.getWeather} />
        <Weather
          temperature={this.state.currentTemperature}
          city={this.state.currentCity}
          country={this.state.currentCountry}
          humidity={this.state.currentHumidity}
          pressure={this.state.currentPressure}
          windSpeed={this.state.currentWindSpeed}
          sunrise={this.state.currentSunrise}
          sunset={this.state.currentSunset}
          icon={this.state.currentIcon}
          error={this.state.error}
        />
        <Forecast forecast={this.state.forecast} />
      </div>
    );
  }
}

export default WeatherApp;
