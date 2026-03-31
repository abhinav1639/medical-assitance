

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Send, Check } from "lucide-react";
import { Doctor } from "@/app/data/data";
import api from "@/lib/api";
import toast from "react-hot-toast";
interface ChatModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}
const steps = [
  {
    id: 1,
    question: "What type of appointment would you like to book?",
    options: [
      "New Consultation",
      "Follow-up Visit",
      "Second Opinion",
      "Routine Check-up",
    ],
  },
  {
    id: 2,
    question: "Preferred Date?",
    options: [
      "Today",
      "Tomorrow",
      "This Weekend",
      "Next Week (Any day)",
      "Flexible",
    ],
  },
  {
    id: 3,
    question: "Preferred Time Slot?",
    options: [
      "Morning (9 AM - 12 PM)",
      "Afternoon (2 PM - 5 PM)",
      "Evening (6 PM - 8 PM)",
    ],
  },
  {
    id: 4,
    question: "Any specific concern?",
    options: [
      "Headache / Migraine",
      "General Health Check",
      "Chronic Issue Follow-up",
      "Prescription Renewal",
      "Other",
    ],
  },
];

export default function ChatModal({ doctor, onClose }: ChatModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!doctor) return null;

  const handleOptionSelect = async (option: string) => {
    const newSelections = [...selections, option];
    setSelections(newSelections);
    

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step completed
      setShowConfirmation(true);
      try {
         const result = await api.post('/book-appointment',{doctor,selections,showConfirmation});
      console.log(result.data)
      
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
     
    }
  };

  const resetChat = () => {
    setCurrentStep(0);
    setSelections([]);
    setShowConfirmation(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl flex flex-col"
          style={{ maxHeight: "85vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-700">
            <div className="flex items-center gap-3">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="h-11 w-11 rounded-full object-cover border border-zinc-600"
              />
              <div>
                <h3 className="font-semibold text-white">{doctor.name}</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Available for booking
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {!showConfirmation ? (
              <>
                <div className="bg-zinc-800 rounded-2xl p-4 text-sm text-zinc-300">
                  {steps[currentStep].question}
                </div>

                <div className="space-y-2">
                  {steps[currentStep].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left px-5 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-2xl text-white transition-all flex items-center justify-between group"
                    >
                      <span>{option}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Progress */}
                <div className="flex justify-center gap-1.5 mt-6">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i <= currentStep ? "bg-blue-500 w-8" : "bg-zinc-700 w-4"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              /* Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-10 w-10 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2">Appointment Request Sent!</h3>
                <p className="text-zinc-400 mb-8">
                  Your request has been sent to {doctor.name}.<br />
                  You will receive confirmation shortly.
                </p>

                <div className="bg-zinc-800 rounded-2xl p-5 text-left space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Doctor</span>
                    <span className="text-white">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Type</span>
                    <span className="text-white">{selections[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Date</span>
                    <span className="text-white">{selections[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Time</span>
                    <span className="text-white">{selections[2]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Concern</span>
                    <span className="text-white">{selections[3]}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-700">
            {showConfirmation ? (
              <button
                onClick={() => {
                  onClose();
                  resetChat();
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 transition-colors rounded-2xl font-medium text-white"
              >
                Done
              </button>
            ) : (
              <div className="text-center text-xs text-zinc-500">
                Step {currentStep + 1} of {steps.length}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}