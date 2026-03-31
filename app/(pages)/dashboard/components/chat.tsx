// "use client";
// import { useState, useRef, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Mic, MicOff, Send, Volume2, VolumeX,
//   Stethoscope, Pill, HeartPulse, Brain, ArrowLeft,
//   Phone, Video, MoreVertical, Paperclip,
//   CheckCheck, Shield, Clock, X, Image as ImageIcon,
//   FileText, Award, Star
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import { useNavigate } from "react-router-dom";
// import { useAIChat } from "@/hooks/useAIChat";


// const EMOJI_CATEGORIES = [
//   { label: "Smileys", emojis: ["😀","😂","🥹","😊","😍","🤗","🤔","😷","🤒","🤕","🥴","😴","🤢","🤮","🥵","🥶"] },
//   { label: "Medical", emojis: ["💊","🩺","🏥","🩹","🩻","🧬","🫀","🫁","🧠","🦷","🦴","💉","🩸","🧪","🔬","♿"] },
//   { label: "Gestures", emojis: ["👍","👎","👋","🤝","🙏","💪","👏","✌️","🤞","❤️","💙","💚","⭐","🔥","✅","❌"] },
// ];

// const quickPrompts = [
//   { icon: HeartPulse, label: "Symptoms", prompt: "I have a headache and mild fever since yesterday. What could it be?", emoji: "🩺" },
//   { icon: Pill, label: "Medication", prompt: "What are common side effects of ibuprofen?", emoji: "💊" },
//   { icon: Brain, label: "Mental Health", prompt: "I've been feeling anxious lately. What can help?", emoji: "🧠" },
//   { icon: Stethoscope, label: "Check-up", prompt: "What questions should I ask my cardiologist?", emoji: "❤️‍🩹" },
// ];

// type Attachment = {
//   file: File;
//   preview: string;
//   type: "image" | "file";
// };

// function formatTime(offset = 0) {
//   const d = new Date(Date.now() - offset);
//   return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// }

// export default function Chat() {
//   const [input, setInput] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [showScrollBtn, setShowScrollBtn] = useState(false);
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const emojiRef = useRef<HTMLDivElement>(null);
//   const { messages, isLoading, sendMessage } = useAIChat();
//   const navigate = useNavigate();

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // Close emoji picker on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
//         setShowEmoji(false);
//       }
//     };
//     if (showEmoji) document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [showEmoji]);

//   const handleScroll = () => {
//     const el = scrollContainerRef.current;
//     if (!el) return;
//     setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
//   };

//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   const toggleListening = () => {
//     if (isListening) {
//       recognitionRef.current?.stop();
//       setIsListening(false);
//       return;
//     }
//     const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!Ctor) { alert("Speech recognition not supported."); return; }
//     const r = new Ctor() as SpeechRecognition;
//     r.continuous = false; r.interimResults = true; r.lang = "en-US";
//     r.onresult = (e: SpeechRecognitionEvent) => {
//       let t = "";
//       for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
//       setInput(t);
//     };
//     r.onend = () => setIsListening(false);
//     r.onerror = () => setIsListening(false);
//     recognitionRef.current = r;
//     r.start();
//     setIsListening(true);
//   };

//   const speakText = (text: string) => {
//     if (isSpeaking) { speechSynthesis.cancel(); setIsSpeaking(false); return; }
//     const u = new SpeechSynthesisUtterance(text.replace(/[#*_`]/g, ""));
//     u.rate = 0.95;
//     u.onend = () => setIsSpeaking(false);
//     speechSynthesis.speak(u);
//     setIsSpeaking(true);
//   };

//   const handleSend = () => {
//     const text = input.trim();
//     const hasContent = text || attachments.length > 0;
//     if (!hasContent || isLoading) return;

//     let finalMsg = text;
//     if (attachments.length > 0) {
//       const names = attachments.map(a => `[${a.type === "image" ? "📷 Image" : "📎 File"}: ${a.file.name}]`).join(" ");
//       finalMsg = finalMsg ? `${names}\n${finalMsg}` : names;
//     }

//     sendMessage(finalMsg);
//     setInput("");
//     setAttachments([]);
//     setShowEmoji(false);
//     if (inputRef.current) inputRef.current.style.height = "auto";
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
//   };

