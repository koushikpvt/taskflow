'use server';

import { db } from './db';
import { tasks } from './db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

export async function getTasks(): Promise<Task[]> {
  const result = await db.select().from(tasks).orderBy(tasks.createdAt);
  return result.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description || undefined,
    status: task.status as 'todo' | 'in-progress' | 'done',
    priority: task.priority as 'low' | 'medium' | 'high',
  }));
}

export async function addTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = (formData.get('priority') as 'low' | 'medium' | 'high') || 'medium';

  if (!title?.trim()) {
    throw new Error('Title is required');
  }

  await db.insert(tasks).values({
    title: title.trim(),
    description: description?.trim() || null,
    status: 'todo',
    priority,
  });

  // Revalidate both pages aggressively
  revalidatePath('/', 'layout');     // Revalidate the whole app
  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function toggleTask(id: number) {
  const task = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);

  if (task.length > 0) {
    const currentStatus = task[0].status;
    await db
      .update(tasks)
      .set({ status: currentStatus === 'done' ? 'todo' : 'done' })
      .where(eq(tasks.id, id));
  }

  revalidatePath('/', 'layout');
  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function deleteTask(id: number) {
  await db.delete(tasks).where(eq(tasks.id, id));

  revalidatePath('/', 'layout');
  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}