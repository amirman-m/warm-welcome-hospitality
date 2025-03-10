
import React from 'react';
import { useEffect, useState } from 'react';

const backgrounds = {
  morning: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  afternoon: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  evening: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
};

const DynamicBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${backgrounds[timeOfDay]})` }}
      />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" /> {/* Enhanced overlay for better readability */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