//   const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(e.target.value);
//     const el = e.target;
//     el.style.height = "auto";
//     el.style.height = Math.min(el.scrollHeight, 120) + "px";
//   };

//   const addEmoji = (emoji: string) => {
//     setInput(prev => prev + emoji);
//     inputRef.current?.focus();
//   };

//   const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
//     const files = e.target.files;
//     if (!files) return;
//     const newAttachments: Attachment[] = [];
//     Array.from(files).forEach(file => {
//       const preview = type === "image" ? URL.createObjectURL(file) : "";
//       newAttachments.push({ file, preview, type });
//     });
//     setAttachments(prev => [...prev, ...newAttachments]);
//     e.target.value = "";
//   }, []);

//   const removeAttachment = (index: number) => {
//     setAttachments(prev => {
//       const item = prev[index];
//       if (item.preview) URL.revokeObjectURL(item.preview);
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   const hasMessages = messages.length > 0;

//   return (
//     <div className="h-screen flex flex-col bg-background overflow-hidden">
//       {/* ── HEADER ── */}
//       <motion.header
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="relative z-50 bg-card border-b border-border"
//       >
//         <div className="max-w-3xl mx-auto px-3 sm:px-4">
//           <div className="h-[72px] flex items-center justify-between">
//             <div className="flex items-center gap-2.5">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => navigate("/")}
//                 className="p-1.5 -ml-1 rounded-full hover:bg-secondary transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-primary" />
//               </motion.button>

//               <div className="flex items-center gap-3">
//                 {/* Doctor avatar with verification badge */}
//                 <div className="relative">
//                   <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-card">
//                     <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center">
//                       <Stethoscope className="w-6 h-6 text-white" />
//                     </div>
//                   </div>
//                   <motion.div
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-[2.5px] border-card flex items-center justify-center"
//                   />
//                   {/* Verified badge */}
//                   <div className="absolute -top-0.5 -right-1 w-5 h-5 rounded-full bg-sky-500 border-2 border-card flex items-center justify-center">
//                     <CheckCheck className="w-2.5 h-2.5 text-white" />
//                   </div>
//                 </div>

//                 <div className="leading-tight">
//                   <div className="flex items-center gap-1.5">
//                     <h1 className="text-[15px] font-semibold text-foreground tracking-tight">
//                       Dr. Sarah Mitchell
//                     </h1>
//                     <Award className="w-4 h-4 text-sky-500" />
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
//                     <span className="text-[12px] text-emerald-500 font-medium">Online</span>
//                     <span className="text-[11px] text-muted-foreground">• General Physician</span>
//                   </div>
//                   <div className="flex items-center gap-1 mt-0.5">
//                     {[1,2,3,4,5].map(s => (
//                       <Star key={s} className={`w-2.5 h-2.5 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
//                     ))}
//                     <span className="text-[10px] text-muted-foreground ml-0.5">4.9 (2.1k)</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-0.5">
//               {[Phone, Video, MoreVertical].map((Icon, i) => (
//                 <motion.button
//                   key={i}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
//                 >
//                   <Icon className="w-[18px] h-[18px]" />
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
//       </motion.header>

//       {/* ── CHAT BODY ── */}
//       <div
//         ref={scrollContainerRef}
//         onScroll={handleScroll}
//         className="flex-1 overflow-y-auto scrollbar-hide relative"
//         style={{
//           backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
//                             radial-gradient(circle at 80% 20%, hsl(160 84% 39% / 0.02) 0%, transparent 40%)`,
//         }}
//       >
//         <div className="max-w-3xl mx-auto px-3 sm:px-4">
//           {/* Encryption badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="flex justify-center py-4"
//           >
//             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 backdrop-blur-sm">
//               <Shield className="w-3 h-3 text-muted-foreground" />
//               <span className="text-[10px] text-muted-foreground font-medium">
//                 End-to-end encrypted • HIPAA compliant
//               </span>
//             </div>
//           </motion.div>

