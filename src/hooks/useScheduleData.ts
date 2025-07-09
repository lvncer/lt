"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { format } from "date-fns";
import { Talk } from "@/types/talk";

interface CachedScheduleData {
  [key: string]: Talk[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useScheduleData() {
  const {
    data: dates,
    error: datesError,
    isLoading: isDatesLoading,
  } = useSWR<string[]>("/api/schedule-dates", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 5 * 60 * 1000, // 5 minutes
  });

  const cachedData: CachedScheduleData = useMemo(() => ({}), []);

  const preloadScheduleData = async (targetDate: Date) => {
    if (!dates) return;

    const targetDateStr = format(targetDate, "yyyy-MM-dd");

    // Pre-fetch data for the target date if not already cached
    if (!cachedData[targetDateStr]) {
      try {
        const response = await fetch(
          `/api/daily-schedule?date=${targetDateStr}`
        );
        if (response.ok) {
          const data = await response.json();
          cachedData[targetDateStr] = data;
        }
      } catch (error) {
        console.error("Failed to preload schedule data:", error);
      }
    }
  };

  const getCachedScheduleData = (date: string) => {
    return cachedData[date] || null;
  };

  const clearCache = () => {
    Object.keys(cachedData).forEach((key) => {
      delete cachedData[key];
    });
  };

  return {
    dates: dates || [],
    isDatesLoading,
    datesError,
    preloadScheduleData,
    getCachedScheduleData,
    clearCache,
  };
}
