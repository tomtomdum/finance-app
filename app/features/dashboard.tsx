export default function Dashboard() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="max-w-2xl text-slate-300">
          This is your dashboard overview. Add widgets, cards, and financial charts here to build your app.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-black/10">
          <h2 className="text-xl font-semibold">Balance</h2>
          <p className="mt-2 text-3xl font-bold">$12,450</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-black/10">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <p className="mt-2 text-3xl font-bold">$3,280</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-black/10">
          <h2 className="text-xl font-semibold">Savings</h2>
          <p className="mt-2 text-3xl font-bold">$8,670</p>
        </div>
      </div>
    </section>
  )
}
