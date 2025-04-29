import { useState, useEffect, useCallback } from 'react';
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
  const switchToScreen = useCallback((screen: ScreenType) => {
    if (screen === currentScreen) {
      console.log(`Already on ${screen} screen, not switching`);
      return;
    }
    
    console.log(`Switching from ${currentScreen} to ${screen}`);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setTimeout(() => {
        setIsTransitioning(false);
        console.log(`Completed transition to ${screen}`);
      }, 500); // transition duration
    }, 500); // transition duration
  }, [currentScreen]);
  
  // Function to switch to the next screen in the rotation
  const nextScreen = useCallback(() => {
    const currentIndex = screens.indexOf(currentScreen);
    const nextIndex = (currentIndex + 1) % screens.length;
    const nextScreenName = screens[nextIndex];
    console.log(`Next screen called: ${currentScreen} -> ${nextScreenName}`);
    switchToScreen(nextScreenName);
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
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        console.log('Space key detected in hook');
        e.preventDefault();
        nextScreen();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    console.log('Global keyboard listener attached in hook');
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      console.log('Global keyboard listener removed in hook');
    };
  }, [nextScreen]);
  
  return {
    currentScreen,
    isTransitioning,
    switchToScreen,
    nextScreen
  };
};
