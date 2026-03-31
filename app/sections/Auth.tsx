"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Auth = () => {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-background p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-center space-y-4"
      >
        <div className="h-10 w-10 bg-primary rounded-full mx-auto" />
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Studio</h1>
        <p className="text-muted-foreground max-w-md">
          A cinematic authentication experience with split-view design and fluid animations.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex gap-4"
      >
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-foreground text-background rounded-xl font-medium text-sm auth-shadow hover:opacity-90 transition-all"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="px-6 py-3 border border-input rounded-xl font-medium text-sm hover:bg-muted transition-all text-foreground"
        >
          Sign up
        </Link>
      </motion.div>
    </div>
  );
};

export default Auth