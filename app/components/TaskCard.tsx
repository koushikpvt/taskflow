'use client';

import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';

type Task = {
  id: number;
  title: string;
  description?: string | null;     // Allow null
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'done');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    try {
      await onToggleComplete(task.id);
    } catch (error) {
      setIsCompleted(!newStatus);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const priorityColors = {
    low: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    high: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all group">
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          disabled={isDeleting}
          className={`mt-1.5 w-6 h-6 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            isCompleted 
              ? 'bg-emerald-500 border-emerald-500' 
              : 'border-zinc-600 hover:border-zinc-400'
          }`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-lg break-words pr-8 ${isCompleted ? 'line-through text-zinc-500' : 'text-white'}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-zinc-400 text-sm mt-2 break-words">
              {task.description}
            </p>
          )}

          <div className="flex gap-2 mt-4">
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
              {task.priority.toUpperCase()}
            </span>
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              task.status === 'done' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {task.status.toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-zinc-500 hover:text-rose-500 p-2 transition-colors opacity-70 hover:opacity-100 disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}