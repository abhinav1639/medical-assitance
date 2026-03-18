import { FileText, Video, MessageSquare, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ConsultationHistory } from "@/data/doctors";

const typeIcons: Record<string, React.ElementType> = {
  "Video Call": Video,
  Chat: MessageSquare,
  "In-Person": MapPin,
};

const statusColors: Record<string, string> = {
  completed: "bg-primary/10 text-primary",
  cancelled: "bg-destructive/10 text-destructive",
  upcoming: "bg-amber-500/10 text-amber-600",
};

interface Props {
  history: ConsultationHistory[];
}

export default function HistoryPanel({ history }: Props) {
  return (
    <div className="bg-card rounded-2xl card-shadow overflow-hidden">
      <div className="p-5 pb-3 flex items-center justify-between">
        <h2 className="font-semibold text-card-foreground">Recent Consultations</h2>
        <button className="text-xs font-medium text-primary hover:underline">View All</button>
      </div>

      <div className="px-5 pb-5 space-y-1 max-h-[420px] overflow-y-auto scrollbar-hide mask-bottom">
        {history.map((item, i) => {
          const Icon = typeIcons[item.type] || Video;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{item.doctorName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground tabular-nums">{item.date}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {item.notes && (
                  <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}