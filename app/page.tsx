import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-7xl font-bold mb-6 tracking-tighter">
        Welcome to <span className="text-blue-500">TaskFlow</span>
      </h1>
      <p className="text-2xl text-zinc-400 mb-10 max-w-md">
        The modern way to manage your tasks with Next.js 16
      </p>
      <div className="flex gap-4">
        <a
          href="/dashboard"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-medium transition-all active:scale-95"
        >
          Go to Dashboard
        </a>
        <a
          href="/tasks"
          className="px-8 py-4 border border-zinc-700 hover:bg-zinc-900 rounded-2xl font-medium transition-all"
        >
          View Tasks
        </a>
      </div>
    </div>
  );
}