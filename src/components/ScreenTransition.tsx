import React from 'react';
import { ScreenType } from '../types/screen';

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
      className={`
        w-full h-full transition-opacity duration-500 ease-in-out
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
      data-screen={currentScreen}
    >
      {children}
    </div>
  );
};

export default ScreenTransition;
