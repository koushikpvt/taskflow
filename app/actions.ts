'use server';

import { db } from './db';
import { tasks } from './db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';

export type Task = {
  id: number;
  userId: string;
  title: string;
  description?: string | null;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

export async function getTasks(): Promise<Task[]> {
  const user = await currentUser();
  if (!user) return [];

  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, user.id))
    .orderBy(tasks.createdAt);

  return result.map(task => ({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description || undefined,
    status: task.status as 'todo' | 'in-progress' | 'done',
    priority: task.priority as 'low' | 'medium' | 'high',
  }));
}

export async function addTask(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = (formData.get('priority') as 'low' | 'medium' | 'high') || 'medium';

  if (!title?.trim()) {
    throw new Error('Title is required');
  }

  await db.insert(tasks).values({
    userId: user.id,
    title: title.trim(),
    description: description?.trim() || null,
    status: 'todo',
    priority,
  });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function toggleTask(id: number) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  // Fetch the task to get its current status
  const task = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, id))
    .limit(1);

  if (!task[0]) throw new Error('Task not found');

  const newStatus = task[0].status === 'done' ? 'todo' : 'done';

  await db
    .update(tasks)
    .set({ 
      status: newStatus
    })
    .where(
      and(
        eq(tasks.id, id),
        eq(tasks.userId, user.id)
      )
    );

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function deleteTask(id: number) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');

  await db.delete(tasks).where(
    and(
      eq(tasks.id, id),
      eq(tasks.userId, user.id)
    )
  );

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}