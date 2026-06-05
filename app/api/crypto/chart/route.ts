import { getMarketChart } from "@/lib/services/cryptoService"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coinId = searchParams.get("coinId") || "bitcoin"
  const days = parseInt(searchParams.get("days") || "30", 10)
  const vs_currency = searchParams.get("vs_currency") || "usd"

  try {
    const data = await getMarketChart(coinId, vs_currency, days)
    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    )
  }
}
