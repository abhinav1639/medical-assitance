// import { useState, useCallback } from "react";

// export type ChatMessage = {
//   role: "user" | "assistant";
//   content: string;
// };

// // const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-medical-chat`;

// export function useAIChat() {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const sendMessage = useCallback(
//     async (input: string) => {
//       const userMsg: ChatMessage = { role: "user", content: input };
//       setMessages((prev) => [...prev, userMsg]);
//       setIsLoading(true);

//       let assistantSoFar = "";

//       const upsertAssistant = (chunk: string) => {
//         assistantSoFar += chunk;
//         setMessages((prev) => {
//           const last = prev[prev.length - 1];
//           if (last?.role === "assistant") {
//             return prev.map((m, i) =>
//               i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
//             );
//           }
//           return [...prev, { role: "assistant", content: assistantSoFar }];
//         });
//       };

//       try {
//         const allMessages = [...messages, userMsg];
//         const resp = await fetch(CHAT_URL, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
//           },
//           body: JSON.stringify({ messages: allMessages }),
//         });

//         if (!resp.ok || !resp.body) {
//           const errorData = await resp.json().catch(() => ({}));
//           throw new Error(errorData.error || "Failed to connect to AI");
//         }

//         const reader = resp.body.getReader();
//         const decoder = new TextDecoder();
//         let buffer = "";

//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           buffer += decoder.decode(value, { stream: true });

//           let newlineIndex: number;
//           while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
//             let line = buffer.slice(0, newlineIndex);
//             buffer = buffer.slice(newlineIndex + 1);
//             if (line.endsWith("\r")) line = line.slice(0, -1);
//             if (line.startsWith(":") || line.trim() === "") continue;
//             if (!line.startsWith("data: ")) continue;

//             const jsonStr = line.slice(6).trim();
//             if (jsonStr === "[DONE]") break;

//             try {
//               const parsed = JSON.parse(jsonStr);
//               const content = parsed.choices?.[0]?.delta?.content;
//               if (content) upsertAssistant(content);
//             } catch {
//               buffer = line + "\n" + buffer;
//               break;
//             }
//           }
//         }
//       } catch (e) {
//         console.error("AI chat error:", e);
//         upsertAssistant(
//           "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [messages]
//   );

//   const clearMessages = useCallback(() => setMessages([]), []);

//   return { messages, isLoading, sendMessage, clearMessages };
// }