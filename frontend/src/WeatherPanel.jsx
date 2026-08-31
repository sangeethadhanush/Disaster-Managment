import { useEffect, useState } from "react";

function WeatherPanel({ location, onWeatherUpdate }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location) return;

    setLoading(true);
    setError("");
    setWeather(null);

    fetch(`http://127.0.0.1:5000/api/weather/${location}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        return response.json();
      })
      .then((data) => {
        setWeather(data);

        if (onWeatherUpdate) {
          onWeatherUpdate(data);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load live weather.");
        setLoading(false);
      });
  }, [location, onWeatherUpdate]);

  if (loading) {
    return (
      <div className="weather-panel">
        <h2>🌦️ Live Weather</h2>
        <p>🔄 Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-panel weather-error">
        <h2>🌦️ Live Weather</h2>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="weather-panel">
      <div className="weather-header">
        <div>
          <h2>🌦️ Live Weather</h2>
          <p>{weather.location}</p>
        </div>

        <span className="live-badge">
          ● LIVE
        </span>
      </div>

      <div className="weather-grid">

        <div className="weather-card">
          <span>🌡️</span>
          <p>Temperature</p>
          <strong>
            {weather.temperature} °C
          </strong>
        </div>

        <div className="weather-card">
          <span>💧</span>
          <p>Humidity</p>
          <strong>
            {weather.humidity}%
          </strong>
        </div>

        <div className="weather-card">
          <span>🌧️</span>
          <p>Rain</p>
          <strong>
            {weather.rain} mm
          </strong>
        </div>

        <div className="weather-card">
          <span>☔</span>
          <p>Precipitation</p>
          <strong>
            {weather.precipitation} mm
          </strong>
        </div>

        <div className="weather-card">
          <span>💨</span>
          <p>Wind Speed</p>
          <strong>
            {weather.wind_speed} km/h
          </strong>
        </div>

      </div>

      <p className="weather-time">
        Last updated: {weather.time}
      </p>
    </div>
  );
}

export default WeatherPanel;