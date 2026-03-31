"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllNotifications } from "../redux/slice/userSlice";
import type { AsyncHookResult } from "./use-allAppointment";

/** Fetches notifications and stores them in Redux. */
export default function useNotification(): AsyncHookResult {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchNoti = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get<{ notifications?: unknown[] }>(
          "/fetch-all-notifications"
        );
        if (cancelled) return;
        dispatch(
          setAllNotifications(
            Array.isArray(data?.notifications) ? data.notifications : []
          )
        );
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to load notifications"
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetchNoti();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return { isLoading, error };
}
