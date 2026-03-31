"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { doctors, Doctor } from "@/app/data/data";
import { DoctorCard } from "@/app/(pages)/dashboard/components/DoctorCard";
import ChatModal  from "@/app/(pages)/dashboard/components/ChatModel";

const specializations = ["All", ...new Set(doctors.map((d) => d.specialization))];
const ratingFilters = ["All", "4.5+", "4.0+", "3.5+"];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [chatDoctor, setChatDoctor] = useState<Doctor | null>(null);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
      const matchSpec = specFilter === "All" || d.specialization === specFilter;
      const matchRating = ratingFilter === "All" || d.rating >= parseFloat(ratingFilter);
      return matchSearch && matchSpec && matchRating;
    });
  }, [search, specFilter, ratingFilter]);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Find a Doctor</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse and consult with our specialists</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialization..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={specFilter}
            onChange={(e) => setSpecFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {specializations.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {ratingFilters.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} doctors found</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((doc, i) => (
          <DoctorCard key={doc.id} doctor={doc} index={i} onConsult={setChatDoctor} />
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Filter className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No doctors match your filters</p>
        </motion.div>
      )}

      {chatDoctor && <ChatModal doctor={chatDoctor} onClose={() => setChatDoctor(null)} />}
    </div>
  );
}
