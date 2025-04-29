import { CityWeather, WeatherType } from '../types/weather';

const APP_NAME = 'Nordic-Weather-Dashboard/1.0';

// Map yr.no weather symbol codes to our simplified types
// Documentation: https://api.met.no/weatherapi/weathericon/2.0/documentation
const mapWeatherSymbol = (symbolCode: string): WeatherType => {
  // Extract the base symbol without time of day or intensity
  const baseSymbol = symbolCode.split('_')[0];
  
  if (baseSymbol.includes('rain') || baseSymbol.includes('sleet')) {
    return 'rainy';
  } else if (baseSymbol.includes('snow')) {
    return 'snowy';
  } else if (baseSymbol === 'partlycloudy') {
    return 'partly-cloudy';
  } else if (
    baseSymbol.includes('cloud') || 
    baseSymbol.includes('fog')
  ) {
    return 'cloudy';
  } else {
    // clearsky, fair, etc.
    return 'sunny';
  }
};

export const fetchYrWeatherData = async (city: { 
  name: string; 
  lat: number; 
  lon: number; 
  imageUrl: string;
  timezone: string;
}): Promise<CityWeather> => {
  try {
    const response = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${city.lat.toFixed(4)}&lon=${city.lon.toFixed(4)}`,
      {
        headers: {
          'User-Agent': APP_NAME
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Get the current weather from the first timeseries
    const currentWeather = data.properties.timeseries[0];
    const symbolCode = currentWeather.data.next_1_hours?.summary?.symbol_code || 
                      currentWeather.data.next_6_hours?.summary?.symbol_code || 
                      'clearsky_day';
    
    const temperature = Math.round(currentWeather.data.instant.details.air_temperature);
    const weatherType = mapWeatherSymbol(symbolCode);
    
    return {
      name: city.name,
      temperature,
      weatherType,
      imageUrl: city.imageUrl,
      timezone: city.timezone
    };
  } catch (error) {
    console.error(`Error fetching weather for ${city.name}:`, error);
    // Return a fallback with default values
    return {
      name: city.name,
      temperature: 0,
      weatherType: 'sunny',
      imageUrl: city.imageUrl,
      timezone: city.timezone
    };
  }
};
