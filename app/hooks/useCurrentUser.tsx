"use client";

import api from "@/lib/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileData } from "../redux/slice/userSlice";
import { useRouter } from "next/navigation";

/** Side-effect component: loads profile into Redux; redirects to SignIn if no user. */
export default function useCurrentUser() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const { data } = await api.get<{
          currentUserData?: { id: string; name: string; email: string };
        }>("/get-current-user");
        if (cancelled) return;
        if (data?.currentUserData) {
          dispatch(setProfileData(data.currentUserData));
        } else {
          router.push("/SignIn");
        }
      } catch {
        // Not signed in or session expired — profile stays unset
      }
    };

    void fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [dispatch, router]);

  return null;
}
