"use client"

import { PriceChartWithTimeRange } from "@/components/shared/PriceChartWithTimeRange"

interface CryptoClientProps {
  btcChart: any
  ethChart: any
}

export function CryptoClient({ btcChart, ethChart }: CryptoClientProps) {
  return (
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
  )
}
