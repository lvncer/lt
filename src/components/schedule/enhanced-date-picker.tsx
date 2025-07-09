"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EnhancedDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  scheduleDates: string[];
}

export function EnhancedDatePicker({
  selectedDate,
  onDateChange,
  scheduleDates,
}: EnhancedDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setInputValue(format(date, "yyyy-MM-dd"));
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        onDateChange(date);
      }
    } catch {
      // Invalid date format, do nothing
    }
  };

  // Convert string dates to Date objects for highlighting
  const scheduleDateObjects = scheduleDates.map(dateStr => new Date(dateStr));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date-input">日付を直接入力</Label>
        <Input
          id="date-input"
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>カレンダーから選択</Label>
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
                format(selectedDate, "yyyy年MM月dd日")
              ) : (
                <span>日付を選択してください</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={handleDateSelect}
              initialFocus
              modifiers={{
                scheduleDate: scheduleDateObjects,
              }}
              modifiersStyles={{
                scheduleDate: {
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  fontWeight: 'bold',
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
          <span>予定がある日付</span>
        </div>
      </div>
    </div>
  );
}