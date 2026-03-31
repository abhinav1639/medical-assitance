"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
// import { AuthLayout } from "@/components/auth/AuthLayout";
// import { AuthInput } from "@/components/auth/AuthInput";
import { toast } from "sonner";
import { AuthLayout } from "../auth/AuthLayout";
import { AuthInput } from "../auth/AuthInput";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success("Recovery link sent!");
  };

  return (
    <AuthLayout title="Reset your access." subtitle="We'll send a recovery link to your email.">
      <Link
        href="/SignIn"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to sign in
      </Link>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Forgot password</h2>
            <p className="mt-1 text-sm text-muted-foreground mb-8">
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm auth-shadow hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </motion.span>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Send recovery link
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <MailCheck className="w-16 h-16 text-primary mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We sent a recovery link to <span className="font-medium text-foreground">{email}</span>
            </p>
            <button
              onClick={() => { setSent(false); setEmail(""); }}
              className="text-sm text-primary hover:underline font-medium mt-4"
            >
              Try another email
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default ForgotPassword;