
import React from 'react';
import { useEffect, useState } from 'react';

const backgrounds = {
  morning: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  afternoon: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  evening: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
};

const DynamicBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [loaded, setLoaded] = useState(false);

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
    
    // Preload background image
    const img = new Image();
    img.src = backgrounds[timeOfDay];
    img.onload = () => setLoaded(true);
    
    return () => clearInterval(interval);
  }, []);

  // Ensure image is loaded immediately on initial render
  useEffect(() => {
    if (!loaded) {
      const img = new Image();
      img.src = backgrounds[timeOfDay];
      img.onload = () => setLoaded(true);
    }
  }, [timeOfDay, loaded]);

  console.log("Background state:", { timeOfDay, loaded, backgroundUrl: backgrounds[timeOfDay] });

  return (
    <div className="relative min-h-screen w-full">
      {/* Background image */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${backgrounds[timeOfDay]})` }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" /> 
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
