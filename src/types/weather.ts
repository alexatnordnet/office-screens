export type WeatherType = 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'snowy';

export interface CityWeather {
  name: string;
  temperature: number;
  weatherType: WeatherType;
  imageUrl: string;
  timezone: string;
}
