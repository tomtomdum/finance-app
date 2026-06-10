type ProgressBarProps = {
  totalExpenses: number
  salary: number
}

function ExpenseProgressBar({ totalExpenses, salary }: ProgressBarProps) {
  const percentage =
    salary > 0 ? Math.min((totalExpenses / salary) * 100, 100) : 0
  const isOverBudget = totalExpenses > salary && salary > 0

  return (
    <div className="glass-card flex w-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">
          Utilisation du salaire
        </h3>
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-medium ${isOverBudget ? "bg-red-500/20 text-red-300" : "bg-emerald-500/20 text-emerald-300"}`}
        >
          {salary > 0
            ? `${((totalExpenses / salary) * 100).toFixed(1)}%`
            : "Salaire non défini"}
        </span>
      </div>

      {/* Track de la jauge */}
      <div className="relative h-4 w-full overflow-hidden rounded-full border border-white/5 bg-black/30 p-[2px]">
        {/* Remplissage de la jauge */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isOverBudget
              ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              : "bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-xs font-medium text-slate-400">
        <div>
          Dépensé :{" "}
          <span className="text-white">{totalExpenses.toFixed(2)} $</span>
        </div>
        <div>
          Restant :{" "}
          <span
            className={isOverBudget ? "font-bold text-red-400" : "text-white"}
          >
            {(salary - totalExpenses).toFixed(2)} $
          </span>
        </div>
      </div>
    </div>
  )
}
