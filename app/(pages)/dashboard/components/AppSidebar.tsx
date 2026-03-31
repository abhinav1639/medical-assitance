'use client'
import { useState } from 'react'
import Link from 'next/link'
// import { Link, useLocation } from "react-router-dom";
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Stethoscope,
  MessageSquare,
  History,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  FileText,
  BookUser,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Stethoscope, label: 'Doctors', path: '/dashboard/doctors' },
  { icon: MessageSquare, label: 'Consultations', path: '/dashboard/consultations' },
  { icon: BookUser, label: 'Book Appointment', path: '/dashboard/book-appointment' },
  { icon: History, label: 'History', path: '/dashboard/history' },
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
]

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  //   const location = useLocation();
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary cursor-pointer"
        >
          <Heart className="h-5 w-5 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold text-sidebar-accent-foreground whitespace-nowrap overflow-hidden"
            >
              MedCare
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          // const active = location.pathname === item.path;
          const active = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  'h-5 w-5 shrink-0',
                  active ? 'text-primary' : 'text-sidebar-foreground'
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border">
        {collapsed ? (
          <div onClick={()=>router.push('/dashboard/pricing')}
           className="bg-linear-to-r from-green-100 to-black flex flex-col justify-center items-center w-full rounded-xl cursor-pointer">
            <p className=" text-white">buy</p> <p className="text-white">credit</p>
          </div>
        ) : (
          <div className="flex h-8  cursor-pointer items-center justify-center w-full bg-linear-to-r  from-gray-400 to-black rounded-2xl ">
            
            <div onClick={()=>router.push('/dashboard/pricing')} className="flex text-amber-50 rounded-2xl h-8 items-center justify-center"> buy credit</div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex cursor-pointer items-center justify-center w-full py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
    </motion.aside>
  )
}
