import React from 'react';
import { ScreenType } from '../types/screen';

// Should match TRANSITION_DURATION in useScreenManager.ts
const TRANSITION_DURATION_MS = 500;

interface ScreenTransitionProps {
  currentScreen: ScreenType;
  isTransitioning: boolean;
  children: React.ReactNode;
}

const ScreenTransition: React.FC<ScreenTransitionProps> = ({
  currentScreen,
  isTransitioning,
  children,
}) => {
  return (
    <div
      className={`w-full h-screen transition-opacity ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      data-screen={currentScreen}
      style={{
        transitionDuration: `${TRANSITION_DURATION_MS}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScreenTransition;
