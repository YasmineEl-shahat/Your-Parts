"use client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import i18n from "@/lib/i18n/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(savedLang);
  }, []);

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
