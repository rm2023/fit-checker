import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      const apiKey = '1d3e7e850fece8f1faa4ded00b53eacc';
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(weatherApiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.weather && data.weather.length > 0) {
            setWeather(data.weather[0]);
          } else {
            setError('Weather data not found.');
          }
        })
        .catch((error) => {
          setError('Error fetching weather data.');
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to fit-checker</h1>
        <p>Can I use your location?</p>
        <div>
          <button onClick={handleGeolocation}>Allow Geolocation</button>
        </div>
        {latitude && longitude && <p>Your current coordinates: {latitude}, {longitude}</p>}
        {zipcode && <p>Your zipcode: {zipcode}</p>}
        {weather && (
          <div>
            <p>Current weather: {weather.main}</p>
            <p>Temperature: {Math.round(weather.temp - 273.15)}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/'+${weather.icon}+'@2x.png`} // Replace with the appropriate image URL based on the weather condition
              alt={weather.description}
            />
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </header>
    </div>
  );
}

export default App;