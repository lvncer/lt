"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EnhancedDateListProps {
  dates: string[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  className?: string;
}

interface GroupedDates {
  [year: string]: string[];
}

export function EnhancedDateList({
  dates,
  selectedDate,
  onDateSelect,
  className,
}: EnhancedDateListProps) {
  const groupedDates = useMemo(() => {
    const grouped: GroupedDates = {};
    
    dates.forEach(dateStr => {
      try {
        const date = parseISO(dateStr);
        const year = date.getFullYear().toString();
        
        if (!grouped[year]) {
          grouped[year] = [];
        }
        grouped[year].push(dateStr);
      } catch {
        console.error("日付の解析に失敗しました:", dateStr);
      }
    });

    // Sort years and dates within each year
    Object.keys(grouped).forEach(year => {
      grouped[year].sort();
    });

    return grouped;
  }, [dates]);

  const sortedYears = Object.keys(groupedDates).sort();

  const formatDateDisplay = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      const monthDay = format(date, "M月d日", { locale: ja });
      const dayOfWeek = format(date, "E", { locale: ja });
      return `${monthDay} (${dayOfWeek})`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">予定のある日付</h3>
      
      <div className="space-y-4">
        {sortedYears.map(year => (
          <Card key={year} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span>{year}年</span>
                <Badge variant="outline" className="ml-auto">
                  {groupedDates[year].length}件
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {groupedDates[year].map(dateStr => {
                  const isSelected = dateStr === selectedDate;
                  
                  return (
                    <Button
                      key={dateStr}
                      variant={isSelected ? "default" : "ghost"}
                      className={`w-full justify-start text-left h-auto py-2 ${
                        isSelected 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => onDateSelect(dateStr)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">
                          {formatDateDisplay(dateStr)}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          ライトニングトーク
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {sortedYears.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>予定されているイベントはありません</p>
        </div>
      )}
    </div>
  );
}