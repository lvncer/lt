"use client";

import useSWR from "swr";
import { Talk } from "@/types/talk";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTalk(id: string | undefined) {
  const { data, error, isLoading } = useSWR<Talk>(
    id ? `/api/talk/${id}` : null,
    fetcher
  );

  return {
    talk: data,
    isLoading,
    isError: !!error,
  };
}
