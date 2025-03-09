
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  route: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  route,
  className
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const rippleEffect = () => {
      navigate(route);
    };
    
    // Add slight delay to show ripple effect before navigation
    setTimeout(rippleEffect, 150);
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-6 glass-effect rounded-xl hover-scale transition-all duration-300",
        "shadow-sm hover:shadow-md active:scale-95",
        className
      )}
      onClick={handleClick}
    >
      <Icon className="w-8 h-8 mb-3 text-hotel-gold" />
      <h3 className="font-medium text-hotel-charcoal">{title}</h3>
    </div>
  );
};

export default FeatureCard;
