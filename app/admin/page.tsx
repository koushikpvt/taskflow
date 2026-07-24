import { getAdminUserData } from './actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const data = await getAdminUserData();

  if (!data.isAuthorized || !data.success) {
    return (
      <div className="relative min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        {/* Background Overlay */}
        <div className="fixed inset-0 z-0 opacity-40">
          <img
            src="/images/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Access Denied Card */}
        <div className="relative z-10 max-w-md w-full bg-zinc-900/90 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6a2 2 0 10-4 0v2h4V9zM5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-zinc-400 text-sm mb-6">
            {data.error || 'Only authorized administrators can access this portal.'}
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl transition-all shadow-lg shadow-blue-600/20"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { users = [], stats } = data;

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/background.png"
          alt="Admin Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Admin User Directory
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              System Overview & Users
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Inspect system statistics and user accounts registered in TaskFlow.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-2xl border border-zinc-700/50 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-zinc-800 opacity-40">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
              Total Registered Users
            </p>
            <p className="text-5xl font-bold mt-3 text-white">
              {stats?.totalUsers || 0}
            </p>
            <p className="text-xs text-zinc-500 mt-2">Accounts in system</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-zinc-800 opacity-40">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
              Total Tasks Created
            </p>
            <p className="text-5xl font-bold mt-3 text-emerald-400">
              {stats?.totalTasks || 0}
            </p>
            <p className="text-xs text-zinc-500 mt-2">Total tasks across system</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-zinc-800 opacity-40">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
              Active Users
            </p>
            <p className="text-5xl font-bold mt-3 text-blue-400">
              {stats?.activeUsers || 0}
            </p>
            <p className="text-xs text-zinc-500 mt-2">Recent active sessions</p>
          </div>
        </div>

        {/* User Directory Section */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Registered Users</h2>
              <p className="text-zinc-400 text-sm mt-0.5">
                Detailed profile directory of all accounts in the database.
              </p>
            </div>

            <span className="px-4 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 font-medium self-start sm:self-auto">
              {users.length} Users Listed
            </span>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-4">User Profile</th>
                  <th className="py-4 px-4">Clerk User ID</th>
                  <th className="py-4 px-4">Joined Date</th>
                  <th className="py-4 px-4">Last Active</th>
                  <th className="py-4 px-4 text-right">Tasks Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      {/* User Profile */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          {user.imageUrl ? (
                            <img
                              src={user.imageUrl}
                              alt={user.name}
                              className="w-10 h-10 rounded-2xl object-cover border border-zinc-700"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {user.name}
                            </p>
                            <p className="text-xs text-zinc-400">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Clerk User ID */}
                      <td className="py-4 px-4 font-mono text-xs text-zinc-400">
                        <span className="bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 inline-block max-w-[180px] truncate">
                          {user.id}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-4 text-zinc-300 text-xs">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>

                      {/* Last Active */}
                      <td className="py-4 px-4 text-zinc-300 text-xs">
                        {user.lastSignInAt
                          ? new Date(user.lastSignInAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )
                          : 'N/A'}
                      </td>

                      {/* Total Tasks Count Badge */}
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {user.taskCount} {user.taskCount === 1 ? 'task' : 'tasks'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-zinc-400 text-base"
                    >
                      No user accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
