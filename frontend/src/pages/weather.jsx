import { useState } from "react";
import { locations } from "../data/locations";

function Weather() {
  const [selectedId, setSelectedId] = useState("ooty");

  const location =
    locations.find(
      (item) => item.id === selectedId
    ) || locations[0];

  return (
    <div className="dashboard">

      <section className="card page-header">

        <div>

          <span className="section-label">
            WEATHER INTELLIGENCE
          </span>

          <h1>
            Live Weather
          </h1>

          <p>
            Current weather conditions for monitored
            locations.
          </p>

        </div>

        <span className="live-badge">
          ● LIVE
        </span>

      </section>


      <section className="card location-selector">

        <h2>
          Select Location
        </h2>

        <div className="location-buttons">

          {locations.map((item) => (

            <button
              key={item.id}
              className={
                selectedId === item.id
                  ? "location-btn active"
                  : "location-btn"
              }
              onClick={() =>
                setSelectedId(item.id)
              }
            >
              📍 {item.name}
            </button>

          ))}

        </div>

      </section>


      <section className="card weather-card-section">

        <div className="card-header">

          <div>

            <span className="section-label">
              CURRENT CONDITIONS
            </span>

            <h2>
              {location.name}
            </h2>

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
              {location.temperature}°C
            </strong>
          </div>


          <div className="weather-card">
            <span>💧</span>
            <p>Humidity</p>
            <strong>
              {location.humidity}%
            </strong>
          </div>


          <div className="weather-card">
            <span>🌧️</span>
            <p>Rainfall</p>
            <strong>
              {location.rainfall} mm
            </strong>
          </div>


          <div className="weather-card">
            <span>💨</span>
            <p>Wind Speed</p>
            <strong>
              {location.windSpeed} km/h
            </strong>
          </div>


          <div className="weather-card">
            <span>🌱</span>
            <p>Soil Moisture</p>
            <strong>
              {location.soilMoisture}%
            </strong>
          </div>

        </div>


        <div className="weather-footer">

          <span>
            📍 {location.name}
          </span>

          <span>
            Last updated: {new Date().toLocaleTimeString()}
          </span>

        </div>

      </section>

    </div>
  );
}

export default Weather;