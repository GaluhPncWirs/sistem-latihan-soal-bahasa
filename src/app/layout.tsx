"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { Open_Sans } from "next/font/google";

const fontStyle = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={fontStyle.className}>
        <SessionProvider>
          <Toaster richColors />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
