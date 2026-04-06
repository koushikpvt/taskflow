'use client';

import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'done');

  const handleToggle = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    onToggleComplete(task.id);
  };

  const priorityColors = {
    low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    high: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  } as const;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all group">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`mt-1 w-6 h-6 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-zinc-600 hover:border-zinc-400'
          }`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-lg break-words ${
              isCompleted ? 'line-through text-zinc-500' : ''
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-zinc-400 text-sm mt-2 break-words">
              {task.description}
            </p>
          )}

          <div className="mt-4">
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-medium border ${priorityColors[task.priority]}`}
            >
              {task.priority.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-zinc-500 hover:text-rose-400 p-2 transition-colors opacity-70 hover:opacity-100"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}