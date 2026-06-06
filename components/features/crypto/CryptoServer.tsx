import { CryptoClient } from "./CryptoClient"
import { getMarketChart } from "@/lib/services/cryptoService"

async function getInitialCryptoData() {
  const btcChart = await getMarketChart("bitcoin", "usd", 30)
  const ethChart = await getMarketChart("ethereum", "usd", 30)

  return {
    btcChart,
    ethChart,
  }
}

export async function CryptoServer() {
  const { btcChart, ethChart } = await getInitialCryptoData()

  return (
    <main className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Crypto</h1>
        <p className="text-muted-foreground">
          Suivi des prix des cryptomonnaies
        </p>
      </div>

      <CryptoClient btcChart={btcChart} ethChart={ethChart} />
    </main>
  )
}