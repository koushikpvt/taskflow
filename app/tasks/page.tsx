

import { getTasks, toggleTask, deleteTask } from '../actions';
import TaskCard from '../components/TaskCard';
import NewTaskModal from '../components/NewTaskModal';

type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

interface TasksPageProps {
  searchParams: { status?: string };
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await getTasks();
  const currentFilter = (searchParams.status as 'all' | 'todo' | 'done') || 'all';

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'todo') return task.status !== 'done';
    return task.status === 'done';
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed Full-Screen Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/background.png"
          alt="Tasks Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-semibold text-white">All Tasks</h2>
            <NewTaskModal />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-10">
            <a
              href="/tasks"
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
              }`}
            >
              All
            </a>
            <a
              href="/tasks?status=todo"
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                currentFilter === 'todo' ? 'bg-blue-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
              }`}
            >
              To Do
            </a>
            <a
              href="/tasks?status=done"
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                currentFilter === 'done' ? 'bg-blue-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
              }`}
            >
              Done
            </a>
          </div>

          <h3 className="text-2xl font-semibold mb-8 text-white">
            {currentFilter === 'all' ? 'All Tasks' : currentFilter === 'todo' ? 'To Do' : 'Completed'} ({filteredTasks.length})
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <p className="col-span-2 text-center text-zinc-400 py-20 text-lg">
                No tasks found in this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}