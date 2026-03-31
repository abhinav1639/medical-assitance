import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";
import { Doctor } from "@/app/data/data";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
  onConsult?: (doctor: Doctor) => void;
}

export function BookingCard({ doctor, index, onConsult }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, boxShadow: "0 16px 48px -12px hsl(217 91% 60% / 0.12)" }}
      className="rounded-2xl bg-card border border-border/60 p-5 flex flex-col items-center text-center transition-colors shadow-sm"
    >
      <div className="relative mb-4">
        <img src={doctor.avatar} alt={doctor.name} className="h-18 w-18 rounded-full bg-secondary ring-4 ring-secondary" style={{ height: 72, width: 72 }} />
        <span
          className={`absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-[3px] border-card ${doctor.online ? "bg-success" : "bg-muted-foreground/40"}`}
        />
      </div>
      <h3 className="font-semibold text-sm text-card-foreground">{doctor.name}</h3>
      <p className="text-xs text-primary font-medium mt-0.5">{doctor.specialization}</p>
      <div className="flex items-center gap-1.5 mt-2.5">
        <Star className="h-3.5 w-3.5 fill-warning text-warning" />
        <span className="text-xs font-semibold text-card-foreground">{doctor.rating}</span>
        <span className="text-muted-foreground/50">•</span>
        <span className="text-xs text-muted-foreground">{doctor.experience}y exp</span>
      </div>
      <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span className="text-[11px]">Next: <span className="font-medium text-card-foreground">{doctor.nextSlot}</span></span>
      </div>
      <button
        onClick={() => onConsult?.(doctor)}
        className="mt-4  w-full py-2.5 rounded-xl gradient- bg-gray-500 cursor-pointer text-secondary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
      >
        Booking Now
      </button>
    </motion.div>
  );
}