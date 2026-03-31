"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllSession } from "../redux/slice/userSlice";
import type { AsyncHookResult } from "./use-allAppointment";

/** GET /create-session returns `{ session }` — user’s consultation sessions. */
export default function useFetchAllConsultation(): AsyncHookResult {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAllConsultation = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get<{ session?: unknown[]; consultation?: unknown[] }>(
          "/create-session"
        );
        if (cancelled) return;
        // API route returns `session`; legacy key `consultation` kept for compatibility
        const list = data?.session ?? data?.consultation;
        dispatch(setAllSession(Array.isArray(list) ? list : []));
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to load consultations"
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetchAllConsultation();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return { isLoading, error };
}
