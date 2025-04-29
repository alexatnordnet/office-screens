import { useEffect } from "react";
import { useScreenManager } from "./hooks/useScreenManager";
import ScreenTransition from "./components/ScreenTransition";
import WeatherScreen from "./screens/WeatherScreen";
import PlaceholderScreen from "./screens/PlaceholderScreen";
import { ScreenType } from "./types/screen";
import config from "../config.json";

const SCREEN_COMPONENTS = {
  weather: WeatherScreen,
  placeholder: PlaceholderScreen,
};

// Get screen rotation configuration from config
const SCREEN_ROTATION_INTERVAL = config.screenRotation?.interval || 60000; // Default to 60 seconds
const SCREEN_ROTATION_ENABLED = config.screenRotation?.enabled !== false; // Default to true
const AVAILABLE_SCREENS: ScreenType[] = ["weather", "placeholder"];

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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space bar to manually switch screens
      if (e.code === "Space") {
        nextScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextScreen]);

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
