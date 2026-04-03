import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState("default");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "c510389c3bc0753dda178dda5319518d";

  const updateBackground = (condition) => {

    if (condition === "Clear") setBackground("sunny");
    else if (condition === "Clouds") setBackground("cloudy");
    else if (condition === "Rain") setBackground("rainy");
    else if (condition === "Snow") setBackground("snowy");
    else setBackground("default");

  };

  const filterForecast = (list) => {

    const daily = list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    return daily.slice(0, 5);

  };

  const fetchWeather = async (city) => {

    try {

      setLoading(true);
      setError("");

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const weather = await weatherResponse.json();

      if (weather.cod === "404") {

        setError("City not found.");
        setWeatherData(null);
        setForecastData([]);
        setLoading(false);
        return;

      }

      setWeatherData(weather);
      updateBackground(weather.weather[0].main);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecast = await forecastResponse.json();

      const filtered = filterForecast(forecast.list);

      setForecastData(filtered);

      setLoading(false);

    } catch {

      setError("Error fetching weather data");
      setLoading(false);

    }

  };

  const fetchLocationWeather = async (lat, lon) => {

    try {

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const weather = await weatherResponse.json();

      setWeatherData(weather);
      updateBackground(weather.weather[0].main);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const forecast = await forecastResponse.json();

      const filtered = filterForecast(forecast.list);

      setForecastData(filtered);

    } catch {

      setError("Unable to fetch location weather");

    }

  };

  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetchLocationWeather(lat, lon);

        },
        () => {

          console.log("Location permission denied");

        }
      );

    }

  }, []);

  return (

    <div className={`app ${background} ${darkMode ? "dark" : ""}`}>

      <div className="header">

        <h1 className="title">Weather Pulse</h1>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>

      <SearchBar fetchWeather={fetchWeather} />

      {loading && <p>Loading weather...</p>}

      {error && <p className="error">{error}</p>}

      {weatherData && <WeatherCard data={weatherData} />}

      {forecastData.length > 0 && <Forecast data={forecastData} />}

    </div>

  );

}

export default App;