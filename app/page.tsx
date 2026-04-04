
//Homepage (this is what you see at localhost:3000)

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">TaskFlow</h1>
        <p className="text-xl text-zinc-400 mb-8">
          Your modern full-stack task manager
        </p>
        <p className="text-sm text-zinc-500">
          Built with Next.js 16 + TypeScript + Tailwind
        </p>
      </div>
    </div>
  );
}
