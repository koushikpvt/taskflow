import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Full Screen Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/background-v2.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Main Content - Properly layered */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-10 border border-white/20">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-400">CONSTRUCT YOUR DAY</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6 text-white">
              TaskFlow
            </h1>

            <p className="text-2xl text-zinc-200 mb-12">
              Stay organized.<br />Get things done.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/tasks"
                className="px-14 py-6 bg-white text-black font-semibold rounded-3xl text-xl hover:bg-zinc-100 transition-all"
              >
                Start Now
              </Link>

              <Link
                href="/dashboard"
                className="px-14 py-6 border border-white/50 hover:bg-white/10 text-white rounded-3xl text-xl font-medium transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </main>

        <footer className="py-12 text-center text-zinc-400 text-sm">
          Built with Next.js 16 • Drizzle • Neon
        </footer>
      </div>
    </div>
  );
}