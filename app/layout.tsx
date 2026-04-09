import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Modern full-stack task manager built with Next.js 16',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        {/* Navbar */}
        <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                T
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">TaskFlow</h1>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
              <Link href="/tasks" className="hover:text-blue-400 transition-colors">Tasks</Link>
            </div>

            <div className="text-sm text-zinc-400">
              Welcome, User
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}