import { useState, useEffect } from "react";
import { LtSession } from "@/types/talk";

// セッション一覧取得用Hook
export function useLtSessions() {
  const [sessions, setSessions] = useState<LtSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/lt-sessions");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sessions: ${response.status}`);
      }
      
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "セッションの取得に失敗しました";
      setError(errorMessage);
      console.error("useLtSessions error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const refetch = () => {
    fetchSessions();
  };

  return {
    sessions,
    isLoading,
    error,
    refetch,
  };
}

// 利用可能セッション取得用Hook（フォーム用）
export function useAvailableSessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailableSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/available-sessions");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch available sessions: ${response.status}`);
      }
      
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "利用可能なセッションの取得に失敗しました";
      setError(errorMessage);
      console.error("useAvailableSessions error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSessions();
  }, []);

  const refetch = () => {
    fetchAvailableSessions();
  };

  return {
    sessions,
    isLoading,
    error,
    refetch,
  };
}

// セッション管理用Hook（作成・更新・削除）
export function useSessionManagement() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const createSession = async (sessionData: {
    session_number: number;
    date: string;
    title?: string;
    venue: string;
    start_time?: string;
    end_time?: string;
  }) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/lt-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "セッションの作成に失敗しました");
      }

      return await response.json();
    } catch (error) {
      console.error("createSession error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSession = async (sessionData: {
    id: number;
    session_number?: number;
    date?: string;
    title?: string;
    venue?: string;
    start_time?: string;
    end_time?: string;
  }) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/lt-sessions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "セッションの更新に失敗しました");
      }

      return await response.json();
    } catch (error) {
      console.error("updateSession error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSession = async (sessionId: number) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/lt-sessions?id=${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "セッションの削除に失敗しました");
      }

      return await response.json();
    } catch (error) {
      console.error("deleteSession error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createSession,
    updateSession,
    deleteSession,
    isSubmitting,
  };
}
