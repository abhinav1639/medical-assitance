

"use client"
import { motion } from "framer-motion";
import { AppSidebar } from "@/app/(pages)/dashboard/components/AppSidebar";
import { TopNavbar } from "@/app/(pages)/dashboard/components/TopNavbar";
import CurrentUser from "@/app/hooks/useCurrentUser";
import { ThemeProvider } from "@/app/hooks/use-theme";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen">
      <CurrentUser />
      <AppSidebar />
      <ThemeProvider>
      <div className="flex-1 ml-16 md:ml-64 transition-all duration-300">
        <TopNavbar />
        <motion.main
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {children}
        </motion.main>
      </div>
      </ThemeProvider>
    </div>
  );
}
