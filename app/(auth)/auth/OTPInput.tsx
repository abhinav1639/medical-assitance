"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { motion } from "framer-motion";



interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}

export const OTPInput = ({ length = 6, onComplete, disabled }: OTPInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const code = newValues.join("");
    if (code.length === length) {
       onComplete(code);
     

    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newValues = [...values];
    pasted.split("").forEach((char, i) => {
      newValues[i] = char;
    });
    setValues(newValues);
    if (pasted.length === length) {
      onComplete(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      {values.map((val, i) => (
        <motion.input
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-medium bg-muted border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
        />
      ))}
    </div>
  );
};