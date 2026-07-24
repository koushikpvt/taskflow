import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 20 }).notNull().default('todo'),
  priority: varchar('priority', { length: 20 }).notNull().default('medium'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  userEmail: varchar('user_email', { length: 255 }),
  userName: varchar('user_name', { length: 255 }),
  category: varchar('category', { length: 50 }).notNull().default('general'), // 'general' | 'feature' | 'bug' | 'complaint'
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});