export const locations = [
  {
    id: "ooty",
    name: "Ooty",
    latitude: 11.4102,
    longitude: 76.695,
    rainfall: 120,
    soilMoisture: 75,
    slope: 32,
    risk: 68,
    temperature: 20.1,
    humidity: 49,
    windSpeed: 14.2,
    lastUpdated: "2 minutes ago",
  },

  {
    id: "coonoor",
    name: "Coonoor",
    latitude: 11.353,
    longitude: 76.795,
    rainfall: 145,
    soilMoisture: 78,
    slope: 35,
    risk: 72,
    temperature: 19.4,
    humidity: 62,
    windSpeed: 12.8,
    lastUpdated: "2 minutes ago",
  },

  {
    id: "kotagiri",
    name: "Kotagiri",
    latitude: 11.4208,
    longitude: 76.8606,
    rainfall: 95,
    soilMoisture: 65,
    slope: 28,
    risk: 54,
    temperature: 21.2,
    humidity: 55,
    windSpeed: 11.5,
    lastUpdated: "3 minutes ago",
  },

  {
    id: "gudalur",
    name: "Gudalur",
    latitude: 11.5009,
    longitude: 76.4897,
    rainfall: 180,
    soilMoisture: 82,
    slope: 38,
    risk: 88,
    temperature: 22.1,
    humidity: 72,
    windSpeed: 15.6,
    lastUpdated: "1 minute ago",
  },

  {
    id: "avalanche",
    name: "Avalanche",
    latitude: 11.3216,
    longitude: 76.5778,
    rainfall: 210,
    soilMoisture: 90,
    slope: 42,
    risk: 94,
    temperature: 18.7,
    humidity: 81,
    windSpeed: 17.4,
    lastUpdated: "1 minute ago",
  },
];

/*
  Convert numerical risk score
  into a readable risk level.
*/
export function getRiskLevel(risk) {
  if (risk >= 75) {
    return "HIGH";
  }

  if (risk >= 40) {
    return "MEDIUM";
  }

  return "LOW";
}

/*
  Convert numerical risk score
  into a CSS class.
*/
export function getRiskClass(risk) {
  if (risk >= 75) {
    return "high";
  }

  if (risk >= 40) {
    return "medium";
  }

  return "low";
}