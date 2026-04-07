import { WelcomeDialog } from "@/components/WelcomeDialog";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QVAC Local AI Lens",
  description:
    "QVAC-first landscape: local AI platforms vs cloud and OSS runtimes, primary sources, matrix, radar, and a UX-only agent-flow simulator (optional USDT horizon).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030712] text-zinc-100 cyber-grid">
        {children}
        <WelcomeDialog />
      </body>
    </html>
  );
}
