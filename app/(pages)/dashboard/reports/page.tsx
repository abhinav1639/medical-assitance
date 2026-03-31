"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  User,
  AlertTriangle,
  Shield,
  Pill,
  Lightbulb,
  Activity,
  Search,
  ChevronRight,
  Stethoscope,
  Heart,
  X,
  Clock,
  TrendingUp,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { medicalReports } from "@/app/data/medical-reports";

const severityConfig: Record<string, { label: string; color: string; bg: string; dot: string; glow: string }> = {
  mild: { label: "Mild", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-500", glow: "shadow-emerald-500/20" },
  moderate: { label: "Moderate", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", dot: "bg-amber-500", glow: "shadow-amber-500/20" },
  "moderate to severe": { label: "Moderate-Severe", color: "text-destructive", bg: "bg-destructive/10", dot: "bg-destructive", glow: "shadow-destructive/20" },
  severe: { label: "Severe", color: "text-destructive", bg: "bg-destructive/10", dot: "bg-destructive", glow: "shadow-destructive/20" },
};

function getSev(severity: string) {
  return severityConfig[severity.toLowerCase()] || severityConfig["mild"];
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const severities = [...new Set(medicalReports.map((r) => r.severity))];

  const filtered = medicalReports.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = r.diagnosis.toLowerCase().includes(q) || r.agent.toLowerCase().includes(q) || r.chiefComplaint.toLowerCase().includes(q);
    const matchesSeverity = severityFilter === "all" || r.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const activeReport = selectedReport !== null ? medicalReports[selectedReport] : null;

  const totalMeds = medicalReports.reduce((a, r) => a + r.medicationsMentioned.length, 0);
  const uniqueDoctors = new Set(medicalReports.map((r) => r.agent)).size;

  return (
    <div className="space-y-6 pb-8">
      {/* ---- Bento Header ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Main hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 relative overflow-hidden rounded-3xl p-6 sm:p-8 min-h-50 flex flex-col justify-between"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 50%, hsl(var(--accent)) 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-[0.07] bg-green-950" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="absolute -right-16 -bottom-16 w-64  h-64 rounded-full bg-green-100 blur-3xl" />
         <div className="relative z-10 space-y-5">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] font-semibold text-blue-200 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
  >
    <Sparkles className="h-3.5 w-3.5" />
    DIGITAL HEALTH RECORD
  </motion.div>

  <motion.h1 
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-5xl sm:text-6xl font-bold text-white tracking-[-2px] leading-none"
  >
    Medical Reports
  </motion.h1>

  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.45 }}
    className="text-xl text-blue-100/80 max-w-md"
  >
    Detailed insights from <span className="font-semibold text-white">{uniqueDoctors}</span> specialists
  </motion.p>
</div>
          <div className="relative z-10 flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-[11px] bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-yellow-900 font-medium flex items-center gap-1.5">
              <User className="h-3 w-3" />
              {medicalReports[0]?.user}
            </span>
            <span className="text-[11px] bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-yellow-900 font-medium flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {new Date(medicalReports[0]?.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </motion.div>

        {/* Stat cards - bento */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {[
            { value: medicalReports.length, label: "Reports", icon: FileText, color: "text-primary", bg: "bg-primary/8" },
            { value: uniqueDoctors, label: "Doctors", icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-500/8" },
            { value: totalMeds, label: "Medications", icon: Pill, color: "text-emerald-500", bg: "bg-emerald-500/8" },
            { value: medicalReports.filter((r) => r.severity.toLowerCase() !== "mild").length, label: "Follow-ups", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/8" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, type: "spring" as const, stiffness: 260, damping: 20 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border bg-card p-4 flex flex-col justify-between min-h-25 group cursor-default"
              >
                <div className={cn("rounded-xl w-9 h-9 flex items-center justify-center", s.bg)}>
                  <Icon className={cn("h-4.5 w-4.5", s.color)} />
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-extrabold text-foreground tracking-tighter">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---- Search & Filter Bar ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-3 items-stretch"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by diagnosis, doctor, or complaint..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all"
          />
        </div>
        <div className="flex gap-1.5 bg-muted/50 rounded-2xl p-1.5 border">
          {["all", ...severities].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-medium transition-all relative",
                severityFilter === sev
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {severityFilter === sev && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-xl shadow-md shadow-primary/25"
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                />
              )}
              <span className="relative z-10">{sev === "all" ? "All" : sev}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ---- Reports List ---- */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((report, i) => {
            const sev = getSev(report.severity);
            const isHovered = hoveredCard === i;

            return (
              <motion.div
                key={report.timestamp + report.diagnosis}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ delay: i * 0.03, type: "spring" as const, stiffness: 300, damping: 25 }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setSelectedReport(i)}
                className="group relative rounded-2xl border bg-card cursor-pointer overflow-hidden transition-colors hover:border-primary/25"
              >
                {/* Left accent */}
                <motion.div
                  animate={{ scaleY: isHovered ? 1 : 0.5 }}
                  transition={{ duration: 0.2 }}
                  className={cn("absolute left-0 top-0 w-0.75 h-full origin-center rounded-l-2xl", sev.dot)}
                />

                <div className="flex items-center gap-4 p-4 sm:p-5 pl-5 sm:pl-6">
                  {/* Icon */}
                  <div className="relative shrink-0">
                    <div className="rounded-2xl h-12 w-12 bg-primary/8 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div className={cn("absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card", sev.dot)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-semibold text-foreground text-[15px] truncate group-hover:text-primary transition-colors">
                        {report.diagnosis}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{report.chiefComplaint}</p>
                    <div className="flex items-center gap-3 mt-2.5">
                      <span className={cn("text-[10px] font-bold px-2 py-0.75 rounded-md uppercase tracking-widest", sev.bg, sev.color)}>
                        {sev.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />{report.agent}
                      </span>
                      <span className="text-[11px] text-muted-foreground items-center gap-1 hidden sm:flex">
                        <Clock className="h-3 w-3" />
                        {new Date(report.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Meds count + arrow */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-col items-end gap-0.5">
                      <span className="text-xs font-semibold text-foreground">{report.medicationsMentioned.length}</span>
                      <span className="text-[10px] text-muted-foreground">meds</span>
                    </div>
                    <motion.div
                      animate={{ x: isHovered ? 0 : -4, opacity: isHovered ? 1 : 0.3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              <FileText className="h-14 w-14 text-muted-foreground/25 mx-auto" />
            </motion.div>
            <p className="text-foreground font-semibold mt-4">No reports found</p>
            <p className="text-muted-foreground text-sm mt-1">Try a different search term or filter</p>
          </motion.div>
        )}
      </div>

      {/* ---- Detail Drawer ---- */}
      <AnimatePresence>
        {activeReport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring" as const, stiffness: 320, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full sm:w-135 bg-background z-50 shadow-2xl shadow-foreground/5 overflow-y-auto border-l"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b px-6 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-lg font-bold text-foreground tracking-tight">{activeReport.diagnosis}</h2>
                      <span className={cn("text-[10px] font-bold px-2 py-0.75 rounded-md uppercase tracking-widest", getSev(activeReport.severity).bg, getSev(activeReport.severity).color)}>
                        {activeReport.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{activeReport.agent}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(activeReport.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedReport(null)}
                    className="rounded-xl p-2.5 bg-muted hover:bg-muted/80 transition-colors shrink-0"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-5">
                {/* Complaint */}
                <DrawerSection delay={0.05} className="rounded-2xl bg-linear-to-br from-primary/8 to-primary/3 border border-primary/10 p-5">
                  <SectionHeader icon={Sparkles} title="Chief Complaint" color="text-primary" />
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{activeReport.chiefComplaint}</p>
                </DrawerSection>

                {/* Summary */}
                <DrawerSection delay={0.1} className="rounded-2xl bg-muted/30 border p-5">
                  <SectionHeader icon={FileText} title="Summary" color="text-muted-foreground" />
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{activeReport.summary}</p>
                </DrawerSection>

                {/* Tags sections */}
                <DrawerSection delay={0.15}>
                  <TagSection
                    icon={Activity}
                    title="Symptoms"
                    color="text-rose-500"
                    tagBg="bg-rose-500/8 text-rose-600 dark:text-rose-400 border-rose-500/15"
                    items={activeReport.symptoms}
                  />
                </DrawerSection>

                <DrawerSection delay={0.2}>
                  <TagSection
                    icon={AlertTriangle}
                    title="Risk Factors"
                    color="text-amber-500"
                    tagBg="bg-amber-500/8 text-amber-600 dark:text-amber-400 border-amber-500/15"
                    items={activeReport.riskFactors}
                  />
                </DrawerSection>

                {/* Medications */}
                <DrawerSection delay={0.25} className="rounded-2xl border border-purple-500/10 bg-purple-500/4 p-5">
                  <SectionHeader icon={Pill} title="Medications" color="text-purple-500" />
                  <div className="mt-3 space-y-2.5">
                    {activeReport.medicationsMentioned.map((m, mi) => (
                      <motion.div
                        key={mi}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + mi * 0.04 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border"
                      >
                        <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                        <span className="text-sm text-foreground font-medium">{m}</span>
                      </motion.div>
                    ))}
                  </div>
                </DrawerSection>

                {/* Recommendations */}
                <DrawerSection delay={0.3} className="rounded-2xl border border-blue-500/10 `bg-blue-500/4 p-5">
                  <SectionHeader icon={Lightbulb} title="Recommendations" color="text-blue-500" />
                  <div className="mt-3 space-y-2">
                    {activeReport.recommendations.map((r, ri) => (
                      <motion.div
                        key={ri}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + ri * 0.04 }}
                        className="flex items-start gap-3"
                      >
                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-blue-500">{ri + 1}</span>
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">{r}</span>
                      </motion.div>
                    ))}
                  </div>
                </DrawerSection>

                {/* Treatment & Prognosis */}
                <div className="grid gap-4">
                  <DrawerSection delay={0.35} className="rounded-2xl border border-primary/10 bg-primary/4 p-5">
                    <SectionHeader icon={Heart} title="Treatment Plan" color="text-primary" />
                    <p className="text-sm text-foreground mt-2 leading-relaxed">{activeReport.treatmentPlan}</p>
                  </DrawerSection>
                  <DrawerSection delay={0.4} className="rounded-2xl border border-emerald-500/10 bg-emerald-500/4 p-5">
                    <SectionHeader icon={Shield} title="Prognosis" color="text-emerald-500" />
                    <p className="text-sm text-foreground mt-2 leading-relaxed">{activeReport.prognosis}</p>
                  </DrawerSection>
                </div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex gap-3 pt-3 pb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border text-foreground text-sm font-semibold hover:bg-muted/50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Print
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Sub-components ---- */

function DrawerSection({ delay = 0, className, children }: { delay?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ icon: Icon, title, color }: { icon: React.ComponentType<any>; title: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={cn("h-4 w-4", color)} />
      <h4 className={cn("text-xs font-bold uppercase tracking-widest", color)}>{title}</h4>
    </div>
  );
}

function TagSection({ icon, title, color, tagBg, items }: { icon: React.ComponentType<any>; title: string; color: string; tagBg: string; items: string[] }) {
  return (
    <div className="rounded-2xl border p-5 space-y-3">
      <SectionHeader icon={icon} title={title} color={color} />
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.03 }}
            className={cn("text-xs font-medium px-3 py-1.5 rounded-lg border", tagBg)}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}