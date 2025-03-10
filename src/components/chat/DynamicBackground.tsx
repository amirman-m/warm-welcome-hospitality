
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

  // Set the time of day based on current time
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

    // Set initial time of day
    updateTimeOfDay();
    
    // Update time of day every minute
    const interval = setInterval(updateTimeOfDay, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Load the background image
  useEffect(() => {
    console.log(`Loading background image for ${timeOfDay}...`);
    const img = new Image();
    img.src = backgrounds[timeOfDay];
    img.onload = () => {
      console.log(`Background image for ${timeOfDay} loaded successfully`);
      setLoaded(true);
    };
    img.onerror = (err) => {
      console.error(`Failed to load background image for ${timeOfDay}:`, err);
      // Fallback to show content even if image fails to load
      setLoaded(true);
    };
  }, [timeOfDay]);

  console.log("Background state:", { timeOfDay, loaded, backgroundUrl: backgrounds[timeOfDay] });

  // Show a loading state while waiting for the background image
  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgrounds[timeOfDay]})`,
          transition: 'opacity 1s ease'
        }}
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