//           <AnimatePresence mode="wait">
//             {!hasMessages ? (
//               /* ── Empty State ── */
//               <motion.div
//                 key="empty"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex flex-col items-center justify-center py-8 min-h-[calc(100vh-16rem)]"
//               >
//                 <motion.div
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                   className="text-center mb-8"
//                 >
//                   <div className="relative inline-block mb-4">
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-primary/20">
//                       <Stethoscope className="w-9 h-9 text-white" />
//                     </div>
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                       className="absolute inset-[-8px] rounded-full border-2 border-dashed border-primary/15"
//                     />
//                   </div>
//                   <h2 className="text-xl font-bold text-foreground mb-1">Dr. Sarah Mitchell</h2>
//                   <p className="text-[13px] text-muted-foreground mb-1">General Physician • 12 years experience</p>
//                   <div className="flex items-center justify-center gap-1 text-[12px] text-muted-foreground">
//                     <Clock className="w-3 h-3" />
//                     <span>Usually responds instantly</span>
//                   </div>
//                 </motion.div>

//                 {/* Doctor intro message */}
//                 <motion.div
//                   initial={{ y: 15, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="w-full max-w-md mb-6"
//                 >
//                   <DoctorMessageBox>
//                     <p className="text-[14px]">
//                       Hello! 👋 I'm <strong>Dr. Sarah Mitchell</strong>. I'm here to help you with any health concerns. 
//                       Feel free to describe your symptoms, ask about medications, or discuss any wellness topic. 
//                       Your privacy is fully protected.
//                     </p>
//                   </DoctorMessageBox>
//                 </motion.div>

//                 <motion.div
//                   initial={{ y: 15, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="grid grid-cols-2 gap-2.5 w-full max-w-sm"
//                 >
//                   {quickPrompts.map((qp, i) => (
//                     <motion.button
//                       key={qp.label}
//                       initial={{ y: 15, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.35 + i * 0.08 }}
//                       whileHover={{ scale: 1.03, y: -2 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={() => sendMessage(qp.prompt)}
//                       className="group flex items-center gap-2.5 p-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all text-left"
//                     >
//                       <span className="text-xl flex-shrink-0">{qp.emoji}</span>
//                       <span className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">{qp.label}</span>
//                     </motion.button>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             ) : (
//               /* ── Messages ── */
//               <motion.div
//                 key="messages"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="py-2 space-y-0.5"
//               >
//                 {messages.map((msg, i) => {
//                   const isUser = msg.role === "user";
//                   const isLast = i === messages.length - 1;
//                   const prevMsg = messages[i - 1];
//                   const sameSender = prevMsg?.role === msg.role;
//                   const time = formatTime(isLast ? 0 : (messages.length - i) * 60000);

//                   if (isUser) {
//                     return (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, y: 16, scale: 0.97 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         transition={{ duration: 0.35, delay: isLast ? 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
//                         className={`flex justify-end ${sameSender ? "pt-0.5" : "pt-3"}`}
//                       >
//                         <div className="flex gap-2 max-w-[82%] sm:max-w-[72%] flex-row-reverse">
//                           {!sameSender ? (
//                             <motion.div
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ type: "spring", stiffness: 400 }}
//                               className="flex-shrink-0 mt-auto"
//                             >
//                               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
//                                 <span className="text-[11px] font-bold text-white">You</span>
//                               </div>
//                             </motion.div>
//                           ) : <div className="w-8 flex-shrink-0" />}

//                           <motion.div
//                             initial={{ scale: 0.92 }}
//                             animate={{ scale: 1 }}
//                             transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                             className="relative px-3.5 py-2.5 text-[14px] leading-[1.55] bg-primary text-primary-foreground rounded-2xl rounded-br-md shadow-sm"
//                           >
//                             <span className="whitespace-pre-wrap">{msg.content}</span>
//                             <div className="flex items-center gap-1 mt-1 justify-end">
//                               <span className="text-[10px] text-primary-foreground/60">{time}</span>
//                               <CheckCheck className={`w-3.5 h-3.5 ${isLast && isLoading ? "text-primary-foreground/40" : "text-sky-300"}`} />
//                             </div>
//                           </motion.div>
//                         </div>
//                       </motion.div>
//                     );
//                   }

