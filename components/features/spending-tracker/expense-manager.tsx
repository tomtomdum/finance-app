// src/app/expense-tracker/_components/expense-manager.tsx
"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ExpenseTable } from "@/components/expenseTable"
import {
  Home,
  Lightbulb,
  Utensils,
  Car,
  Heart,
  Palmtree,
  Film,
  HelpCircle,
} from "lucide-react"

import AddExpenseDialog from "./add-expenses-dialog"
import ExpenseDoughnutChart from "./charts/expenses-doughnut-chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ────────────────────────────────────────────────────────
// CONFIGURATION & TYPES
// ────────────────────────────────────────────────────────
export const CATEGORIES_CONFIG = {
  rent: { label: "Logement", icon: Home, color: "rgba(59, 130, 246, 0.75)" },
  utilities: {
    label: "Factures",
    icon: Lightbulb,
    color: "rgba(234, 179, 8, 0.75)",
  },
  food: {
    label: "Alimentation",
    icon: Utensils,
    color: "rgba(34, 197, 94, 0.75)",
  },
  transport: {
    label: "Transport",
    icon: Car,
    color: "rgba(249, 115, 22, 0.75)",
  },
  health: { label: "Santé", icon: Heart, color: "rgba(239, 68, 68, 0.75)" },
  hobbies: {
    label: "Loisirs",
    icon: Palmtree,
    color: "rgba(168, 85, 247, 0.75)",
  },
  entertainment: {
    label: "Divertissement",
    icon: Film,
    color: "rgba(236, 72, 153, 0.75)",
  },
  other: {
    label: "Autre",
    icon: HelpCircle,
    color: "rgba(148, 163, 184, 0.75)",
  },
} as const

export type ExpenseCategory = keyof typeof CATEGORIES_CONFIG

export type Expense = {
  id: string
  category: ExpenseCategory
  description: string
  amount: number
  date: string
}

// ────────────────────────────────────────────────────────
// FONCTIONS D'AIDE (DATES)
// ────────────────────────────────────────────────────────
const generateYearMonths = () => {
  const currentYear = new Date().getFullYear()
  const months = []
  for (let i = 1; i <= 12; i++) {
    const monthString = i < 10 ? `0${i}` : `${i}`
    months.push(`${currentYear}-${monthString}`)
  }
  return months.reverse() // Décembre à Janvier
}

const formatMonthLabel = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-")
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)
  return date.toLocaleDateString("fr-CA", { month: "long", year: "numeric" })
}

// ────────────────────────────────────────────────────────
// DEFINITION DES COLONNES DU TABLEAU
// ────────────────────────────────────────────────────────
export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "category",
    header: "Catégorie",
    cell: ({ row }) => {
      const categoryKey = row.getValue("category") as ExpenseCategory
      const config = CATEGORIES_CONFIG[categoryKey] || CATEGORIES_CONFIG.other
      const Icon = config.icon
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-400" />
          <span>{config.label}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return <div className="font-medium">{amount.toFixed(2)} $</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]

// ────────────────────────────────────────────────────────
// DATA INITIALE
// ────────────────────────────────────────────────────────
export const initialExpenses: Expense[] = [
  {
    id: "1",
    category: "rent",
    description: "Loyer du mois",
    amount: 1200,
    date: "2026-06-01",
  },
  {
    id: "2",
    category: "utilities",
    description: "Hydro-Québec",
    amount: 150,
    date: "2026-06-02",
  },
  {
    id: "3",
    category: "food",
    description: "Courses Maxi",
    amount: 300,
    date: "2026-06-03",
  },
  {
    id: "4",
    category: "transport",
    description: "Essence Costco",
    amount: 85,
    date: "2026-05-14",
  },
]

// ────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ────────────────────────────────────────────────────────
export function ExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)

  // Gestion du filtre de mois (par défaut : mois actuel au format YYYY-MM)
  const currentMonthString = new Date().toISOString().substring(0, 7)
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthString)

  const allMonths = generateYearMonths()

  // Filtrage des données passées à la table et au graphique
  const filteredExpenses = expenses.filter(
    (expense) => expense.date.substring(0, 7) === selectedMonth
  )

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4">
      {/* Ligne d'outils supérieure : Sélecteur de période & Ajouter une dépense */}
      <div className="glass-card flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-md font-medium whitespace-nowrap text-slate-300">
            Période :
          </h2>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="glass-button w-[180px] border-none text-left text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-dialog border-none text-white">
              {allMonths.map((month) => (
                <SelectItem
                  key={month}
                  value={month}
                  className="cursor-pointer text-slate-200 capitalize hover:bg-white/10 focus:bg-white/10"
                >
                  {formatMonthLabel(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AddExpenseDialog
          onAddExpense={(newExp) => setExpenses([...expenses, newExp])}
        />
      </div>
      <ExpenseTable columns={columns} data={filteredExpenses} />

      <div className="flex">
        <ExpenseDoughnutChart expenses={filteredExpenses} />
      </div>
    </div>
  )
}
