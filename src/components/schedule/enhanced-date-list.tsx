"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
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

    dates.forEach((dateStr) => {
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

    // 年を新しい順（降順）にソート
    const sortedYears = Object.keys(grouped).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );

    // 各年の日付を新しい順（降順）にソート
    sortedYears.forEach((year) => {
      grouped[year].sort((a, b) => {
        return parseISO(b).getTime() - parseISO(a).getTime();
      });
    });

    // Return sorted structure
    const sortedGrouped: GroupedDates = {};
    sortedYears.forEach((year) => {
      sortedGrouped[year] = grouped[year];
    });

    return sortedGrouped;
  }, [dates]);

  // 年を新しい順（降順）にソート
  const sortedYears = Object.keys(groupedDates).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

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

      <div className="space-y-3">
        {sortedYears.map((year) => (
          <div key={year} className="border rounded-lg overflow-hidden bg-card">
            <div className="px-4 py-3 border-b bg-muted/50">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium">{year}年</h4>
                <Badge variant="outline">{groupedDates[year].length}件</Badge>
              </div>
            </div>
            <div className="p-3">
              <div className="space-y-2">
                {groupedDates[year].map((dateStr) => {
                  const isSelected = dateStr === selectedDate;

                  return (
                    <Button
                      key={dateStr}
                      variant={isSelected ? "default" : "ghost"}
                      className={`w-full justify-start text-left h-auto py-2 hover:bg-gray-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => onDateSelect(dateStr)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">
                          {formatDateDisplay(dateStr)}
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
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
