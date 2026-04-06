'use client';

import { useState } from 'react';
import TaskCard from '../components/TaskCard';

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
    title: "Complete Next.js Day 3 tasks",
    description: "Understand Server vs Client Components",
    status: "todo",
    priority: "high"
  },
  {
    id: 2,
    title: "Setup Drizzle ORM for database",
    description: "Prepare PostgreSQL schema",
    status: "in-progress",
    priority: "medium"
  },
  {
    id: 3,
    title: "Design TaskFlow logo",
    status: "done",
    priority: "low"
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleComplete = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
        : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const activeTasks = tasks.filter(t => t.status !== 'done');
  const completedTasks = tasks.filter(t => t.status === 'done');

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-semibold">All Tasks</h2>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
          + New Task
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl mb-6">To Do ({activeTasks.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTasks.map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </div>

        {completedTasks.length > 0 && (
          <div>
            <h3 className="text-xl mb-6 text-emerald-400">Completed ({completedTasks.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedTasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}