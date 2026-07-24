import { getTasks, toggleTask, deleteTask } from '../actions';
import TaskCard from '../components/TaskCard';
import NewTaskModal from '../components/NewTaskModal';
import Link from 'next/link';

interface TasksPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await getTasks();
  const params = await searchParams;
  const currentFilter = (params?.status as 'all' | 'todo' | 'done') || 'all';

  const todoTasks = tasks.filter((t) => t.status !== 'done');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'todo') return task.status !== 'done';
    return task.status === 'done';
  });

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Fixed Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/background.png"
          alt="Tasks Background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Workspace
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              All Tasks ({tasks.length})
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage, filter, and complete your tasks efficiently.
            </p>
          </div>

          <NewTaskModal />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Link
            href="/tasks"
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              currentFilter === 'all'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <span>All Tasks</span>
            <span className="px-2 py-0.5 rounded-lg bg-black/30 text-[10px]">
              {tasks.length}
            </span>
          </Link>

          <Link
            href="/tasks?status=todo"
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              currentFilter === 'todo'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <span>To Do / In Progress</span>
            <span className="px-2 py-0.5 rounded-lg bg-black/30 text-[10px]">
              {todoTasks.length}
            </span>
          </Link>

          <Link
            href="/tasks?status=done"
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              currentFilter === 'done'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <span>Completed</span>
            <span className="px-2 py-0.5 rounded-lg bg-black/30 text-[10px]">
              {doneTasks.length}
            </span>
          </Link>
        </div>

        {/* Task Cards Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-3xl bg-zinc-800/80 border border-zinc-700 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Tasks Found</h3>
            <p className="text-zinc-400 text-sm mb-6">
              There are no tasks matching the selected filter ({currentFilter}).
            </p>
            <NewTaskModal />
          </div>
        )}
      </div>
    </div>
  );
}