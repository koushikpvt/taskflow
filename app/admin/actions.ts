'use server';

import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { db } from '../db';
import { tasks } from '../db/schema';
import { count } from 'drizzle-orm';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: number;
  lastSignInAt: number | null;
  taskCount: number;
};

export type AdminDataResponse = {
  success: boolean;
  isAuthorized: boolean;
  error?: string;
  users?: AdminUser[];
  stats?: {
    totalUsers: number;
    totalTasks: number;
    activeUsers: number;
  };
};

export async function getAdminUserData(): Promise<AdminDataResponse> {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        isAuthorized: false,
        error: 'Authentication required. Please sign in.',
      };
    }

    // Check authorization:
    // User is authorized if:
    // 1. User role in publicMetadata is 'admin', OR
    // 2. User email matches process.env.ADMIN_EMAIL, OR
    // 3. ADMIN_EMAIL is not configured (allowing initial admin access for testing)
    const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase() || '';
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()?.trim();
    const isRoleAdmin = user.publicMetadata?.role === 'admin';

    let isAuthorized = false;
    if (isRoleAdmin) {
      isAuthorized = true;
    } else if (adminEmail) {
      isAuthorized = userEmail === adminEmail;
    } else {
      // If ADMIN_EMAIL is not set, default to allowing logged-in user so admin functionality is accessible
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return {
        success: false,
        isAuthorized: false,
        error: 'Access Denied: You do not have administrator permissions.',
      };
    }

    // Fetch aggregate task counts per user from database (strictly counts, no task content)
    const userTaskCountsRaw = await db
      .select({
        userId: tasks.userId,
        taskCount: count(tasks.id),
      })
      .from(tasks)
      .groupBy(tasks.userId);

    const taskCountMap = new Map<string, number>();
    let totalTasksCount = 0;

    userTaskCountsRaw.forEach((row) => {
      const cnt = Number(row.taskCount);
      taskCountMap.set(row.userId, cnt);
      totalTasksCount += cnt;
    });

    // Fetch users list from Clerk
    let clerkUsers: any[] = [];
    try {
      const client = await clerkClient();
      const userList = await client.users.getUserList({ limit: 100 });
      clerkUsers = userList.data;
    } catch (err) {
      console.error('Failed to fetch Clerk users list:', err);
    }

    // Fallback: If Clerk users list failed or current user isn't in list, ensure current user is present
    if (clerkUsers.length === 0 && user) {
      clerkUsers = [user];
    }

    const adminUsers: AdminUser[] = clerkUsers.map((u) => {
      const primaryEmail = u.emailAddresses?.[0]?.emailAddress || 'No email';
      const fullName = u.firstName
        ? `${u.firstName} ${u.lastName || ''}`.trim()
        : u.username || 'User';

      return {
        id: u.id,
        name: fullName,
        email: primaryEmail,
        imageUrl: u.imageUrl || '',
        createdAt: u.createdAt || Date.now(),
        lastSignInAt: u.lastSignInAt || null,
        taskCount: taskCountMap.get(u.id) || 0,
      };
    });

    // Calculate active users (users logged in within last 30 days or present)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const activeUsersCount = adminUsers.filter(
      (u) => u.lastSignInAt && u.lastSignInAt >= thirtyDaysAgo
    ).length;

    return {
      success: true,
      isAuthorized: true,
      users: adminUsers,
      stats: {
        totalUsers: adminUsers.length,
        totalTasks: totalTasksCount,
        activeUsers: activeUsersCount || adminUsers.length,
      },
    };
  } catch (error: any) {
    console.error('Error in getAdminUserData:', error);
    return {
      success: false,
      isAuthorized: false,
      error: error?.message || 'Failed to fetch admin data.',
    };
  }
}
