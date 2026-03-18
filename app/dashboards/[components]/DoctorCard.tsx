import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import type { Doctor } from "@/data/doctors";

interface Props {
  doctor: Doctor;
  index: number;
}

export default function DoctorCard({ doctor, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.2, 0, 0, 1] }}
      whileHover={{ y: -2 }}
      className="bg-card p-5 rounded-2xl card-shadow hover:card-shadow-hover transition-shadow cursor-pointer group"
    >
      <div className="flex gap-4 items-start mb-3">
        <div className="relative flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-12 h-12 rounded-xl object-cover bg-secondary"
          />
          {doctor.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary border-2 border-card rounded-full" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-card-foreground leading-tight truncate">{doctor.name}</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">
            {doctor.specialty}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {doctor.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-medium text-card-foreground">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {doctor.rating}
          </span>
          <span className="text-muted-foreground text-xs">{doctor.experience}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="tabular-nums">{doctor.nextSlot}</span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full mt-3 py-2 rounded-lg text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/15 transition-colors opacity-0 group-hover:opacity-100"
      >
        Book Consultation
      </motion.button>
    </motion.div>
  );
}