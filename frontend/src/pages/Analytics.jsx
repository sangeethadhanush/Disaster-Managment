import React from "react";
import {
  locations,
  getRiskLevel,
  getRiskClass,
} from "../data/locations";

function Analytics() {
  const averageRisk =
    locations.reduce(
      (total, location) => total + location.risk,
      0
    ) / locations.length;

  const highRisk = locations.filter(
    (location) => location.risk >= 75
  );

  const mediumRisk = locations.filter(
    (location) =>
      location.risk >= 40 && location.risk < 75
  );

  const lowRisk = locations.filter(
    (location) => location.risk < 40
  );

  return (
    <div
      className="dashboard analytics-page"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        boxSizing: "border-box",
        width: "100%",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        color: "#1e293b"
      }}
    >

      {/* ================= HEADER ================= */}
      <section 
        className="card page-header analytics-header"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div>
          <span 
            className="section-label"
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#64748b",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}
          >
            DISASTER RISK ANALYTICS
          </span>

          <h1 style={{ margin: "8px 0 4px 0", fontSize: "28px", color: "#0f172a" }}>
            Risk Analytics
          </h1>

          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Real-time analysis of monitored landslide-risk locations.
          </p>
        </div>

        <span 
          className="live-badge"
          style={{
            backgroundColor: "#dcfce7",
            color: "#15803d",
            fontSize: "12px",
            fontWeight: "700",
            padding: "6px 12px",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          ● LIVE ANALYSIS
        </span>
      </section>


      {/* ================= SUMMARY ================= */}
      <section 
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}
      >

        <div 
          className="stat-card"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div className="stat-icon" style={{ fontSize: "24px" }}>📍</div>
          <div className="stat-content" style={{ display: "flex", flexDirection: "column" }}>
            <small style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
              MONITORED LOCATIONS
            </small>
            <strong style={{ fontSize: "24px", color: "#0f172a", marginTop: "2px" }}>
              {locations.length}
            </strong>
          </div>
        </div>


        <div 
          className="stat-card high-stat"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #fecaca",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div className="stat-icon" style={{ fontSize: "24px" }}>🚨</div>
          <div className="stat-content" style={{ display: "flex", flexDirection: "column" }}>
            <small style={{ fontSize: "11px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase" }}>
              HIGH RISK AREAS
            </small>
            <strong style={{ fontSize: "24px", color: "#dc2626", marginTop: "2px" }}>
              {highRisk.length}
            </strong>
          </div>
        </div>


        <div 
          className="stat-card medium-stat"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #fef08a",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div className="stat-icon" style={{ fontSize: "24px" }}>⚠️</div>
          <div className="stat-content" style={{ display: "flex", flexDirection: "column" }}>
            <small style={{ fontSize: "11px", color: "#d97706", fontWeight: "700", textTransform: "uppercase" }}>
              MEDIUM RISK AREAS
            </small>
            <strong style={{ fontSize: "24px", color: "#d97706", marginTop: "2px" }}>
              {mediumRisk.length}
            </strong>
          </div>
        </div>


        <div 
          className="stat-card"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div className="stat-icon" style={{ fontSize: "24px" }}>📈</div>
          <div className="stat-content" style={{ display: "flex", flexDirection: "column" }}>
            <small style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
              AVERAGE RISK
            </small>
            <strong style={{ fontSize: "24px", color: "#0f172a", marginTop: "2px" }}>
              {averageRisk.toFixed(1)}%
            </strong>
          </div>
        </div>

      </section>


      {/* ================= LOCATION ANALYSIS ================= */}
      <section 
        className="card analytics-table-section"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
      >

        <div className="section-heading" style={{ marginBottom: "20px" }}>
          <div>
            <span 
              className="section-label"
              style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}
            >
              LOCATION ANALYSIS
            </span>
            <h2 style={{ margin: "4px 0 4px 0", fontSize: "20px", color: "#0f172a" }}>
              Risk by Location
            </h2>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Environmental conditions and calculated landslide probability for each monitored location.
            </p>
          </div>
        </div>


        <div className="risk-table-wrapper" style={{ overflowX: "auto" }}>

          <table 
            className="risk-table"
            style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}
          >

            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b" }}>
                <th style={{ padding: "12px 16px" }}>Location</th>
                <th style={{ padding: "12px 16px" }}>Rainfall</th>
                <th style={{ padding: "12px 16px" }}>Soil Moisture</th>
                <th style={{ padding: "12px 16px" }}>Slope</th>
                <th style={{ padding: "12px 16px" }}>Risk</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
              </tr>
            </thead>


            <tbody>

              {locations.map((location) => {

                const level = getRiskLevel(location.risk);
                const riskClass = getRiskClass(location.risk);

                return (
                  <tr key={location.id} style={{ borderBottom: "1px solid #f1f5f9" }}>

                    <td style={{ padding: "14px 16px" }}>
                      <strong className="location-name" style={{ color: "#0f172a" }}>
                        {location.name}
                      </strong>
                    </td>

                    <td style={{ padding: "14px 16px", color: "#334155" }}>
                      {location.rainfall} mm
                    </td>

                    <td style={{ padding: "14px 16px", color: "#334155" }}>
                      {location.soilMoisture}%
                    </td>

                    <td style={{ padding: "14px 16px", color: "#334155" }}>
                      {location.slope}°
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <strong className="risk-number" style={{ color: "#0f172a" }}>
                        {location.risk}%
                      </strong>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        className={`table-risk ${riskClass}`}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          backgroundColor: location.risk >= 75 ? "#fee2e2" : location.risk >= 40 ? "#fef3c7" : "#dcfce7",
                          color: location.risk >= 75 ? "#991b1b" : location.risk >= 40 ? "#92400e" : "#166534"
                        }}
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


      {/* ================= RISK DISTRIBUTION ================= */}
      <section 
        className="card distribution-card"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
      >

        <div className="section-heading" style={{ marginBottom: "20px" }}>

          <span 
            className="section-label"
            style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}
          >
            RISK OVERVIEW
          </span>

          <h2 style={{ margin: "4px 0 4px 0", fontSize: "20px", color: "#0f172a" }}>🎯 Risk Distribution</h2>

          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Current distribution of monitored locations by risk level.
          </p>

        </div>


        <div 
          className="distribution-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px"
          }}
        >

          <div 
            className="distribution-item high"
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span style={{ fontSize: "20px" }}>🔴</span>
            <strong style={{ fontSize: "24px", color: "#991b1b" }}>{highRisk.length}</strong>
            <small style={{ fontSize: "11px", fontWeight: "700", color: "#991b1b" }}>HIGH RISK</small>
          </div>


          <div 
            className="distribution-item medium"
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#fffbeb",
              border: "1px solid #fde68a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span style={{ fontSize: "20px" }}>🟡</span>
            <strong style={{ fontSize: "24px", color: "#92400e" }}>{mediumRisk.length}</strong>
            <small style={{ fontSize: "11px", fontWeight: "700", color: "#92400e" }}>MEDIUM RISK</small>
          </div>


          <div 
            className="distribution-item low"
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span style={{ fontSize: "20px" }}>🟢</span>
            <strong style={{ fontSize: "24px", color: "#166534" }}>{lowRisk.length}</strong>
            <small style={{ fontSize: "11px", fontWeight: "700", color: "#166534" }}>LOW RISK</small>
          </div>

        </div>

      </section>


      {/* ================= PRIORITY LOCATIONS ================= */}
      <section 
        className="card priority-section"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
      >

        <div 
          className="priority-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >

          <div>
            <span 
              className="section-label"
              style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}
            >
              PRIORITY LOCATIONS
            </span>

            <h2 style={{ margin: "4px 0 4px 0", fontSize: "20px", color: "#0f172a" }}>🚨 Locations Requiring Attention</h2>

            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Locations currently showing high landslide risk.
            </p>
          </div>

          <div 
            className="priority-count"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fee2e2",
              padding: "6px 12px",
              borderRadius: "8px",
              color: "#991b1b"
            }}
          >
            <strong style={{ fontSize: "18px" }}>{highRisk.length}</strong>
            <span style={{ fontSize: "12px", fontWeight: "700" }}>HIGH RISK</span>
          </div>

        </div>


        <div 
          className="priority-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >

          {highRisk.map((location) => {

            const riskLevel = getRiskLevel(location.risk);
            const riskClass = getRiskClass(location.risk);

            return (
              <div
                className={`priority-card ${riskClass}`}
                key={location.id}
                style={{
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff5f5",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >

                {/* CARD TOP */}
                <div 
                  className="priority-card-top"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >

                  <div className="priority-location" style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                    <div className="priority-icon" style={{ fontSize: "24px" }}>
                      🚨
                    </div>

                    <div>
                      <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>{location.name}</h3>

                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#dc2626" }}>
                        HIGH RISK LOCATION
                      </span>
                    </div>

                  </div>


                  <div className="priority-score" style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: "22px", color: "#dc2626", display: "block", lineHeight: "1" }}>{location.risk}%</strong>

                    <span style={{ fontSize: "10px", fontWeight: "700", color: "#dc2626" }}>RISK</span>
                  </div>

                </div>


                {/* DIVIDER */}
                <div className="priority-divider" style={{ height: "1px", backgroundColor: "#fca5a5", width: "100%" }} />


                {/* CONDITIONS */}
                <div 
                  className="priority-metrics"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px"
                  }}
                >

                  <div className="priority-metric" style={{ display: "flex", alignItems: "center", gap: "6px" }}>

                    <span className="metric-icon" style={{ fontSize: "16px" }}>
                      🌧️
                    </span>

                    <div>
                      <small style={{ display: "block", fontSize: "11px", color: "#64748b" }}>Rainfall</small>

                      <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                        {location.rainfall} mm
                      </strong>
                    </div>

                  </div>


                  <div className="priority-metric" style={{ display: "flex", alignItems: "center", gap: "6px" }}>

                    <span className="metric-icon" style={{ fontSize: "16px" }}>
                      🌱
                    </span>

                    <div>
                      <small style={{ display: "block", fontSize: "11px", color: "#64748b" }}>Soil Moisture</small>

                      <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                        {location.soilMoisture}%
                      </strong>
                    </div>

                  </div>


                  <div className="priority-metric" style={{ display: "flex", alignItems: "center", gap: "6px" }}>

                    <span className="metric-icon" style={{ fontSize: "16px" }}>
                      ⛰️
                    </span>

                    <div>
                      <small style={{ display: "block", fontSize: "11px", color: "#64748b" }}>Slope</small>

                      <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                        {location.slope}°
                      </strong>
                    </div>

                  </div>

                </div>


                {/* RISK FOOTER */}
                <div 
                  className="priority-risk-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#fee2e2",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    marginTop: "auto"
                  }}
                >

                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#991b1b" }}>
                    LANDSLIDE RISK
                  </span>

                  <strong style={{ fontSize: "13px", color: "#991b1b" }}>
                    {riskLevel}
                  </strong>

                </div>

              </div>
            );

          })}

        </div>

      </section>


      {/* ================= SYSTEM SUMMARY ================= */}
      <section 
        className="card system-summary"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
      >

        <div className="section-heading" style={{ marginBottom: "16px" }}>

          <span 
            className="section-label"
            style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}
          >
            SYSTEM SUMMARY
          </span>

          <h2 style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a" }}>📊 Monitoring Overview</h2>

        </div>


        <div className="summary-text" style={{ display: "flex", flexDirection: "column", gap: "8px", color: "#334155", fontSize: "14px" }}>

          <p style={{ margin: 0 }}>
            The monitoring system is currently tracking{" "}
            <strong>{locations.length}</strong> locations.
          </p>

          <p style={{ margin: 0 }}>
            <strong>{highRisk.length}</strong> locations are classified as high risk,{" "}
            <strong>{mediumRisk.length}</strong> as medium risk, and{" "}
            <strong>{lowRisk.length}</strong> as low risk.
          </p>

          <p style={{ margin: 0 }}>
            The current average landslide risk across all monitored locations is{" "}
            <strong>{averageRisk.toFixed(1)}%</strong>.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Analytics;