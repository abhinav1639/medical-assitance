
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "@/app/redux-provider";
import ToastProvider from "./ToastProvider";


import "./globals.css";
import GoogleProvider from "./GoogleProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dotor AI — Voice Medical Assistant",
  description:
    "An AI voice medical assistant with 20+ specialist doctors. Speak, describe symptoms, and get guided next steps—fast.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
      <html lang="en" suppressHydrationWarning>
       
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <GoogleProvider>
          <ToastProvider>
          <ReduxProvider>{children}</ReduxProvider> 
          </ToastProvider>
          </GoogleProvider>
          </body>
      
      </html>
  
  );
}

