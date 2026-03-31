'use client'
import { useTheme } from '@/app/hooks/use-theme'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChevronDown, LogOut, Moon, Search, Settings, Sun, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
// import { notifications as allNotifications } from '@/app/data/data'
import api from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

export function TopNavbar() {
  const { theme, toggle } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const { profileData } = useSelector((state: any) => state.user)
  // const unreadCount = allNotifications.filter((n) => !n.read).length
  const router = useRouter()
  const { allNotifications } = useSelector((state: any) => state.user)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setShowNotifications(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setShowProfile(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const unreadCount = allNotifications?.filter((n: any) => !n.read).length || 0

  const handleLogout = async () => {
    try {
      const result = await api.post('/log-out', {})
      toast.success(result.data.message)
      router.push('/SignIn')
      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const markNotificationRead = async () => {
    setShowNotifications(!showNotifications)
              setShowProfile(false)
    try {
      await api.put('fetch-all-notifications', {})
      // setNotifications(result.data.notifications)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search doctors, consultations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="h-7 w-20 flex items-center justify-center rounded-sm text-sm font-bold border-gray-600 border hover:border-gray-400">
          <p>3 credits</p>
        </div>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={markNotificationRead}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-lg overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-card-foreground">Notifications</h3>
                  <Link
                    href="/dashboard/notifications"
                    className="text-xs text-primary hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all
                  </Link>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {allNotifications?.slice(0, 4).map((n: any) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 ${!n.read ? 'bg-primary/5' : ''}`}
                    >
                      <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">
              {profileData?.name}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-lg overflow-hidden"
              >
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-secondary text-sm text-card-foreground"
                  onClick={() => setShowProfile(false)}
                >
                  <User className="h-4 w-4" /> Edit profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-secondary text-sm text-card-foreground"
                  onClick={() => setShowProfile(false)}
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-secondary text-sm text-destructive w-full"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
