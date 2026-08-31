import { useState } from "react";
import {
  locations,
  getRiskLevel,
  getRiskClass,
} from "../data/locations";

function Emergency() {
  const highRiskLocations = locations.filter(
    (location) => location.risk >= 75
  );

  const [selectedId, setSelectedId] = useState(
    highRiskLocations[0]?.id || locations[0].id
  );

  const [alertSent, setAlertSent] = useState(false);

  const selectedLocation =
    locations.find(
      (location) => location.id === selectedId
    ) || locations[0];

  const riskLevel =
    getRiskLevel(selectedLocation.risk);

  const riskClass =
    getRiskClass(selectedLocation.risk);

  function sendAlert() {
    setAlertSent(true);
  }

  return (
    <div className="dashboard">

      {/* HEADER */}
      <section className="card page-header emergency-header">

        <div>

          <span className="section-label">
            EMERGENCY INTELLIGENCE CENTER
          </span>

          <h1>
            🚨 Emergency Center
          </h1>

          <p>
            Locations requiring immediate attention.
          </p>

        </div>

        <span className="emergency-status">
          {highRiskLocations.length} HIGH RISK
        </span>

      </section>


      {/* WARNING */}
      <section className="card emergency-warning">

        <div className="warning-icon">
          ⚠️
        </div>

        <div>

          <h2>
            Emergency Monitoring Active
          </h2>

          <p>
            High-risk locations should be monitored
            continuously and appropriate disaster
            response actions should be considered.
          </p>

        </div>

      </section>


      {/* LOCATIONS */}
      <section className="card analytics-table-section">

        <span className="section-label">
          LOCATIONS REQUIRING ATTENTION
        </span>

        <h2>
          High Risk Locations
        </h2>

        <div className="emergency-location-grid">

          {highRiskLocations.map((location) => (

            <button
              key={location.id}
              className={
                selectedId === location.id
                  ? "emergency-location active"
                  : "emergency-location"
              }
              onClick={() => {
                setSelectedId(location.id);
                setAlertSent(false);
              }}
            >

              <div className="attention-top">

                <div>

                  <strong>
                    {location.name}
                  </strong>

                  <span>
                    🚨 {getRiskLevel(location.risk)}
                  </span>

                </div>

                <div className="attention-icon">
                  ⚠️
                </div>

              </div>


              <div className="attention-data">

                <div>
                  <span>Rainfall</span>
                  <strong>
                    {location.rainfall} mm
                  </strong>
                </div>

                <div>
                  <span>Soil</span>
                  <strong>
                    {location.soilMoisture}%
                  </strong>
                </div>

                <div>
                  <span>Slope</span>
                  <strong>
                    {location.slope}°
                  </strong>
                </div>

              </div>


              <div className="attention-risk">

                <strong>
                  {location.risk}%
                </strong>

                <span>
                  HIGH RISK
                </span>

              </div>

            </button>

          ))}

        </div>

      </section>


      {/* SELECTED EMERGENCY */}
      <section className="emergency-detail">

        <div className="emergency-detail-header">

          <div>

            <span className="section-label">
              SELECTED LOCATION
            </span>

            <h2>
              {selectedLocation.name}
            </h2>

          </div>

          <div className="emergency-risk-score">

            <strong>
              {selectedLocation.risk}%
            </strong>

            <span>
              {riskLevel} RISK
            </span>

          </div>

        </div>


        {/* METRICS */}
        <div className="emergency-metrics">

          <div>

            <span>🌧️</span>

            <small>
              Rainfall
            </small>

            <strong>
              {selectedLocation.rainfall} mm
            </strong>

          </div>


          <div>

            <span>🌱</span>

            <small>
              Soil Moisture
            </small>

            <strong>
              {selectedLocation.soilMoisture}%
            </strong>

          </div>


          <div>

            <span>⛰️</span>

            <small>
              Slope
            </small>

            <strong>
              {selectedLocation.slope}°
            </strong>

          </div>

        </div>


        {/* ACTION */}
        <div className="emergency-action">

          <h3>
            Recommended Action
          </h3>

          <p>
            Maintain continuous monitoring of{" "}
            <strong>
              {selectedLocation.name}
            </strong>
            . Review rainfall trends, ground
            conditions and prepare appropriate
            emergency response procedures.
          </p>

        </div>


        {/* ALERT */}
        {alertSent ? (

          <div className="no-alert">

            ✅ ALERT SENT SUCCESSFULLY

            <br />

            <small>
              Emergency notification recorded for{" "}
              {selectedLocation.name}.
            </small>

          </div>

        ) : (

          <button
            className="report-button"
            onClick={sendAlert}
          >
            🚨 SEND ALERT
          </button>

        )}

      </section>

    </div>
  );
}

export default Emergency;