//                   // Doctor message
//                   return (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, y: 16, scale: 0.97 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       transition={{ duration: 0.35, delay: isLast ? 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
//                       className={`${sameSender ? "pt-0.5" : "pt-3"}`}
//                     >
//                       <DoctorMessageBox showAvatar={!sameSender} time={time}>
//                         <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_h1]:text-[15px] [&_h2]:text-[14px] [&_h3]:text-[14px] [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[12px] [&_strong]:text-foreground [&_p]:text-card-foreground [&_li]:text-card-foreground">
//                           <ReactMarkdown>{msg.content}</ReactMarkdown>
//                         </div>
//                       </DoctorMessageBox>

//                       {msg.content && isLast && (
//                         <motion.button
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.4 }}
//                           onClick={() => speakText(msg.content)}
//                           className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors px-1 py-0.5 ml-12 mt-0.5"
//                         >
//                           {isSpeaking ? <><VolumeX className="w-3 h-3" /> Stop</> : <><Volume2 className="w-3 h-3" /> Listen</>}
//                         </motion.button>
//                       )}
//                     </motion.div>
//                   );
//                 })}

//                 {/* Typing indicator */}
//                 {isLoading && messages[messages.length - 1]?.role === "user" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="pt-3"
//                   >
//                     <DoctorMessageBox showAvatar typing />
//                   </motion.div>
//                 )}

//                 <div ref={messagesEndRef} className="h-2" />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <AnimatePresence>
//           {showScrollBtn && (
//             <motion.button
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//               onClick={scrollToBottom}
//               className="fixed bottom-32 right-6 z-50 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4 text-foreground -rotate-90" />
//             </motion.button>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* ── INPUT AREA ── */}
//       <motion.div
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
//         className="relative z-40 bg-card border-t border-border"
//       >
//         <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

//         <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3">
//           {/* Attachment previews */}
//           <AnimatePresence>
//             {attachments.length > 0 && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="overflow-hidden mb-2"
//               >
//                 <div className="flex gap-2 flex-wrap">
//                   {attachments.map((att, idx) => (
//                     <motion.div
//                       key={idx}
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       exit={{ scale: 0.8, opacity: 0 }}
//                       className="relative group"
//                     >
//                       {att.type === "image" ? (
//                         <div className="w-16 h-16 rounded-xl overflow-hidden border border-border">
//                           <img src={att.preview} alt="" className="w-full h-full object-cover" />
//                         </div>
//                       ) : (
//                         <div className="w-16 h-16 rounded-xl border border-border bg-secondary flex flex-col items-center justify-center gap-1">
//                           <FileText className="w-5 h-5 text-primary" />
//                           <span className="text-[8px] text-muted-foreground truncate max-w-[56px] px-1">{att.file.name}</span>
//                         </div>
//                       )}
//                       <button
//                         onClick={() => removeAttachment(idx)}
//                         className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Emoji picker */}
//           <AnimatePresence>
//             {showEmoji && (
//               <motion.div
//                 ref={emojiRef}
//                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                 className="absolute bottom-full left-3 right-3 sm:left-auto sm:right-auto sm:w-[340px] mb-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
//               >
//                 <div className="p-3 max-h-[220px] overflow-y-auto scrollbar-hide">
//                   {EMOJI_CATEGORIES.map(cat => (
//                     <div key={cat.label} className="mb-3 last:mb-0">
//                       <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{cat.label}</p>
//                       <div className="flex flex-wrap gap-0.5">
//                         {cat.emojis.map(em => (
//                           <button
//                             key={em}
//                             onClick={() => addEmoji(em)}
//                             className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-lg"
//                           >
//                             {em}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Hidden file inputs */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
//             className="hidden"
//             onChange={e => handleFileSelect(e, "file")}
//           />
//           <input
//             ref={imageInputRef}
//             type="file"
//             multiple
//             accept="image/*"
//             className="hidden"
//             onChange={e => handleFileSelect(e, "image")}
//           />

//           <div className="flex items-end gap-2">
//             {/* Left buttons */}
//             <div className="flex items-center gap-0.5 pb-1.5">
//               <motion.button
//                 whileHover={{ scale: 1.15 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => fileInputRef.current?.click()}
//                 className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
//                 title="Attach file"
//               >
//                 <Paperclip className="w-[18px] h-[18px]" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.15 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => imageInputRef.current?.click()}
//                 className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
//                 title="Attach image"
//               >
//                 <ImageIcon className="w-[18px] h-[18px]" />
//               </motion.button>
//             </div>

