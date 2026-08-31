import { useState } from "react";
import {
  locations,
  getRiskLevel,
  getRiskClass,
} from "../data/locations";

function Monitoring() {
  const [selectedId, setSelectedId] = useState("ooty");

  const selectedLocation =
    locations.find(
      (location) => location.id === selectedId
    ) || locations[0];

  const riskLevel = getRiskLevel(selectedLocation.risk);
  const riskClass = getRiskClass(selectedLocation.risk);

  const getRiskMessage = () => {
    if (selectedLocation.risk >= 75) {
      return "Critical conditions detected. Heavy rainfall, high soil moisture and slope conditions indicate a significant landslide possibility.";
    }

    if (selectedLocation.risk >= 40) {
      return "Moderate risk conditions detected. Continuous monitoring is recommended as environmental conditions may increase the possibility of slope instability.";
    }

    return "Environmental conditions are currently stable. The probability of landslide activity is relatively low.";
  };

  return (
    <div className="dashboard">

      {/* PAGE HEADER */}
      <section className="card page-header">

        <div>
          <span className="section-label">
            RISK MONITORING
          </span>

          <h1>
            Landslide Risk Monitoring
          </h1>

          <p>
            Monitor environmental conditions and
            landslide risk across vulnerable locations.
          </p>
        </div>

        <span className="live-badge">
          ● LIVE MONITORING
        </span>

      </section>


      {/* LOCATION SELECTOR */}
      <section className="card location-selector">

        <span className="section-label">
          MONITORED AREAS
        </span>

        <h2>
          Select Location
        </h2>

        <p>
          Choose a location to view its current
          environmental conditions.
        </p>

        <div className="location-buttons">

          {locations.map((location) => (
            <button
              key={location.id}
              className={
                selectedId === location.id
                  ? "location-btn active"
                  : "location-btn"
              }
              onClick={() => setSelectedId(location.id)}
            >
              <span>
                📍 {location.name}
              </span>

              <small>
                {getRiskLevel(location.risk)} Risk
              </small>
            </button>
          ))}

        </div>

      </section>


      {/* SELECTED LOCATION */}
      <section className="card">

        {/* LOCATION HEADER */}
        <div className="card-header">

          <div>
            <span className="section-label">
              SELECTED LOCATION
            </span>

            <h2>
              {selectedLocation.name}
            </h2>

            <p>
              Real-time environmental monitoring
            </p>
          </div>

          <span
            className={`risk-badge ${riskClass}`}
          >
            {riskLevel} RISK
          </span>

        </div>


        {/* ENVIRONMENTAL CONDITIONS */}
        <div className="condition-grid">

          <div className="condition-item">

            <div className="condition-icon">
              🌧️
            </div>

            <span>
              Rainfall
            </span>

            <strong>
              {selectedLocation.rainfall} mm
            </strong>

          </div>


          <div className="condition-item">

            <div className="condition-icon">
              🌱
            </div>

            <span>
              Soil Moisture
            </span>

            <strong>
              {selectedLocation.soilMoisture}%
            </strong>

          </div>


          <div className="condition-item">

            <div className="condition-icon">
              ⛰️
            </div>

            <span>
              Slope
            </span>

            <strong>
              {selectedLocation.slope}°
            </strong>

          </div>

        </div>


        {/* RISK SCORE */}
        <div className={`risk-condition ${riskClass}`}>

          <div>

            <span>
              LANDSLIDE RISK SCORE
            </span>

            <strong>
              {selectedLocation.risk}%
            </strong>

          </div>

          <div className="risk-condition-label">
            {riskLevel} RISK
          </div>

        </div>


        {/* RISK PROGRESS */}
        <div className="risk-progress">

          <div
            className={`risk-progress-fill ${riskClass}`}
            style={{
              width: `${selectedLocation.risk}%`,
            }}
          />

        </div>


        {/* RISK ASSESSMENT */}
        <div className="risk-explanation-box">

          <div className="risk-explanation-header">

            <span className="section-label">
              RISK ASSESSMENT
            </span>

            <span
              className={`risk-badge ${riskClass}`}
            >
              {riskLevel}
            </span>

          </div>

          <p>
            {getRiskMessage()}
          </p>

        </div>


        {/* MONITORING STATUS */}
        <div className="monitoring-status-grid">

          {/* SENSOR STATUS */}
          <div className="monitoring-status-card">

            <div className="monitoring-status-icon">
              📡
            </div>

            <div className="monitoring-status-content">

              <span>
                SENSOR STATUS
              </span>

              <strong>
                ● ONLINE
              </strong>

              <p>
                Environmental sensors reporting normally
              </p>

            </div>

          </div>


          {/* MONITORING MODE */}
          <div className="monitoring-status-card">

            <div className="monitoring-status-icon">
              🔄
            </div>

            <div className="monitoring-status-content">

              <span>
                MONITORING MODE
              </span>

              <strong>
                LIVE ACTIVE
              </strong>

              <p>
                Continuous environmental observation
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Monitoring;