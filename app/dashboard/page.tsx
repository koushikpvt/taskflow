import { getTasks, toggleTask, deleteTask } from '../actions';
import TaskCard from '../components/TaskCard';

export default async function Dashboard() {
  const tasks = await getTasks();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed Full-Screen Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/background.png"
          alt="Dashboard Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-semibold text-white">Dashboard</h2>
              <p className="text-zinc-400 mt-2">Welcome back! Here's your progress</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-3xl p-8">
              <p className="text-zinc-400 text-sm">Total Tasks</p>
              <p className="text-6xl font-bold mt-3 text-white">{tasks.length}</p>
            </div>
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-3xl p-8">
              <p className="text-zinc-400 text-sm">Completed</p>
              <p className="text-6xl font-bold mt-3 text-emerald-400">
                {tasks.filter((t) => t.status === 'done').length}
              </p>
            </div>
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-3xl p-8">
              <p className="text-zinc-400 text-sm">In Progress</p>
              <p className="text-6xl font-bold mt-3 text-amber-400">
                {tasks.filter((t) => t.status !== 'done').length}
              </p>
            </div>
          </div>

          {/* Recent Tasks */}
          <h3 className="text-2xl font-semibold mb-8 text-white">Recent Tasks</h3>
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
        </div>
      </div>
    </div>
  );
}