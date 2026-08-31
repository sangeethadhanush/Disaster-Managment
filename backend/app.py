from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import os
import requests

app = Flask(__name__)
CORS(app)

# --------------------------------------------------
# CSV DATA PATH
# --------------------------------------------------

CSV_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "data",
    "landslide_data.csv"
)


# --------------------------------------------------
# LOAD LANDSLIDE DATA
# --------------------------------------------------

def load_data():
    data = []

    try:
        with open(CSV_PATH, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                data.append({
                    "location": row["location"],
                    "rainfall_24h": float(row["rainfall_24h"]),
                    "soil_moisture": float(row["soil_moisture"]),
                    "slope": float(row["slope"]),
                    "risk_percentage": float(row["risk_percentage"]),
                    "risk_level": row["risk_level"]
                })

    except FileNotFoundError:
        print("ERROR: landslide_data.csv not found.")
        return []

    except Exception as error:
        print("ERROR loading CSV:", error)
        return []

    return data


# --------------------------------------------------
# HOME API
# --------------------------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Landslide Early Warning System API is running",
        "status": "online"
    })


# --------------------------------------------------
# GET ALL LANDSLIDE DATA
# --------------------------------------------------

@app.route("/api/data", methods=["GET"])
def get_data():
    data = load_data()
    return jsonify(data)


# --------------------------------------------------
# GET DATA FOR ONE LOCATION
# --------------------------------------------------

@app.route("/api/data/<location>", methods=["GET"])
def get_location(location):

    data = load_data()

    for row in data:
        if row["location"].lower() == location.lower():
            return jsonify(row)

    return jsonify({
        "error": "Location not found"
    }), 404


# --------------------------------------------------
# AI RISK PREDICTION
# --------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def predict_risk():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No input data received"
            }), 400

        rainfall = float(data.get("rainfall_24h", 0))
        soil_moisture = float(data.get("soil_moisture", 0))
        slope = float(data.get("slope", 0))

        # ------------------------------------------
        # NORMALIZE VALUES
        # ------------------------------------------

        rainfall_score = min(max(rainfall / 250, 0), 1)
        moisture_score = min(max(soil_moisture / 100, 0), 1)
        slope_score = min(max(slope / 45, 0), 1)

        # ------------------------------------------
        # WEIGHTED RISK CALCULATION
        # ------------------------------------------

        risk = (
            rainfall_score * 0.45
            + moisture_score * 0.30
            + slope_score * 0.25
        ) * 100

        risk = round(risk, 2)

        # ------------------------------------------
        # RISK LEVEL
        # ------------------------------------------

        if risk >= 70:
            risk_level = "High"
        elif risk >= 40:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        # ------------------------------------------
        # RECOMMENDATION
        # ------------------------------------------

        if risk_level == "High":
            recommendation = (
                "Immediate attention required. "
                "Monitor the area closely and consider "
                "early warning or evacuation measures."
            )

        elif risk_level == "Medium":
            recommendation = (
                "Monitor rainfall and ground conditions "
                "closely. Prepare for possible changes "
                "in landslide risk."
            )

        else:
            recommendation = (
                "Current conditions indicate relatively "
                "low landslide risk. Continue monitoring."
            )

        return jsonify({
            "rainfall_24h": rainfall,
            "soil_moisture": soil_moisture,
            "slope": slope,
            "risk_percentage": risk,
            "risk_level": risk_level,
            "recommendation": recommendation
        })

    except (ValueError, TypeError) as error:

        return jsonify({
            "error": "Invalid input values",
            "details": str(error)
        }), 400

    except Exception as error:

        return jsonify({
            "error": "Prediction failed",
            "details": str(error)
        }), 500


# --------------------------------------------------
# LOCATION COORDINATES
# --------------------------------------------------

LOCATION_COORDINATES = {
    "Ooty": (11.4064, 76.6932),
    "Coonoor": (11.3530, 76.7959),
    "Kotagiri": (11.4200, 76.8833),
    "Gudalur": (11.5000, 76.5000),
    "Avalanche": (11.3500, 76.5667)
}


# --------------------------------------------------
# LIVE WEATHER API
# --------------------------------------------------

@app.route("/api/weather/<location>", methods=["GET"])
def get_weather(location):

    # Find location ignoring uppercase/lowercase
    selected_location = None

    for name in LOCATION_COORDINATES:

        if name.lower() == location.lower():
            selected_location = name
            break

    if selected_location is None:

        return jsonify({
            "error": "Location not found"
        }), 404

    latitude, longitude = LOCATION_COORDINATES[selected_location]

    # Open-Meteo API
    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitude}"
        f"&longitude={longitude}"
        "&current="
        "temperature_2m,"
        "relative_humidity_2m,"
        "precipitation,"
        "rain,"
        "wind_speed_10m"
        "&timezone=auto"
    )

    try:

        response = requests.get(
            url,
            timeout=10
        )

        response.raise_for_status()

        weather = response.json()

        current = weather.get("current", {})

        return jsonify({

            "location": selected_location,

            "temperature": current.get(
                "temperature_2m"
            ),

            "humidity": current.get(
                "relative_humidity_2m"
            ),

            "precipitation": current.get(
                "precipitation"
            ),

            "rain": current.get(
                "rain"
            ),

            "wind_speed": current.get(
                "wind_speed_10m"
            ),

            "time": current.get(
                "time"
            )

        })

    except requests.RequestException as error:

        return jsonify({

            "error": "Weather service unavailable",

            "details": str(error)

        }), 503

    except Exception as error:

        return jsonify({

            "error": "Unable to process weather data",

            "details": str(error)

        }), 500


# --------------------------------------------------
# HEALTH CHECK API
# --------------------------------------------------

@app.route("/api/health", methods=["GET"])
def health_check():

    return jsonify({

        "status": "healthy",

        "service": "Landslide Early Warning System",

        "backend": "Flask",

        "weather_api": "Open-Meteo",

        "prediction_api": "active"

    })


# --------------------------------------------------
# START SERVER
# --------------------------------------------------

if __name__ == "__main__":

    print("")
    print("==============================================")
    print("🌍 LANDSLIDE EARLY WARNING SYSTEM")
    print("==============================================")
    print("🚀 Flask Backend Starting...")
    print("📡 API: http://127.0.0.1:5000")
    print("📊 Data: /api/data")
    print("🔮 Prediction: /api/predict")
    print("🌦️ Weather: /api/weather/<location>")
    print("❤️ Health: /api/health")
    print("==============================================")
    print("")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )