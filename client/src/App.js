import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import React, { useState, useEffect } from 'react';

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

      const geocodeApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=71a9333162ae44fc9515a9d0801ea4e9`;

      fetch(geocodeApiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            if (components.postcode) {
              setZipcode(components.postcode);
            } else {
              setError('Postal code not found.');
            }
          } else {
            setError('No results found.');
          }
        })
        .catch((error) => {
          setError('Error fetching location data.');
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;