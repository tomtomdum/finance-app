import { DashboardClient } from "./DashboardClient"
import type { Expense } from "./expenses/ExpensesTable"
import { getMarketChart } from "@/lib/services/cryptoService"

async function getInitialExpenses(): Promise<Expense[]> {
  return [
    {
      id: "1",
      category: "Alimentation",
      description: "Courses au supermarché",
      date: "2026-06-03",
      amount: 45.99,
    },
    {
      id: "2",
      category: "Transport",
      description: "Carburant",
      date: "2026-06-02",
      amount: 65.0,
    },
    {
      id: "3",
      category: "Loisirs",
      description: "Cinéma",
      date: "2026-06-01",
      amount: 15.5,
    },
    {
      id: "4",
      category: "Santé",
      description: "Pharmacie",
      date: "2026-05-31",
      amount: 28.75,
    },
  ]
}

export async function DashboardServer() {
  const initialExpenses = await getInitialExpenses()

  return (
    <main className="container mx-auto space-y-6 p-4">
      <DashboardClient initialExpenses={initialExpenses} />
    </main>
  )
}
