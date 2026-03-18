import { motion } from "framer-motion";
import { Activity, Calendar, Clock, Users } from "lucide-react";

const stats = [
  { label: "Total Consultations", value: "47", icon: Activity, change: "+3 this week" },
  { label: "Upcoming", value: "2", icon: Calendar, change: "Next: Tomorrow" },
  { label: "Avg. Wait Time", value: "4m", icon: Clock, change: "−2m vs last month" },
  { label: "Doctors Consulted", value: "12", icon: Users, change: "3 specialists" },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="bg-card p-5 rounded-2xl card-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-card-foreground tabular-nums">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          <p className="text-[11px] text-primary font-medium mt-1">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  );
}