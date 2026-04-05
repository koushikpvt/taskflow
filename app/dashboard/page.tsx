export default function Dashboard() {
  return (
    <div>
      <h2 className="text-4xl font-semibold mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <p className="text-zinc-400 text-sm">Total Tasks</p>
          <p className="text-6xl font-bold mt-3">24</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <p className="text-zinc-400 text-sm">In Progress</p>
          <p className="text-6xl font-bold mt-3 text-amber-400">7</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <p className="text-zinc-400 text-sm">Completed</p>
          <p className="text-6xl font-bold mt-3 text-emerald-400">17</p>
        </div>
      </div>
    </div>
  );
}