//             {/* Text input */}
//             <div className="flex-1 relative">
//               <div className="flex items-end bg-secondary/50 rounded-[22px] border border-border/50 focus-within:border-primary/40 focus-within:bg-secondary/80 transition-all px-4 py-1">
//                 <textarea
//                   ref={inputRef}
//                   value={input}
//                   onChange={handleInput}
//                   onKeyDown={handleKeyDown}
//                   placeholder={isListening ? "🎙️ Listening..." : "Type your message..."}
//                   rows={1}
//                   className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground outline-none resize-none py-2.5 max-h-[120px] leading-[1.4]"
//                 />
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setShowEmoji(prev => !prev)}
//                   className={`p-1.5 mb-1 transition-colors flex-shrink-0 rounded-full ${showEmoji ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"}`}
//                   title="Emoji"
//                 >
//                   <span className="text-lg leading-none">😊</span>
//                 </motion.button>
//               </div>
//             </div>

//             {/* Send / Mic */}
//             <div className="pb-1">
//               <AnimatePresence mode="wait">
//                 {(input.trim() || attachments.length > 0) ? (
//                   <motion.button
//                     key="send"
//                     initial={{ scale: 0, rotate: -90 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     exit={{ scale: 0, rotate: 90 }}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.85 }}
//                     onClick={handleSend}
//                     disabled={isLoading}
//                     className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 disabled:opacity-40 transition-opacity"
//                   >
//                     <Send className="w-[18px] h-[18px] ml-0.5" />
//                   </motion.button>
//                 ) : (
//                   <motion.button
//                     key="mic"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.85 }}
//                     onClick={toggleListening}
//                     className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                       isListening
//                         ? "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30 animate-pulse"
//                         : "bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10"
//                     }`}
//                   >
//                     {isListening ? <MicOff className="w-[18px] h-[18px]" /> : <Mic className="w-[18px] h-[18px]" />}
//                   </motion.button>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           <p className="text-[10px] text-muted-foreground text-center mt-2 opacity-50">
//             AI responses are not a substitute for professional medical advice
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ── Doctor Message Box Component ── */
// function DoctorMessageBox({
//   children,
//   showAvatar = true,
//   time,
//   typing,
// }: {
//   children?: React.ReactNode;
//   showAvatar?: boolean;
//   time?: string;
//   typing?: boolean;
// }) {
//   return (
//     <div className="flex gap-2 max-w-[85%] sm:max-w-[75%]">
//       {showAvatar ? (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 400 }}
//           className="flex-shrink-0 mt-auto"
//         >
//           <div className="relative">
//             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md">
//               <Stethoscope className="w-4 h-4 text-white" />
//             </div>
//             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
//           </div>
//         </motion.div>
//       ) : (
//         <div className="w-9 flex-shrink-0" />
//       )}

//       <div className="flex flex-col gap-0.5">
//         {showAvatar && (
//           <div className="flex items-center gap-1.5 px-1 mb-0.5">
//             <span className="text-[11px] font-semibold text-foreground">Dr. Sarah Mitchell</span>
//             <span className="px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 text-[9px] font-bold uppercase tracking-wider">
//               Verified
//             </span>
//           </div>
//         )}

//         <motion.div
//           initial={{ scale: 0.92 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 400, damping: 25 }}
//           className="relative rounded-2xl rounded-bl-md shadow-sm overflow-hidden"
//         >
//           {/* Distinctive doctor bubble with left accent */}
//           <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full" />
//           <div className="bg-card border border-border/70 rounded-2xl rounded-bl-md px-4 py-3 pl-5 text-[14px] leading-[1.55] text-card-foreground">
//             {typing ? (
//               <div className="flex items-center gap-1 py-0.5">
//                 {[0, 1, 2].map(j => (
//                   <motion.span
//                     key={j}
//                     animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
//                     transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.18, ease: "easeInOut" }}
//                     className="w-[7px] h-[7px] rounded-full bg-primary"
//                   />
//                 ))}
//                 <span className="text-[11px] text-muted-foreground ml-2">typing...</span>
//               </div>
//             ) : (
//               <>
//                 {children}
//                 {time && (
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className="text-[10px] text-muted-foreground">{time}</span>
//                     <span className="text-[9px] text-emerald-500/80 font-medium">• Dr. Sarah</span>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
