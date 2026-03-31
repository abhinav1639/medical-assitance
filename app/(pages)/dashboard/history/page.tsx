"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import { consultations } from "@/app/data/data"
import { cn } from "@/lib/utils";

const statusColors = {
  completed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function HistoryPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");

  const filtered = consultations
    .filter((c) => statusFilter === "all" || c.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return a.doctorName.localeCompare(b.doctorName);
    });

  return (
    <div className="space-y-6 max-w-5xl ">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Consultation History</h1>
        <p className="text-sm text-muted-foreground mt-1">View your past and upcoming consultations</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "completed", "pending", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
              statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {s}
          </button>
        ))}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "name")}
          className="ml-auto px-3 py-1.5 rounded-lg bg-card border border-border text-xs text-foreground"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-card border border-border overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
            >
              <img src={c.avatar} alt={c.doctorName} className="h-10 w-10 rounded-full bg-secondary shrink-0" />
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{c.doctorName}</p>
                <p className="text-xs text-muted-foreground">{c.specialization} · {c.date} at {c.time}</p>
              </div>
              <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-medium capitalize shrink-0", statusColors[c.status])}>
                {c.status}
              </span>
              <motion.div animate={{ rotate: expandedId === c.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedId === c.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mt-3">{c.notes}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Filter className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No consultations found</p>
        </div>
      )}
    </div>
  );
}