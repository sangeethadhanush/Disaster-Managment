import { useState } from "react";

function EmergencyAlert({ location }) {
  const [showAlert, setShowAlert] = useState(false);

  if (!location) {
    return null;
  }

  const isHighRisk = location.risk_level === "High";

  const handleAlert = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="emergency-panel">
        <div>
          <h2>🚨 Emergency Response</h2>

          <p>
            Trigger an emergency alert for the currently
            selected location.
          </p>
        </div>

        <button
          className={`emergency-button ${
            isHighRisk ? "danger" : ""
          }`}
          onClick={handleAlert}
        >
          🚨 SEND EMERGENCY ALERT
        </button>
      </div>

      {showAlert && (
        <div className="alert-overlay">

          <div className="emergency-modal">

            <div className="modal-icon">
              🚨
            </div>

            <h2>EMERGENCY ALERT</h2>

            <div className="modal-location">
              📍 {location.location}
            </div>

            <div className="modal-risk">
              <span>LANDSLIDE RISK</span>

              <strong>
                {location.risk_percentage}%
              </strong>

              <p>
                {location.risk_level?.toUpperCase()} RISK
              </p>
            </div>

            <div className="modal-message">
              <strong>⚠️ Recommended Action</strong>

              <p>
                {isHighRisk
                  ? "Avoid steep slopes and vulnerable areas. Follow local authority instructions immediately."
                  : location.risk_level === "Medium"
                  ? "Monitor rainfall and ground conditions closely."
                  : "Continue monitoring weather and ground conditions."
                }
              </p>
            </div>

            <div className="modal-time">
              Alert generated:{" "}
              {new Date().toLocaleString()}
            </div>

            <div className="modal-actions">

              <button
                className="close-alert"
                onClick={closeAlert}
              >
                CLOSE
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default EmergencyAlert;