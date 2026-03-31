"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sparkles, Crown, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    credits: 10,
    price: 10,
    pricePerCredit: 1.0,
    savings: null,
    icon: Zap,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/10",
    accent: "text-blue-400",
    btnClass: "bg-blue-600 hover:bg-blue-500",
    features: ["10 AI Consultations", "Basic Health Reports", "Chat Support", "7-day History"],
  },
  {
    name: "Professional",
    credits: 30,
    price: 30,
    pricePerCredit: 1.0,
    savings: null,
    icon: Sparkles,
    popular: true,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/50",
    glow: "shadow-emerald-500/20",
    accent: "text-emerald-400",
    btnClass: "bg-emerald-600 hover:bg-emerald-500",
    features: ["30 AI Consultations", "Detailed Health Reports", "Priority Support", "30-day History", "Voice Assistant"],
  },
  {
    name: "Premium",
    credits: 100,
    price: 50,
    pricePerCredit: 0.5,
    savings: 50,
    icon: Crown,
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/10",
    accent: "text-amber-400",
    btnClass: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
    features: ["100 AI Consultations", "Advanced Analytics", "24/7 Priority Support", "Unlimited History", "Voice Assistant", "Family Sharing"],
  },
];

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Save up to 50% on credits
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Buy <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Credits</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Power your AI medical consultations. More credits, bigger savings.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group rounded-2xl border ${plan.border} bg-card/50 backdrop-blur-sm p-6 lg:p-8 transition-all duration-500 ${plan.glow} ${
                  hoveredIndex === i ? "shadow-2xl scale-[1.03]" : "shadow-lg"
                } ${plan.popular ? "md:-mt-4 md:mb-0" : ""}`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/30"
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Savings badge */}
                {plan.savings && (
                  <motion.div
                    initial={{ rotate: -12, scale: 0 }}
                    animate={{ rotate: -12, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
                    className="absolute -top-2 -right-2 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg"
                  >
                    SAVE {plan.savings}%
                  </motion.div>
                )}

                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-6 h-6 ${plan.accent}`} />
                  </motion.div>

                  <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-5">
                    {plan.credits} credits • ${plan.pricePerCredit.toFixed(2)}/credit
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">one-time</span>
                  </div>

                  {/* Credits visual bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Credits</span>
                      <span className={`font-semibold ${plan.accent}`}>{plan.credits}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${plan.credits}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        className={`h-full rounded-full ${plan.btnClass}`}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + fi * 0.05 + i * 0.1 }}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className={`w-4 h-4 ${plan.accent} flex-shrink-0`} />
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 ${plan.btnClass} shadow-lg`}
                  >
                    Buy {plan.credits} Credits
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Credits never expire • Secure payment • Instant activation
          </p>
        </motion.div>
      </div>
    </div>
  );
}