import { DashboardClient } from "./DashboardClient"
import { PriceChartWithTimeRange } from "@/components/shared/PriceChartWithTimeRange"
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
  const btcChart = await getMarketChart("bitcoin", "usd", 30)
  const ethChart = await getMarketChart("ethereum", "usd", 30)

  return (
    <main className="container mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Suivi de vos dépenses et cryptomonnaies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PriceChartWithTimeRange
          initialData={btcChart}
          label="Bitcoin"
          title="Bitcoin Price Chart"
          coinId="bitcoin"
        />
        <PriceChartWithTimeRange
          initialData={ethChart}
          label="Ethereum"
          title="Ethereum Price Chart"
          coinId="ethereum"
        />
      </div>

      <DashboardClient initialExpenses={initialExpenses} />
    </main>
  )
}
