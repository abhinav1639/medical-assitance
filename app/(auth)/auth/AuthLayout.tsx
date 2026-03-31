"use client";
import { motion } from "framer-motion";
// import authTexture from "@/assets/auth-texture.jpg";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-svh grid lg:grid-cols-2 bg-background selection:bg-primary/10">
      {/* Left Panel - Cinematic */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-foreground">
        <Image
          src ="/auth-texture.jpg"
          width={100}
          height={100}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="texture"
        />
        <div className="relative z-10">
          <div className="h-8 w-8 bg-primary rounded-full mb-12" />
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl font-medium tracking-tighter leading-tight max-w-md text-primary-foreground"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 text-muted-foreground text-lg max-w-sm"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        <p className="relative z-10 text-sm text-muted-foreground font-mono tracking-widest uppercase">
          © 2026 Studio / Distributed Design
        </p>
      </div>

      {/* Right Panel - Functional */}
      <main className="flex flex-col justify-center p-8 lg:p-24 relative">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-100 mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};