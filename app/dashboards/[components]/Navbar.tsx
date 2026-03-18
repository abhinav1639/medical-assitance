import { Video, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = ["Dashboard", "Appointments", "Records", "Messages"];

export default function Navbar() {
  return (
    <nav className="h-16 bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 nav-shadow">
      <div className="flex items-center gap-8">
        <span className="font-bold text-lg tracking-tight text-primary">VITALIS</span>
        <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href="#"
              className={i === 0 ? "text-foreground" : "hover:text-foreground transition-colors"}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
          <Search className="w-4 h-4" />
          <span>Search doctors...</span>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm"
        >
          <Video className="w-4 h-4" />
          <span className="hidden sm:inline">Consult Now</span>
        </motion.button>
      </div>
    </nav>
  );
}
