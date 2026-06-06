"use client"

import { useEffect, useRef } from "react"
import { Chart as ChartJS, registerables } from "chart.js"

ChartJS.register(...registerables)

interface PriceChartProps {
  data: Array<[number, number]>
  label: string
  title: string
  currency?: string
  color?: string
}

export function PriceChart({
  data,
  label,
  title,
  currency = "USD",
  color = "#3b82f6",
}: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const formatLabel = (timestamp: number): string => {
      const date = new Date(timestamp)
      if (data.length > 48) {
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      }
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    const labels = data.map((point) => formatLabel(point[0]))
    const prices = data.map((point) => point[1])

    chartRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data: prices,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
            segment: {
              borderColor: (ctx: any) => {
                if (ctx.p0.skip || ctx.p1.skip) return "#22c55e"
                const p0 = ctx.p0DataIndex !== undefined ? prices[ctx.p0DataIndex] : ctx.p0.y
                const p1 = ctx.p1DataIndex !== undefined ? prices[ctx.p1DataIndex] : ctx.p1.y
                return p1 >= p0 ? "#22c55e" : "#ef4444"
              },
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          title: {
            display: true,
            text: title,
            font: { size: 16, weight: "bold" },
          },
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: 12,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            cornerRadius: 8,
            callbacks: {
              title: () => {
                return ""
              },
              label: (context: any) => {
                const timestamp = data[context.dataIndex][0]
                const price = context.parsed.y
                const date = new Date(timestamp)
                const dateStr = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                const timeStr = date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                return [`${dateStr} ${timeStr}`, `Price: $${price.toFixed(2)}`]
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: `Price (${currency})`,
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, label, title, currency])

  return (
    <div className="rounded-lg border bg-card p-6">
      <canvas ref={canvasRef} />
    </div>
  )
}
