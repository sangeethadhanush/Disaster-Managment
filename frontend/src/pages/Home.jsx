import { Link } from "react-router-dom";
import {
  locations,
  getRiskLevel,
  getRiskClass,
} from "../data/locations";

function Home() {
  const highestRiskLocation = [...locations].sort(
    (a, b) => b.risk - a.risk
  )[0];

  const averageRisk =
    locations.reduce(
      (total, location) => total + location.risk,
      0
    ) / locations.length;

  const highRiskCount = locations.filter(
    (location) => location.risk >= 75
  ).length;

  const mediumRiskCount = locations.filter(
    (location) => location.risk >= 40 && location.risk < 75
  ).length;

  const riskClass = getRiskClass(highestRiskLocation.risk);
  const riskLevel = getRiskLevel(highestRiskLocation.risk);

  return (
    <div className="dashboard">

      {/* HERO */}
      <section className={`card home-hero ${riskClass}`}>

        <div className="hero-content">

          <span className="hero-label">
            ⚠️ CURRENT HIGHEST RISK
          </span>

          <h1>
            {highestRiskLocation.name}
          </h1>

          <h2>
            {riskLevel} LANDSLIDE RISK
          </h2>

          <p>
            Current environmental conditions indicate an
            increased possibility of landslide activity.
            Monitor rainfall, soil moisture and slope
            conditions closely.
          </p>

          <div className="hero-buttons">

            <Link
              to="/monitoring"
              className="primary-button"
            >
              🗺️ Open Monitoring
            </Link>

            <Link
              to="/emergency"
              className="secondary-button"
            >
              🚨 Emergency Center
            </Link>

          </div>

        </div>

        <div className="hero-score">

          <span>RISK SCORE</span>

          <strong>
            {highestRiskLocation.risk}%
          </strong>

          <b>
            {riskLevel} RISK
          </b>

        </div>

      </section>


      {/* STATISTICS */}
      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            📍
          </div>

          <div>
            <small>MONITORED LOCATIONS</small>
            <strong>{locations.length}</strong>
          </div>

        </div>


        <div className="stat-card high-stat">

          <div className="stat-icon">
            🚨
          </div>

          <div>
            <small>HIGH RISK AREAS</small>
            <strong>{highRiskCount}</strong>
          </div>

        </div>


        <div className="stat-card medium-stat">

          <div className="stat-icon">
            ⚠️
          </div>

          <div>
            <small>MEDIUM RISK AREAS</small>
            <strong>{mediumRiskCount}</strong>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📈
          </div>

          <div>
            <small>AVERAGE RISK</small>

            <strong>
              {averageRisk.toFixed(1)}%
            </strong>

          </div>

        </div>

      </section>


      {/* QUICK ACCESS */}
      <section className="card quick-section">

        <span className="section-label">
          SYSTEM MODULES
        </span>

        <h2>Quick Access</h2>

        <div className="quick-grid">

          <Link
            to="/monitoring"
            className="quick-card"
          >
            <span>🗺️</span>

            <h3>Risk Monitoring</h3>

            <p>
              Monitor landslide risk across
              all monitored locations.
            </p>

            <strong>
              Open Monitoring →
            </strong>
          </Link>


          <Link
            to="/weather"
            className="quick-card"
          >
            <span>🌦️</span>

            <h3>Live Weather</h3>

            <p>
              View environmental and weather
              conditions for each location.
            </p>

            <strong>
              View Weather →
            </strong>
          </Link>


          <Link
            to="/analytics"
            className="quick-card"
          >
            <span>📊</span>

            <h3>Risk Analytics</h3>

            <p>
              Analyze risk distribution and
              environmental indicators.
            </p>

            <strong>
              View Analytics →
            </strong>
          </Link>


          <Link
            to="/emergency"
            className="quick-card emergency-card"
          >
            <span>🚨</span>

            <h3>Emergency Center</h3>

            <p>
              Identify locations requiring
              immediate attention.
            </p>

            <strong>
              Open Emergency →
            </strong>
          </Link>

        </div>

      </section>


      {/* LOCATION OVERVIEW */}
      <section className="card analytics-table-section">

        <span className="section-label">
          MONITORING REGION
        </span>

        <h2>Location Risk Overview</h2>

        <div className="risk-table-wrapper">

          <table className="risk-table">

            <thead>

              <tr>
                <th>Location</th>
                <th>Rainfall</th>
                <th>Soil Moisture</th>
                <th>Slope</th>
                <th>Risk</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {locations.map((location) => {

                const level =
                  getRiskLevel(location.risk);

                const riskClass =
                  getRiskClass(location.risk);

                return (
                  <tr key={location.id}>

                    <td>
                      <strong>
                        {location.name}
                      </strong>
                    </td>

                    <td>
                      {location.rainfall} mm
                    </td>

                    <td>
                      {location.soilMoisture}%
                    </td>

                    <td>
                      {location.slope}°
                    </td>

                    <td>
                      <strong>
                        {location.risk}%
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`table-risk ${riskClass}`}
                      >
                        {level}
                      </span>
                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Home;