"use client"
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthLayout } from "../auth/AuthLayout";
import { AuthInput } from "../auth/AuthInput";

const ResetPassword = () => {
  // const navigate = useNavigate();
  const Router = useRouter()
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("At least 6 characters");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    toast.success("Password updated!");
    setTimeout(() => Router.push("/SignIn"), 2000);
  };

  return (
    <AuthLayout title="Set new password." subtitle="Choose a strong password for your account.">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="form" exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">New password</h2>
            <p className="mt-1 text-sm text-muted-foreground mb-8">Enter your new password below.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="New password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm auth-shadow hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update password"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-foreground">Password updated!</h2>
            <p className="text-sm text-muted-foreground">Redirecting to sign in...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default ResetPassword;
