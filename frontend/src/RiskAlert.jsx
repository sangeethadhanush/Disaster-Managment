function RiskAlert({ data }) {
  if (!data) return null;

  const riskLevel = data.risk_level?.toLowerCase();

  let title = "";
  let message = "";
  let action = "";

  if (riskLevel === "high") {
    title = "🚨 HIGH LANDSLIDE RISK";
    message = `${data.location} is currently showing dangerous landslide conditions.`;
    action = "Evacuate vulnerable areas and notify emergency authorities.";
  } else if (riskLevel === "medium") {
    title = "⚠️ MODERATE LANDSLIDE RISK";
    message = `${data.location} is showing conditions that may increase landslide probability.`;
    action = "Monitor rainfall and ground conditions closely.";
  } else {
    title = "🟢 LOW LANDSLIDE RISK";
    message = `${data.location} is currently showing relatively stable conditions.`;
    action = "Continue routine monitoring.";
  }

  return (
    <div className={`risk-alert ${riskLevel}`}>

      <div className="alert-icon">
        {riskLevel === "high"
          ? "🚨"
          : riskLevel === "medium"
          ? "⚠️"
          : "🟢"}
      </div>

      <div className="alert-content">

        <h3>{title}</h3>

        <p>{message}</p>

        <strong>
          Risk Level: {data.risk_percentage}%
        </strong>

        <small>
          Recommended Action: {action}
        </small>

      </div>

    </div>
  );
}

export default RiskAlert;