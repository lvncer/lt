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

// トークを更新する関数
export async function updateTalk(updatedTalk: {
  id: number;
  title: string;
  duration: number;
  topic: string;
  description: string;
  image_url: string;
  presentation_date: string;
  venue: string;
}): Promise<Response> {
  const response = await fetch(`/api/talks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTalk),
  });

  if (!response.ok) {
    throw new Error("Failed to update talk");
  }

  return response;
}

// トークを削除する関数
export async function deleteTalk(id: string): Promise<Response> {
  const response = await fetch(`/api/talks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete talk");
  }

  return response;
}
