'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { LogOut, Settings, Users, MessageSquare, Info } from 'lucide-react';

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
            T
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">TaskFlow</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10 text-sm font-medium">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link href="/tasks" className="hover:text-blue-400 transition-colors">Tasks</Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            // Logged in - Show UserButton (Clerk's built-in profile)
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          ) : (
            // Not logged in - Show Sign In button
            <Link
              href="/sign-in"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}