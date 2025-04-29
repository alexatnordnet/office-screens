import { useEffect, useState } from "react";
import WeatherCity from "./components/WeatherCity";
import { fetchWeatherData } from "./api/weather";
import { CityWeather } from "./types/weather";
import config from "../config.json";

function App() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data on component mount
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData();
        setCities(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();

    // Refresh weather data based on config interval
    const weatherRefreshInterval = setInterval(() => {
      getWeatherData();
    }, config.updateInterval);

    return () => {
      clearInterval(weatherRefreshInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-grow">
        <div className="grid grid-cols-5 h-[calc(100vh-30px)]">
          {cities.map((city) => (
            <WeatherCity
              key={city.name}
              name={city.name}
              temperature={city.temperature}
              weatherType={city.weatherType}
              imageUrl={city.imageUrl}
              timezone={city.timezone}
            />
          ))}
        </div>
      </div>
      <div className="text-xs text-white opacity-70 text-center py-2">
        Weather data from{" "}
        <a
          href="https://www.yr.no/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Yr.no
        </a>
        , delivered by the Norwegian Meteorological Institute
      </div>
    </div>
  );
}

export default App;
