"use client"

import { useState } from "react"
import { PriceChart } from "./PriceChart"
import { Button } from "@/components/ui/button"
import type { MarketChartResponse } from "@/lib/services/cryptoService"

interface PriceChartWithTimeRangeProps {
  initialData: MarketChartResponse
  label: string
  title: string
  coinId: string
  currency?: string
}

type TimeRange = "1h" | "1d" | "5d" | "1m"

const TIME_RANGE_CONFIG: Record<TimeRange, { label: string; days: number }> = {
  "1h": { label: "1H", days: 1 },
  "1d": { label: "1D", days: 7 },
  "5d": { label: "5D", days: 5 },
  "1m": { label: "1M", days: 30 },
}

export function PriceChartWithTimeRange({
  initialData,
  label,
  title,
  coinId,
  currency = "usd",
}: PriceChartWithTimeRangeProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1m")
  const [data, setData] = useState<MarketChartResponse>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  const handleTimeRangeChange = async (range: TimeRange) => {
    setSelectedRange(range)
    setIsLoading(true)

    try {
      const days = TIME_RANGE_CONFIG[range].days
      const response = await fetch(
        `/api/crypto/chart?coinId=${coinId}&days=${days}&vs_currency=${currency}`
      )
      if (!response.ok) throw new Error("Failed to fetch chart data")
      const newData = await response.json()
      setData(newData)
    } catch (error) {
      console.error("Error fetching chart data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative bg-card p-6">
      <div className="absolute left-6 top-6 flex gap-2 z-10">
        {(Object.keys(TIME_RANGE_CONFIG) as TimeRange[]).map((range) => (
          <Button
            key={range}
            variant={selectedRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange(range)}
            disabled={isLoading}
            className="text-xs"
          >
            {TIME_RANGE_CONFIG[range].label}
          </Button>
        ))}
      </div>
      <div className="pt-12">
        <PriceChart
          data={data.prices}
          label={label}
          title={title}
          currency={currency}
        />
      </div>
    </div>
  )
}
