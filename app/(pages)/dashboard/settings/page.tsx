"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Bell as BellIcon, Palette, Save } from "lucide-react";
import { useTheme } from "@/app/hooks/use-theme"
import { useSelector } from "react-redux";
import api from "@/lib/api";
import { setProfileData } from "@/app/redux/slice/userSlice";

export default function SettingsPage() {
  const {profileData}=useSelector((state:any)=>state.user)
  const { theme, toggle } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");
  const dispatch = useSelector((state: any) => state.user);

  useEffect(() => {
    if(profileData) 
    setName(profileData?.name);
    setEmail(profileData?.email);
  }, [profileData]);

  const handleSave= async()=>{
    try {
       const result = await api.put('/edit-profile',{name,email,phoneNumber})
       console.log(result)
       dispatch(setProfileData(result.data.updatedUser))
       

    } catch (error) {
      
    }
   
  }
  
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-sm text-card-foreground">Profile Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Full Name</label>
            <input value={name || ""} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Email</label>
            <input value={email || ""} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Phone</label>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-sm text-card-foreground">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-card-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Toggle dark theme</p>
          </div>
          <button
            onClick={toggle}
            className={`relative w-11 h-6 rounded-full transition-colors ${theme === "dark" ? "bg-primary" : "bg-border"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-card transition-transform ${theme === "dark" ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <BellIcon className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-sm text-card-foreground">Notification Preferences</h2>
        </div>
        <div className="space-y-3">
          {["Appointment reminders", "Doctor messages", "System updates"].map((label) => (
            <div key={label} className="flex items-center justify-between">
              <p className="text-sm text-card-foreground">{label}</p>
              <button className="relative w-11 h-6 rounded-full bg-primary transition-colors">
                <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-card translate-x-5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <button onClick={handleSave} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        <Save className="h-4 w-4" /> Save Changes
      </button>
    </div>
  );
}