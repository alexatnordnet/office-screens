import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import WeatherIcon from "./WeatherIcon";

interface WeatherCityProps {
  name: string;
  temperature: number;
  weatherType: "sunny" | "cloudy" | "rainy" | "snowy" | "partly-cloudy";
  imageUrl: string;
  timezone: string;
}

const WeatherCity: React.FC<WeatherCityProps> = ({
  name,
  temperature,
  weatherType,
  imageUrl,
  timezone,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const cityTime = utcToZonedTime(now, timezone);
      setCurrentTime(format(cityTime, "HH:mm:ss"));
    };
    
    // Update immediately
    updateTime();
    
    // Then update every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);
  
  return (
    <div className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: "brightness(0.7)",
        }}
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-5 z-20 min-h-[400px]">
        <div className="flex flex-col items-center">
          <h2 className="text-yellow-300 text-4xl font-bold">{name}</h2>
          <div className="text-white text-lg mt-1">{currentTime}</div>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <WeatherIcon type={weatherType} size="lg" />
          <span className="text-white text-6xl mt-2">{temperature}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCity;
