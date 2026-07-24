'use client';

import Link from 'next/link';
import { UserButton, useUser, useClerk } from '@clerk/nextjs';

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

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

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-300 hidden md:block">
                {user?.firstName || user?.username || 'User'}
              </span>
              {/* Default UserButton */}
              <UserButton />
              {/* Custom Sign Out with redirect */}
              <button
                onClick={() => signOut({ redirectUrl: '/sign-in' })}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-2xl text-sm font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
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
