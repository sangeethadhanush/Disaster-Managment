from flask import Flask, jsonify
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "data",
    "landslide_data.csv"
)


def load_locations():
    locations = []

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            locations.append({
                "location": row["location"],
                "rainfall_24h": float(row["rainfall_24h"]),
                "soil_moisture": float(row["soil_moisture"]),
                "slope": float(row["slope"]),
                "risk_percentage": float(row["risk_percentage"]),
                "risk_level": row["risk_level"]
            })

    return locations


@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "Landslide Early Warning System API"
    })


@app.route("/api/locations")
def get_locations():
    return jsonify(load_locations())


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)