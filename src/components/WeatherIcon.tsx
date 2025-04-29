import React from 'react';

interface WeatherIconProps {
  type: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly-cloudy';
  size?: 'sm' | 'md' | 'lg';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ type, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const iconClass = size ? sizeClasses[size] : sizeClasses.md;

  // Simple SVG icons for different weather types
  const renderIcon = () => {
    switch (type) {
      case 'sunny':
        return (
          <svg className={`${iconClass} text-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5" fill="white" />
            <line x1="12" y1="4" x2="12" y2="2" stroke="white" strokeWidth="1.5" />
            <line x1="12" y1="20" x2="12" y2="22" stroke="white" strokeWidth="1.5" />
            <line x1="4" y1="12" x2="2" y2="12" stroke="white" strokeWidth="1.5" />
            <line x1="20" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" />
            <line x1="6.34" y1="6.34" x2="4.93" y2="4.93" stroke="white" strokeWidth="1.5" />
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke="white" strokeWidth="1.5" />
            <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" stroke="white" strokeWidth="1.5" />
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="white" strokeWidth="1.5" />
          </svg>
        );
      case 'partly-cloudy':
        return (
          <svg className={`${iconClass} text-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="10" cy="9" r="3" fill="white" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 16a3 3 0 1 1 3-3c0 1.6 1.4 3 3 3h1a4 4 0 0 0 0-8h-.6" fill="none" />
          </svg>
        );
      case 'cloudy':
        return (
          <svg className={`${iconClass} text-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9.05C9 7.8 10.5 7 12 7c2.76 0 5 2.24 5 5" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16a4 4 0 004 4h10a5 5 0 100-10h-1a7 7 0 00-13 4z" fill="none" />
          </svg>
        );
      case 'rainy':
        return (
          <svg className={`${iconClass} text-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9.05C9 7.8 10.5 7 12 7c2.76 0 5 2.24 5 5" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16a4 4 0 004 4h10a5 5 0 100-10h-1a7 7 0 00-13 4z" fill="none" />
            <line x1="8" y1="19" x2="8" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="19" x2="12" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="19" x2="16" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'snowy':
        return (
          <svg className={`${iconClass} text-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9.05C9 7.8 10.5 7 12 7c2.76 0 5 2.24 5 5" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16a4 4 0 004 4h10a5 5 0 100-10h-1a7 7 0 00-13 4z" fill="none" />
            <circle cx="8" cy="20" r="1" fill="white" />
            <circle cx="12" cy="22" r="1" fill="white" />
            <circle cx="16" cy="20" r="1" fill="white" />
          </svg>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};

export default WeatherIcon;