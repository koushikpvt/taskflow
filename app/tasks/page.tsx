export default function Tasks() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-semibold">All Tasks</h2>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition-all">
          + New Task
        </button>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-400">
        Tasks list will appear here (we'll connect real data in Week 2–3)
      </div>
    </div>
  );
}