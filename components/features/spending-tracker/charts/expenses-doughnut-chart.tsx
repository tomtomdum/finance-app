"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"
import { Expense } from "@/types"

// On retire "Legend" puisqu'on la gère nous-mêmes en HTML maintenant
ChartJS.register(ArcElement, Tooltip)

type DoughnutChartProps = {
  expenses: Expense[]
}

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  rent: { label: "🏠 Logement", color: "rgba(59, 130, 246, 0.75)" },
  utilities: { label: "💡 Factures", color: "rgba(234, 179, 8, 0.75)" },
  food: { label: "🛒 Alimentation", color: "rgba(34, 197, 94, 0.75)" },
  transport: { label: "🚗 Transport", color: "rgba(249, 115, 22, 0.75)" },
  health: { label: "❤️ Santé", color: "rgba(239, 68, 68, 0.75)" },
  hobbies: { label: "🎨 Loisirs", color: "rgba(168, 85, 247, 0.75)" },
  entertainment: {
    label: "🎬 Divertissement",
    color: "rgba(236, 72, 153, 0.75)",
  },
  other: { label: "❓ Autre", color: "rgba(148, 163, 184, 0.75)" },
}

export default function ExpenseDoughnutChart({ expenses }: DoughnutChartProps) {
  // 1. Calcul des totaux par catégorie
  const totals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>
  )

  const totalGlobal = expenses.reduce((sum, e) => sum + e.amount, 0)

  // Filtrer les catégories actives
  const activeCategories = Object.keys(CATEGORY_MAP).filter(
    (key) => (totals[key] || 0) > 0
  )

  const data = {
    labels: activeCategories.map((key) => CATEGORY_MAP[key].label),
    datasets: [
      {
        data: activeCategories.map((key) => totals[key]),
        backgroundColor: activeCategories.map((key) => CATEGORY_MAP[key].color),
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1.5,
        spacing: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      // Désactivation de la légende par défaut de Chart.js
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => ` ${context.raw.toFixed(2)} $`,
        },
      },
    },
  }

  return (
    <div className="glass-card w-full max-w-2xl p-6">
      <h3 className="mb-6 text-lg font-semibold text-white/90">
        Répartition des dépenses
      </h3>

      {activeCategories.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          Aucune dépense ce mois-ci
        </p>
      ) : (
        // Flexbox : Graphique à gauche, lignes de catégories à droite (devient en colonne sur mobile)
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Section Graphique */}
          <div className="relative h-[200px] w-[200px] flex-shrink-0">
            <Doughnut data={data} options={options} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                Total
              </span>
              <span className="text-xl font-bold text-white">
                {totalGlobal.toFixed(2)} $
              </span>
            </div>
          </div>

          {/* Section Légende en Rows avec Pourcentages */}
          <div className="w-full flex-1 space-y-3">
            {activeCategories.map((key) => {
              const montant = totals[key]
              // Calcul du pourcentage réel
              const pourcentage =
                totalGlobal > 0 ? (montant / totalGlobal) * 100 : 0
              const config = CATEGORY_MAP[key]

              return (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-2.5 transition-colors hover:bg-white/10"
                >
                  {/* Gauche : Indicateur de couleur + Nom de la catégorie */}
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-sm font-medium text-slate-200">
                      {config.label}
                    </span>
                  </div>

                  {/* Droite : Montant et Pourcentage */}
                  <div className="flex items-center gap-4 text-right">
                    <span className="text-sm text-slate-400">
                      {montant.toFixed(2)} $
                    </span>
                    <span className="min-w-[50px] text-sm font-semibold text-white">
                      {pourcentage.toFixed(1)} %
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
