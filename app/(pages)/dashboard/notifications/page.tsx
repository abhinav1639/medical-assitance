"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, MessageSquare, Calendar, Info, Check } from "lucide-react";
import { notifications as initialNotifications } from "@/app/data/data"
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import api from "@/lib/api";
import toast from "react-hot-toast";

const iconMap = {
  appointment: Calendar,
  message: MessageSquare,
  system: Info,
};

const colorMap = {
  appointment: "bg-primary/10 text-primary",
  message: "bg-accent/10 text-accent",
  system: "bg-muted text-muted-foreground",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const {allNotifications}=useSelector((state:any)=>state.user)
  const unreadNotifications = notifications.filter((n) => !n.read);

  // const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

   const markAllRead =async ()=>{
 const readNotifications=   allNotifications?.map((n:any)=>({...n,read:true}))
 try {
  const result = await api.put('fetch-all-notifications',{})
  setNotifications(result.data.notifications)
 } catch (error:any) {
  toast.error(error.response.data.message)
 }


   }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <Check className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const Icon = iconMap[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setNotifications(notifications.map((nn) => nn.id === n.id ? { ...nn, read: true } : nn))}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border border-border cursor-pointer transition-colors",
                n.read ? "bg-card" : "bg-primary/5 border-primary/20"
              )}
            >
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", colorMap[n.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{n.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}