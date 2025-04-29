import { useState, useEffect } from 'react';
import { ScreenType } from '../types/screen';

interface UseScreenManagerOptions {
  initialScreen: ScreenType;
  rotationInterval?: number; // in milliseconds
  screens: ScreenType[];
}

export const useScreenManager = ({ 
  initialScreen, 
  rotationInterval = 60000, // default to 1 minute
  screens 
}: UseScreenManagerOptions) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(initialScreen);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  // Function to switch to a specific screen
  const switchToScreen = (screen: ScreenType) => {
    if (screen === currentScreen) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // transition duration
    }, 500); // transition duration
  };
  
  // Function to switch to the next screen in the rotation
  const nextScreen = () => {
    const currentIndex = screens.indexOf(currentScreen);
    const nextIndex = (currentIndex + 1) % screens.length;
    switchToScreen(screens[nextIndex]);
  };
  
  // Set up the screen rotation interval
  useEffect(() => {
    if (rotationInterval <= 0 || screens.length <= 1) return;
    
    const interval = setInterval(() => {
      nextScreen();
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [currentScreen, rotationInterval, screens]);
  
  return {
    currentScreen,
    isTransitioning,
    switchToScreen,
    nextScreen
  };
};
