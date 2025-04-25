"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTalks() {
  const { data, error, isLoading } = useSWR("/api/talks", fetcher);

  return {
    talks: data || [],
    isLoading,
    isError: !!error,
  };
}
