function getRiskClass(risk) {
  const value = Number(risk);

  if (value >= 70) return "high";
  if (value >= 40) return "medium";
  return "low";
}

function getRiskLabel(risk) {
  const value = Number(risk);

  if (value >= 70) return "High";
  if (value >= 40) return "Medium";
  return "Low";
}

function RiskAnalytics({ locations = [] }) {
  const safeLocations = Array.isArray(locations)
    ? locations
    : [];

  const highRisk = safeLocations.filter(
    (item) => Number(item.risk || 0) >= 70
  );

  const mediumRisk = safeLocations.filter(
    (item) =>
      Number(item.risk || 0) >= 40 &&
      Number(item.risk || 0) < 70
  );

  const lowRisk = safeLocations.filter(
    (item) => Number(item.risk || 0) < 40
  );

  const totalRisk = safeLocations.reduce(
    (sum, item) => {
      return sum + Number(item.risk || 0);
    },
    0
  );

  const averageRisk =
    safeLocations.length > 0
      ? totalRisk / safeLocations.length
      : 0;

  return (
    <div className="analytics">

      {/* =================================================
          ANALYTICS HEADER
      ================================================= */}

      <div className="analytics-card">

        <div className="analytics-header">

          <span className="section-label">
            DATA ANALYTICS
          </span>

          <h2>
            📊 Disaster Risk Analytics
          </h2>

          <p>
            Real-time analysis of monitored locations
          </p>

        </div>

        {/* =================================================
            ANALYTICS SUMMARY
        ================================================= */}

        <div className="summary-grid analytics-summary">

          <div className="summary-card">
            <span>📍</span>

            <small>
              Monitored Locations
            </small>

            <strong>
              {safeLocations.length}
            </strong>
          </div>

          <div className="summary-card high">
            <span>🚨</span>

            <small>
              High Risk Areas
            </small>

            <strong>
              {highRisk.length}
            </strong>
          </div>

          <div className="summary-card medium">
            <span>⚠️</span>

            <small>
              Medium Risk Areas
            </small>

            <strong>
              {mediumRisk.length}
            </strong>
          </div>

          <div className="summary-card">
            <span>📈</span>

            <small>
              Average Risk
            </small>

            <strong>
              {averageRisk.toFixed(1)}%
            </strong>
          </div>

        </div>

      </div>

      {/* =================================================
          CHARTS
      ================================================= */}

      <div className="analytics-card">

        <div className="analytics-header">

          <span className="section-label">
            RISK ANALYSIS
          </span>

          <h2>
            📊 Risk Distribution
          </h2>

          <p>
            Current landslide-risk levels across all
            monitored locations.
          </p>

        </div>

        <div className="analytics-grid">

          {/* ================= RISK BY LOCATION ================= */}

          <div className="chart-box">

            <h3>
              📍 Risk by Location
            </h3>

            <div className="risk-bars">

              {safeLocations.map((location) => {
                const risk = Number(
                  location.risk || 0
                );

                const riskClass =
                  getRiskClass(risk);

                return (
                  <div
                    className="risk-bar-row"
                    key={location.name}
                  >

                    <span className="risk-bar-label">
                      {location.name}
                    </span>

                    <div className="risk-bar-track">

                      <div
                        className={`risk-bar-fill ${riskClass}`}
                        style={{
                          width: `${Math.min(
                            Math.max(risk, 0),
                            100
                          )}%`,
                        }}
                      ></div>

                    </div>

                    <span className="risk-bar-value">
                      {risk}%
                    </span>

                  </div>
                );
              })}

            </div>

          </div>

          {/* ================= DISTRIBUTION ================= */}

          <div className="chart-box">

            <h3>
              🎯 Risk Distribution
            </h3>

            <div className="distribution">

              <div className="distribution-item">

                <div className="distribution-left">

                  <span className="legend-dot high"></span>

                  <span>
                    High Risk
                  </span>

                </div>

                <strong>
                  {highRisk.length}
                </strong>

              </div>

              <div className="distribution-item">

                <div className="distribution-left">

                  <span className="legend-dot medium"></span>

                  <span>
                    Medium Risk
                  </span>

                </div>

                <strong>
                  {mediumRisk.length}
                </strong>

              </div>

              <div className="distribution-item">

                <div className="distribution-left">

                  <span className="legend-dot low"></span>

                  <span>
                    Low Risk
                  </span>

                </div>

                <strong>
                  {lowRisk.length}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          LOCATION TABLE
      ================================================= */}

      <div className="analytics-card">

        <div className="analytics-header">

          <span className="section-label">
            LOCATION STATUS
          </span>

          <h2>
            📍 Monitoring Overview
          </h2>

        </div>

        <div className="analytics-location-list">

          {safeLocations.map((location) => {
            const risk = Number(
              location.risk || 0
            );

            const riskClass =
              getRiskClass(risk);

            return (
              <div
                key={location.name}
                className="analytics-location-row"
              >

                <div>
                  <strong>
                    {location.name}
                  </strong>

                  <span>
                    Rainfall {location.rainfall} mm
                    {" • "}
                    Soil {location.soil}%
                    {" • "}
                    Slope {location.slope}°
                  </span>
                </div>

                <div
                  className={`analytics-location-risk ${riskClass}`}
                >
                  <strong>
                    {risk}%
                  </strong>

                  <span>
                    {getRiskLabel(risk)}
                  </span>
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default RiskAnalytics;