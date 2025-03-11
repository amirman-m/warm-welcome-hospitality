
import React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface DateSelectionProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  selectedDate,
  setSelectedDate
}) => {
  const { language } = useLanguage();
  const [open, setOpen] = React.useState(false);
  
  // Format date based on language
  const formatDate = (date: Date) => {
    if (language === 'en') {
      return format(date, "MMMM d, yyyy");
    } else if (language === 'fa') {
      // Simple Persian date display (would need proper localization in production)
      return format(date, "yyyy/MM/dd");
    } else {
      // Simple Arabic date display (would need proper localization in production)
      return format(date, "dd/MM/yyyy");
    }
  };

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setOpen(false); // Close the popover after selection
  };

  return (
    <div className="mb-6 animate-fade-in">
      <h3 className="font-medium mb-3 flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" />
        {getTranslation('selectDate', language)}
      </h3>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              formatDate(selectedDate)
            ) : (
              <span>{getTranslation('selectDate', language)}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          sideOffset={4}
          side="bottom"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
            disabled={(date) => date < new Date()}
            className="p-3 z-50 bg-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelection;
