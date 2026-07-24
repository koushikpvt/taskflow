import { getTasks, toggleTask, deleteTask } from '../actions';
import TaskCard from '../components/TaskCard';
import NewTaskModal from '../components/NewTaskModal';
import Link from 'next/link';

export default async function Dashboard() {
  const tasks = await getTasks();

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const inProgressCount = tasks.filter((t) => t.status !== 'done').length;
  const completionPercentage =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/background.png"
          alt="Dashboard Background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Overview & Analytics
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Personal Dashboard
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Welcome back! Here is a summary of your task activity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <NewTaskModal />
            <Link
              href="/tasks"
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-sm font-medium rounded-2xl border border-zinc-800 transition-all flex items-center gap-2"
            >
              <span>All Tasks</span>
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Tasks Card */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Total Tasks
              </span>
              <div className="w-9 h-9 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-5xl font-extrabold text-white tracking-tight">
              {tasks.length}
            </p>
            <p className="text-xs text-zinc-500 mt-2">Active tasks in workspace</p>
          </div>

          {/* Completed Card */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Completed
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-5xl font-extrabold text-emerald-400 tracking-tight">
                {completedCount}
              </p>
              <span className="text-xs font-bold text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
                {completionPercentage}% Done
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-zinc-950 rounded-full mt-4 overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* In Progress Card */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                In Progress / Pending
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-5xl font-extrabold text-amber-400 tracking-tight">
              {inProgressCount}
            </p>
            <p className="text-xs text-zinc-500 mt-2">Tasks requiring attention</p>
          </div>
        </div>

        {/* Recent Tasks Feed */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Tasks</h2>
          {tasks.length > 6 && (
            <Link
              href="/tasks"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>View all ({tasks.length})</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tasks.slice(0, 6).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Tasks Yet</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Get started by creating your first task to construct your day!
            </p>
            <NewTaskModal />
          </div>
        )}
      </div>
    </div>
  );
}