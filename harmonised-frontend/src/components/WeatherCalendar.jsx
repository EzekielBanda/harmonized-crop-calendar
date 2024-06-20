// import React from 'react';
// import Form from './Form';
// import Weather from './Weather';
// import Calendar from './Calendar'; // Assume you have a Calendar component

// const API_KEY = "your_openweathermap_api_key";

// class WeatherApp extends React.Component {
//   state = {
//     district: '',
//     crop: '',
//     weatherData: null,
//     error: '',
//     calendarData: null
//   };

//   getWeather = async (district, crop) => {
//     try {
//       // Fetch weather data from OpenWeatherMap
//       const weather_api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${district}&units=metric&appid=${API_KEY}`);
//       const weather_data = await weather_api_call.json();

//       // Fetch crop calendar data from your backend
//       const calendar_api_call = await fetch(`your_backend_url/crop-calendar?district=${district}&crop=${crop}`);
//       const calendar_data = await calendar_api_call.json();

//       // Update state with fetched data
//       this.setState({
//         district: district,
//         crop: crop,
//         weatherData: weather_data,
//         calendarData: calendar_data,
//         error: ''
//       });
//     } catch (error) {
//       // Handle errors
//       this.setState({
//         weatherData: null,
//         calendarData: null,
//         error: 'Error fetching data. Please try again.'
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="bg-green-500 min-h-screen flex flex-col justify-center items-center">
//         <Form getWeather={this.getWeather} />
//         {this.state.weatherData && <Weather weather={this.state.weatherData} />}
//         {this.state.calendarData && <Calendar calendar={this.state.calendarData} />}
//         {this.state.error && <p>{this.state.error}</p>}
//       </div>
//     );
//   }
// }

// export default WeatherApp;
