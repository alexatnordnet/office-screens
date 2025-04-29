import { useState, useEffect, useCallback } from 'react';
import { ScreenType } from '../types/screen';

// Constants
const TRANSITION_DURATION = 500; // in milliseconds

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
  const switchToScreen = useCallback((screen: ScreenType) => {
    if (screen === currentScreen) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }, TRANSITION_DURATION);
  }, [currentScreen]);
  
  // Function to switch to the next screen in the rotation
  const nextScreen = useCallback(() => {
    const currentIndex = screens.indexOf(currentScreen);
    const nextIndex = (currentIndex + 1) % screens.length;
    switchToScreen(screens[nextIndex]);
  }, [currentScreen, screens, switchToScreen]);
  
  // Set up the screen rotation interval
  useEffect(() => {
    if (rotationInterval <= 0 || screens.length <= 1) return;
    
    const interval = setInterval(() => {
      nextScreen();
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [currentScreen, rotationInterval, screens, nextScreen]);
  
  // Setup global keyboard handler for space key
  useEffect(() => {
    // Skip if we only have one screen
    if (screens.length <= 1) return;
    
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        nextScreen();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [nextScreen, screens.length]);
  
  return {
    currentScreen,
    isTransitioning,
    switchToScreen,
    nextScreen
  };
};
