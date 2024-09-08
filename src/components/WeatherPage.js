import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css'; 

const WeatherPage = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const API_KEY = '004afe3be989f24011f5485178dd1bcc';

  const fetchWeatherData = async () => {
    try {
      setError('');
      const encodedCity = encodeURIComponent(city);

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response && error.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
      setWeatherData(null);
      setForecastData(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      default:
        return '🌍';
    }
  };


  const getIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        const sunnyImg = <img src='/sunny.png' alt='sunny-image'/>
        return sunnyImg
      case 'Clouds':
        const cloudyImg = <img src='/rainy.png' alt='coudy-image'/>
        return cloudyImg
      case 'Rain':
        const rainyImg = <img src='/rainy.png' alt='coudy-image'/>
        return rainyImg
      default:
        return '🌍';
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-container">
        {error && <div className="error-message">{error}</div>}

        {!error && weatherData && (
          <div className="current-weather">
            <div className="top-section">
              <p className="city-name">{city}</p>
              <p className="date">{new Date().toLocaleDateString()}</p>
              <div className="weather-details">
                <div className='weather-description'>
                  <h1 className="temperature">{weatherData.main.temp}°C</h1>
                  <p className="description">{weatherData.weather[0].description}</p>
                </div>
                <div className="weather-icon">
                  {getIcon(weatherData.weather[0].main)}

                </div>
              </div>
            </div>

            <div className="details-section">
              <div className="detail-card">
                <p>Precipitation</p>
                <p>30%</p>
              </div>
              <div className="detail-card">
                <p>Humidity</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="detail-card">
                <p>Wind</p>
                <p>{weatherData.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}

        {!error && forecastData && (
          <div className="forecast-section">
            <h2>5-Day Forecast</h2>
            <div className="forecast-cards">
              {forecastData.list.slice(0, 5).map((forecast, index) => (
                <div key={index} className="forecast-card">
                  <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                  <p>{getWeatherIcon(forecast.weather[0].main)}</p> 
                  <p>{forecast.main.temp}°C</p>
                  <p>{forecast.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
