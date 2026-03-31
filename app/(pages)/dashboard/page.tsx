"use client";
import ChatModal from "@/app/(pages)/dashboard/components/ChatModel";
import { DoctorCard } from "@/app/(pages)/dashboard/components/DoctorCard";
import { StatCard } from "@/app/(pages)/dashboard/components/StatCard";
import { DashboardPageSkeleton } from "@/app/components/skeleton/DashboardPageSkeleton";
import { consultations, Doctor, doctors } from "@/app/data/data";
import useAppointments from "@/app/hooks/use-allAppointment";
import useFetchAllConsultation from "@/app/hooks/use-fetchallConsultation";
import useNotification from "@/app/hooks/use-notifications";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

function sessionIsCompleted(c: { status?: string[] }) {
  return Array.isArray(c.status) && c.status.includes("completed");
}

type BookingRow = {
  id: string;
  avatar?: string;
  doctorName: string;
  specialization: string;
  date: string;
  timing: string;
  status?: string;
};

export default function DashboardPage() {
  const [chatDoctor, setChatDoctor] = useState<Doctor | null>(null);
  const { profileData, appointment, allSession } = useSelector(
    (state: { user: { profileData?: { name?: string }; appointment: unknown[]; allSession: unknown[] } }) =>
      state.user
  );

  const { isLoading: loadingAppointments } = useAppointments();
  const { isLoading: loadingNotifications } = useNotification();
  const { isLoading: loadingSessions } = useFetchAllConsultation();

  const dataLoading =
    loadingAppointments || loadingNotifications || loadingSessions;

  const topDoctors = useMemo(
    () => doctors.filter((d) => d.rating >= 4.5).slice(0, 4),
    []
  );

  const sessionCount = Array.isArray(allSession) ? allSession.length : 0;

  const pendingList = useMemo((): BookingRow[] => {
    if (!Array.isArray(appointment)) return [];
    return appointment.filter(
      (c) => (c as BookingRow).status === "pending"
    ) as BookingRow[];
  }, [appointment]);

  const allappointment = pendingList;
  const doctorConsulted = useMemo(() => {
    if (!Array.isArray(allSession)) return [];
    return allSession.filter((c) =>
      sessionIsCompleted(c as { status?: string[] })
    );
  }, [allSession]);

  const stats = useMemo(
    () => [
      {
        title: "Total Consultations",
        value: sessionCount,
        change: "+12% this month",
        icon: Activity,
        color: "primary" as const,
      },
      {
        title: "Upcoming Appointments",
        value: allappointment.length,
        change: "Next: Today 3:00 PM",
        icon: Calendar,
        color: "accent" as const,
      },
      {
        title: "Doctors Consulted",
        value: doctorConsulted.length,
        change: "+2 this month",
        icon: Users,
        color: "warning" as const,
      },
      {
        title: "Avg. Wait Time",
        value: "8 min",
        icon: Clock,
        color: "destructive" as const,
      },
    ],
    [sessionCount, allappointment.length, doctorConsulted.length]
  );

  const pendingAppointments = useMemo(
    () => pendingList.slice(0, 4),
    [pendingList]
  );

  if (dataLoading) {
    return <DashboardPageSkeleton />;
  }

  return (
    <div className="space-y-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-linear-to-r from-emerald-300 to-sky-300 rounded-xl p-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, {profileData?.name} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here&apos;s your health overview for today
          </p>
        </div>
        <Link
          href="/dashboard/doctors"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors w-fit px-5 py-2.5"
        >
          Consult a Doctor <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl bg-card border border-border p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-card-foreground">
            Upcoming Appointments
          </h2>
          <Link
            href="/dashboard/history"
            className="text-xs text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {pendingAppointments.length > 0 ? (
            pendingAppointments.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
              >
                <img
                  src={c.avatar}
                  alt={c.doctorName}
                  className="h-10 w-10 rounded-full bg-secondary"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {c.doctorName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.specialization} · {c.date} at {c.timing}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-warning/10 text-warning text-[11px] font-medium">
                  Pending
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming appointments
            </p>
          )}
        </div>
      </motion.div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Top Rated Doctors</h2>
          <Link
            href="/dashboard/doctors"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            See all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topDoctors.map((doc, i) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              index={i}
              onConsult={setChatDoctor}
            />
          ))}
        </div>
      </div>

      {chatDoctor && (
        <ChatModal doctor={chatDoctor} onClose={() => setChatDoctor(null)} />
      )}
    </div>
  );
}
