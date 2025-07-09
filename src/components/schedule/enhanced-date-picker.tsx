"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [inputValue, setInputValue] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  );

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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date-input" className="text-sm font-medium">日付を選択</Label>
        <Input
          id="date-input"
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
          <span>予定がある日付: {scheduleDates.length}件</span>
        </div>
      </div>
    </div>
  );
}