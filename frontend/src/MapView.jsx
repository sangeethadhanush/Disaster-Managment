import { locations, getRiskClass } from "../data/locations";

function MapView() {
  return (
    <div className="simple-map">

      <div className="map-title">
        🗺️ Risk Monitoring Map
      </div>

      <div className="map-grid">

        {locations.map((location) => {

          const riskClass =
            getRiskClass(location.risk);

          return (
            <div
              key={location.id}
              className={`map-location ${riskClass}`}
            >

              <span className="map-marker">
                📍
              </span>

              <strong>
                {location.name}
              </strong>

              <small>
                {location.risk}% risk
              </small>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default MapView;