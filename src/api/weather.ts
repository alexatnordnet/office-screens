import { CityWeather } from "../types/weather";
import { fetchYrWeatherData } from "./yrWeather";

// Import cities from config
import config from "../../config.json";
const CITIES = config.cities;

// For now, use mock data as fallback
const MOCK_WEATHER: CityWeather[] = [
  {
    name: "Stockholm",
    temperature: 3,
    weatherType: "sunny",
    imageUrl: "/images/stockholm.jpg",
    timezone: "Europe/Stockholm",
  },
  {
    name: "Berlin",
    temperature: 8,
    weatherType: "partly-cloudy",
    imageUrl: "/images/berlin.jpg",
    timezone: "Europe/Berlin",
  },
  {
    name: "Oslo",
    temperature: 13,
    weatherType: "cloudy",
    imageUrl: "/images/oslo.jpg",
    timezone: "Europe/Oslo",
  },
  {
    name: "Helsinki",
    temperature: 15,
    weatherType: "cloudy",
    imageUrl: "/images/helsinki.jpg",
    timezone: "Europe/Helsinki",
  },
  {
    name: "Copenhagen",
    temperature: 7,
    weatherType: "rainy",
    imageUrl: "/images/copenhagen.jpg",
    timezone: "Europe/Copenhagen",
  },
];

export const fetchWeatherData = async (): Promise<CityWeather[]> => {
  try {
    // Set useRealData to true to fetch real data from Yr.no API
    const useRealData = true;

    if (!useRealData) {
      return MOCK_WEATHER;
    }

    const weatherPromises = CITIES.map((city) => fetchYrWeatherData(city));
    return await Promise.all(weatherPromises);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Fallback to mock data
    return MOCK_WEATHER;
  }
};
