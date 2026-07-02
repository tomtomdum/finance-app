interface CryptoPriceResponse {
  [key: string]: {
    [currency: string]: number
  }
}

export interface MarketChartResponse {
  prices: Array<[number, number]>
  market_caps: Array<[number, number]>
  volumes: Array<[number, number]>
}

const CRYPTO_API_URL = "https://api.coingecko.com/api/v3/simple/price"
const MARKET_CHART_API_URL = "https://api.coingecko.com/api/v3/coins"
const API_KEY = "CG-jZGmuhUaWBHSmKVvdNycZ8W6"

export async function getCryptoPrices(
  ids: string[] = ["bitcoin"],
  vs_currencies: string[] = ["usd"]
): Promise<CryptoPriceResponse> {
  const params = new URLSearchParams({
    ids: ids.join(","),
    vs_currencies: vs_currencies.join(","),
    x_cg_demo_api_key: API_KEY,
  })

  const res = await fetch(`${CRYPTO_API_URL}?${params}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
  })

  if (!res.ok) {
    throw new Error(`CoinGecko API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getBitcoinPrice(
  vs_currency: string = "usd"
): Promise<number> {
  const data = await getCryptoPrices(["bitcoin"], [vs_currency])
  return data.bitcoin[vs_currency]
}

export async function getMarketChart(
  id: string = "bitcoin",
  vs_currency: string = "usd",
  days: number = 30
): Promise<MarketChartResponse> {
  const params = new URLSearchParams({
    vs_currency,
    days: days.toString(),
    x_cg_demo_api_key: API_KEY,
  })

  const res = await fetch(
    `${MARKET_CHART_API_URL}/${id}/market_chart?${params}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
    }
  )

  if (!res.ok) {
    throw new Error(
      `CoinGecko Market Chart API error: ${res.status} ${res.statusText}`
    )
  }

  return res.json()
}

export async function getBitcoinChart(
  vs_currency: string = "usd",
  days: number = 30
): Promise<MarketChartResponse> {
  return getMarketChart("bitcoin", vs_currency, days)
}
