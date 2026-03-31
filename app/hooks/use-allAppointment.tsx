"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAppointment } from "../redux/slice/userSlice";

export type AsyncHookResult = {
  isLoading: boolean;
  error: string | null;
};

/** Fetches user appointments and stores them in Redux. */
export default function useAppointments(): AsyncHookResult {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get<{ allappointment?: unknown[] }>(
          "/all-appointment"
        );
        if (cancelled) return;
        dispatch(setAppointment(Array.isArray(data?.allappointment) ? data.allappointment : []));
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load appointments");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetchAppointments();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return { isLoading, error };
}
