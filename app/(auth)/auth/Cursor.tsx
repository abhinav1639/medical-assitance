import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const Cursor = () => {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 250 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none z-50 mix-blend-difference flex items-center justify-center"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
    </motion.div>
  );
};