import { useScreenManager } from "./hooks/useScreenManager";
import ScreenTransition from "./components/ScreenTransition";
import WeatherScreen from "./screens/WeatherScreen";
import PlaceholderScreen from "./screens/PlaceholderScreen";
import { ScreenType } from "./types/screen";

// Import config from root (using the alias defined in vite.config.ts)
import config from "../config.json";

const SCREEN_COMPONENTS = {
  weather: WeatherScreen,
  placeholder: PlaceholderScreen,
};

// Get screen rotation configuration from config
const SCREEN_ROTATION_INTERVAL = config.screenRotation?.interval || 60000; // Default to 60 seconds
const SCREEN_ROTATION_ENABLED = config.screenRotation?.enabled !== false; // Default to true

// Get enabled screens from config
const AVAILABLE_SCREENS: ScreenType[] = Object.entries(config.screens || {})
  .filter(([_, screenConfig]) => screenConfig.enabled)
  .sort((a, b) => a[1].order - b[1].order)
  .map(([screenType]) => screenType as ScreenType);

// Default to weather if no screens are enabled
if (AVAILABLE_SCREENS.length === 0) {
  AVAILABLE_SCREENS.push('weather');
  console.warn('No screens enabled in config, defaulting to weather screen');
}

function App() {
  const { 
    currentScreen, 
    isTransitioning, 
    nextScreen 
  } = useScreenManager({
    initialScreen: "weather",
    rotationInterval: SCREEN_ROTATION_ENABLED ? SCREEN_ROTATION_INTERVAL : 0, // 0 disables rotation
    screens: AVAILABLE_SCREENS,
  });

  // Render the current screen component
  const CurrentScreenComponent = SCREEN_COMPONENTS[currentScreen];

  return (
    <ScreenTransition
      currentScreen={currentScreen}
      isTransitioning={isTransitioning}
    >
      <CurrentScreenComponent />
    </ScreenTransition>
  );
}

export default App;
