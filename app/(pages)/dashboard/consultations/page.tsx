"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { doctors, Doctor } from "@/app/data/data";
import { DoctorCard } from "@/app/(pages)/dashboard/components/DoctorCard";
import ChatModal  from "@/app/(pages)/dashboard/components/ChatModel";
import { Wifi, ArrowRight } from "lucide-react";

export default function ConsultationsPage() {
const [chatDoctor, setChatDoctor] = useState<Doctor | null>(null);
const onlineDoctors = doctors.filter((d) => d.online);

return (
    <div className="space-y-6 max-w-7xl">
      <div >
        <h1 className="text-2xl font-bold text-foreground">Consultations</h1>
        <p className="text-sm text-muted-foreground mt-1">Start a consultation with available doctors</p>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl gradient-primary p-8 md:p-10 shadow-lg bg-gray-400"
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">Need medical advice?</h2>
        <p className="text-sm text-primary-foreground/80 mt-1.5 max-w-md">Connect with a specialist instantly via chat or video call. Our doctors are ready to help you.</p>
        <div className="flex items-center gap-3 mt-5">
          <Wifi className="h-4 w-4 text-primary-foreground animate-pulse" />
          <span className="text-sm font-semibold text-primary-foreground">{onlineDoctors.length} doctors online now</span>
        </div>
      </motion.div>

      {/* Online doctors */}
      <div>
        <h2 className="font-semibold text-foreground text-lg mb-4">Available Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {onlineDoctors.map((doc, i) => (
            <DoctorCard key={doc.id} doctor={doc} index={i} onConsult={setChatDoctor} />
          ))}
        </div>
      </div>

      {chatDoctor && <ChatModal doctor={chatDoctor} onClose={() => setChatDoctor(null)} />}
    </div>
  );
}
