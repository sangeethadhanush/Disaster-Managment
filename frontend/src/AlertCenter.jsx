import { useEffect, useState } from "react";

function AlertCenter({ locations, selectedLocation }) {
  const [alerts, setAlerts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

  const selected = locations.find(
    (item) => item.location === selectedLocation
  );

  useEffect(() => {
    if (!locations || locations.length === 0) {
      return;
    }

    const highRiskLocations = locations.filter(
      (item) => item.risk_level === "High"
    );

    setAlerts(highRiskLocations);
  }, [locations]);

  if (!selected) {
    return null;
  }

  const isHighRisk = selected.risk_level === "High";
  const isMediumRisk = selected.risk_level === "Medium";

  let alertTitle = "NORMAL MONITORING";
  let alertMessage =
    "Current conditions are being monitored continuously.";
  let action =
    "Continue monitoring rainfall and ground conditions.";

  if (isHighRisk) {
    alertTitle = "🚨 HIGH LANDSLIDE RISK";
    alertMessage =
      `${selected.location} is currently showing dangerous conditions.`;
    action =
      "Avoid steep slopes and vulnerable areas. Follow local authority instructions.";
  } else if (isMediumRisk) {
    alertTitle = "⚠️ MODERATE LANDSLIDE RISK";
    alertMessage =
      `${selected.location} is showing conditions that may increase landslide probability.`;
    action =
      "Monitor rainfall and ground conditions closely.";
  }

  return (
    <section className="alert-center">

      <div
        className={`alert-main ${
          isHighRisk
            ? "alert-high"
            : isMediumRisk
            ? "alert-medium"
            : "alert-low"
        }`}
      >
        <div className="alert-icon">
          {isHighRisk ? "🚨" : isMediumRisk ? "⚠️" : "🟢"}
        </div>

        <div className="alert-content">
          <span className="alert-label">EARLY WARNING STATUS</span>

          <h2>{alertTitle}</h2>

          <p className="alert-location">
            📍 <strong>{selected.location}</strong>
          </p>

          <p>{alertMessage}</p>

          <div className="recommended-action">
            <strong>Recommended Action</strong>
            <p>{action}</p>
          </div>
        </div>

        <div className="alert-risk">
          <span>RISK</span>
          <strong>{selected.risk_percentage}%</strong>
        </div>
      </div>

      <div className="alert-summary">

        <div className="alert-stat">
          <span>🚨</span>
          <div>
            <small>HIGH RISK AREAS</small>
            <strong>
              {locations.filter(
                (item) => item.risk_level === "High"
              ).length}
            </strong>
          </div>
        </div>

        <div className="alert-stat">
          <span>⚠️</span>
          <div>
            <small>MEDIUM RISK AREAS</small>
            <strong>
              {locations.filter(
                (item) => item.risk_level === "Medium"
              ).length}
            </strong>
          </div>
        </div>

        <div className="alert-stat">
          <span>🟢</span>
          <div>
            <small>LOW RISK AREAS</small>
            <strong>
              {locations.filter(
                (item) => item.risk_level === "Low"
              ).length}
            </strong>
          </div>
        </div>

        <div className="alert-stat">
          <span>📡</span>
          <div>
            <small>MONITORING STATUS</small>
            <strong>LIVE</strong>
          </div>
        </div>

      </div>

      {isHighRisk && (
        <div className="emergency-panel">

          <div>
            <h3>🚨 Emergency Response</h3>

            <p>
              Immediate attention is recommended for{" "}
              <strong>{selected.location}</strong>.
            </p>

            <ul>
              <li>Stay away from steep slopes.</li>
              <li>Avoid unstable roads and mountain edges.</li>
              <li>Monitor rainfall and ground movement.</li>
              <li>Follow instructions from local authorities.</li>
            </ul>
          </div>

          <button
            className="contact-button"
            onClick={() => setShowContacts(!showContacts)}
          >
            📞 Emergency Contacts
          </button>

        </div>
      )}

      {showContacts && (
        <div className="contacts-panel">

          <h3>📞 Emergency Contacts</h3>

          <div className="contact-grid">

            <div>
              <strong>🚑 Emergency</strong>
              <span>112</span>
            </div>

            <div>
              <strong>🚓 Police</strong>
              <span>100</span>
            </div>

            <div>
              <strong>🚒 Fire & Rescue</strong>
              <span>101</span>
            </div>

            <div>
              <strong>🚑 Ambulance</strong>
              <span>108</span>
            </div>

          </div>

        </div>
      )}

      {alerts.length > 0 && (
        <div className="active-alerts">

          <div className="section-heading">
            <h3>🚨 Active High-Risk Locations</h3>
            <span>{alerts.length} ALERTS</span>
          </div>

          <div className="alert-list">

            {alerts.map((location) => (
              <div
                className="active-alert-card"
                key={location.location}
              >

                <div>
                  <strong>📍 {location.location}</strong>

                  <p>
                    🌧️ {location.rainfall_24h} mm
                    {" • "}
                    🌱 {location.soil_moisture}%
                    {" • "}
                    ⛰️ {location.slope}°
                  </p>
                </div>

                <div className="active-risk">
                  <strong>
                    {location.risk_percentage}%
                  </strong>

                  <span>HIGH RISK</span>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </section>
  );
}

export default AlertCenter;