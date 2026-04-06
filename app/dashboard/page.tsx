'use client';

import { useState } from 'react';
import TaskCard from '../components/TaskCard';   // This should work now

// Define Task type directly here (since you don't have types folder yet)
type Task = {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Finish Next.js Day 3 tasks',
    description: 'Complete Server vs Client Components understanding',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Setup Drizzle ORM',
    description: 'Prepare database schema for tasks',
    status: 'done',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Deploy TaskFlow to Vercel',
    description: 'Make sure production build works',
    status: 'todo',
    priority: 'high',
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'done' ? 'todo' : 'done',
            }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-semibold">Dashboard</h2>
          <p className="text-zinc-400 mt-2">Welcome back! Here's your progress</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-medium transition-all flex items-center gap-2">
          + New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <p className="text-zinc-400 text-sm">Total Tasks</p>
          <p className="text-6xl font-bold mt-3">{tasks.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <p className="text-zinc-400 text-sm">Completed</p>
          <p className="text-6xl font-bold mt-3 text-emerald-400">
            {tasks.filter((t) => t.status === 'done').length}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <p className="text-zinc-400 text-sm">In Progress</p>
          <p className="text-6xl font-bold mt-3 text-amber-400">
            {tasks.filter((t) => t.status !== 'done').length}
          </p>
        </div>
      </div>

      {/* Tasks Section */}
      <h3 className="text-2xl font-semibold mb-6">Recent Tasks</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-zinc-500 py-12">No tasks yet.</p>
      )}
    </div>
  );
}