import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Quicksand } from "next/font/google";

const fontStyle = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={fontStyle.className}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
