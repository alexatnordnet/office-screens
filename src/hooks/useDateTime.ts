import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export interface DateTimeHook {
  currentDate: Date;
  formattedDate: string;
  formattedTime: string;
}

export const useDateTime = (): DateTimeHook => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    // Update date and time every second
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now);
      setFormattedDate(format(now, 'EEEE, d MMMM yyyy'));
      setFormattedTime(format(now, 'HH:mm:ss'));
    };

    // Initial update
    updateDateTime();

    // Set up interval for updates
    const interval = setInterval(updateDateTime, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    currentDate,
    formattedDate,
    formattedTime,
  };
};
