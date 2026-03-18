import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import DoctorCard from "@/components/DoctorCard";
import AIAssistant from "@/components/AIAssistant";
import HistoryPanel from "@/components/HistoryPanel";
import StatsBar from "@/components/StatsBar";
import { doctors, consultationHistory } from "@/data/doctors";

const filters = ["All", "Online Now", "Cardiologist", "Dermatologist", "Neurologist", "Psychiatrist"];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredDoctors = doctors.filter((doc) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Online Now") return doc.online;
    return doc.specialty === activeFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsBar />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Doctors Grid */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                  Recommended Specialists
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Based on your health profile and availability
                </p>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">
                {filteredDoctors.length} doctors
              </span>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {filteredDoctors.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} index={i} />
              ))}
            </motion.div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No doctors found for this filter.</p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="text-sm text-primary font-medium mt-2 hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <HistoryPanel history={consultationHistory} />

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl card-shadow p-5">
              <h2 className="font-semibold text-card-foreground mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Upload Medical Records", emoji: "📋" },
                  { label: "Request Prescription Refill", emoji: "💊" },
                  { label: "Schedule Lab Test", emoji: "🧪" },
                  { label: "Emergency Consultation", emoji: "🚨" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors text-left"
                  >
                    <span className="text-lg">{action.emoji}</span>
                    <span className="text-sm font-medium text-card-foreground">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <AIAssistant />
    </div>
  );
}