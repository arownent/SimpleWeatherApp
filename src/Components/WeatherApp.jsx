import React, { useState } from 'react';

const WeatherApp = () => {
  const [location, setLocation] = useState()
  const [temperature, setTemperature] = useState()
  const [windSpeed, setWindSpeed] = useState()
  const [tempUnit, setTempUnit] = useState()
  const [windUnit, setWindUnit] = useState()

// function to get location of the user if the user allows. if user allows we are calling fetchWeatherData in getCurrentPosition method.
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherData);
    } else {
      alert('Location Blocked');
    }
  };

  const fetchWeatherData = (e) => {
    //taking latitude and longitude values with coords property.
    const { latitude, longitude } = e.coords;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTemperature(data.current.temperature_2m)
        setWindSpeed(data.current.wind_speed_10m)
        setTempUnit(data.current_units.temperature_2m)
        setWindUnit(data.current_units.wind_speed_10m)
      })
  };

  return (
    <div>
      <h1 className='bg-gray-700 p-4 text-xl font-bold rounded-xl'>Weather App</h1>
      <button onClick={getLocation} className='bg-gray-700 px-4 py-2 rounded-lg m-4 text-xl hover:bg-gray-500'>Get Location</button>
      <div>
        <p className='m-4'>Temperature: {temperature} {tempUnit}</p>
        <p className='m-4'>Wind Speed: {windSpeed} {windUnit}</p>
      </div>
    </div>
  );
};

export default WeatherApp;
