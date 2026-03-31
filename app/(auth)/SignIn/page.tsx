"use client";

import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
// import { AuthLayout } from "@/components/auth/AuthLayout";
// import { AuthInput } from "@/components/auth/AuthInput";
// import { GoogleButton } from "@/components/auth/GoogleButton";
import { toast } from "react-hot-toast"
import { AuthLayout } from "../auth/AuthLayout";
import { GoogleButton } from "../auth/GoogleButton";
import { AuthInput } from "../auth/AuthInput";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slice/userSlice";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const Router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const dispatch = useDispatch()

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    if (!password) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
     const result = await api.post("/signIn", { email, password });
    console.log(result);
    Router.push("/dashboard");
    console.log("dispatching")
    dispatch(setUser(result.data.user))
    setLoading(false);
    toast.success("Welcome back!");
   
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <AuthLayout title="Welcome back." subtitle="Sign in to continue where you left off.">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sign in</h2>
      <p className="mt-1 text-sm text-muted-foreground mb-8">
        Don't have an account?{" "}
        <Link href="/SignUp" className="text-primary hover:underline font-medium">
          Create one
        </Link>
      </p>

      <GoogleButton onClick={handleGoogle} />

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSignIn} className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex justify-end">
          <Link
            href="/ForgetPassword"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-foreground text-background rounded-xl font-medium text-sm auth-shadow hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.span>
            ) : (
              <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Sign in
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;