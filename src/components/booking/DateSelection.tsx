
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

  return (
    <div className="mb-6 animate-fade-in">
      <h3 className="font-medium mb-3 flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" />
        {getTranslation('selectDate', language)}
      </h3>
      
      <Popover>
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
        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            disabled={(date) => date < new Date()}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelection;
