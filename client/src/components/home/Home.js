import './Home.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header'

function Home() {
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
  
        const geocodeApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=71a9333162ae44fc9515a9d0801ea4e9`; // Replace with your actual API key for geocoding
  
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
      <div className="Home">
        <Header/>
        <header className="Home-header">
          <h1>Welcome to fit-checker</h1>
          <p>Can I use your location?</p>
          <div>
            <button onClick={handleGeolocation}>Allow Geolocation</button>
          </div>
          
          {zipcode && <p>Your zipcode: {zipcode}</p>}
          {weather && (
            <div>
              <p>Current weather: {weather.main}</p>
              <p>Temperature: {Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
              <img
                src={`https://example.com/images/${weather.icon}.png`} // Replace with the appropriate image URL based on the weather condition
                alt={weather.description}
              />
            </div>
          )}
          {error && <p>Error: {error}</p>}
        </header>
      </div>
    );
  }
  
  export default Home;