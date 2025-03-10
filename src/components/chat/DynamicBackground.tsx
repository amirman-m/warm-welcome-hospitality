
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
    // Pre-load image first to avoid blank background
    const img = new Image();
    img.src = backgrounds[timeOfDay];
    img.onload = () => setLoaded(true);
    
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

    // Set initial time of day
    updateTimeOfDay();
    
    // Update time of day every minute
    const interval = setInterval(updateTimeOfDay, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Update background when time of day changes
  useEffect(() => {
    if (timeOfDay) {
      const img = new Image();
      img.src = backgrounds[timeOfDay];
      img.onload = () => setLoaded(true);
    }
  }, [timeOfDay]);

  console.log("Background state:", { timeOfDay, loaded, backgroundUrl: backgrounds[timeOfDay] });

  if (!loaded) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with higher z-index */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${backgrounds[timeOfDay]})` }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" /> 
      {/* Content with highest z-index */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
