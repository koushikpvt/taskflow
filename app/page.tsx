import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Full Screen Background Video & Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75"
        >
          <source src="/videos/background-v2.mp4" type="video/mp4" />
        </video>
        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 py-12">
        <div />

        <main className="max-w-5xl mx-auto text-center my-auto py-12">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-zinc-900/80 backdrop-blur-xl px-6 py-2.5 rounded-full mb-8 border border-zinc-700/60 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 transition-all cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Construct Your Day
            </span>
          </div>

          {/* Dynamic Headline */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-2xl">
            TaskFlow
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Stay organized.<br />
            <span className="font-semibold text-white">Get things done.</span>
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link
              href="/tasks"
              className="w-full sm:w-auto px-10 py-4.5 bg-white text-zinc-950 font-bold rounded-2xl text-lg hover:bg-zinc-100 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <span>Start Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-10 py-4.5 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/80 hover:bg-zinc-800 text-white font-semibold rounded-2xl text-lg transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <span>View Dashboard</span>
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">Intuitive Tasks</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Organize tasks seamlessly with priorities, status tags, and instant actions.
              </p>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">Real-time Metrics</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Track completion progress, pending items, and personal performance dashboards.
              </p>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">Secure Auth</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Protected by Clerk authentication, ensuring your tasks stay private and safe.
              </p>
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-zinc-500 text-xs border-t border-zinc-900/50">
          TaskFlow App • Built with Next.js 16 • Drizzle • Neon
        </footer>
      </div>
    </div>
  );
}