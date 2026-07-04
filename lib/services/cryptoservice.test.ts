import { render, screen } from "@testing-library/react"
import { getMarketChart } from "./cryptoService"

const addnums = (n1: number, n2: number) => {
  return n1 + n2
}

describe("addnums", () => {
  it("should add two numbers correctly", () => {
    expect(addnums(1, 1)).toBe(2)
  })
})

describe("get crypto data", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    global.fetch = jest.fn()
  })
  it("returns data successfully on a 200 OK response", async () => {
    // Fake data that mimics what CoinGecko returns
    const mockData = {
      market_caps: [[1719922200000, 1200000]],
      prices: [[1719922200000, 62000]],
      total_volumes: [[1719922200000, 300000]],
    }
    global.fetch = jest.fn()
    // 2. Hijack the global fetch and force it to resolve successfully
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response)

    const res = await getMarketChart("bitcoin", "usd", 1)

    expect(res).toEqual(mockData)
  })

  it("500 server response", async () => {
    // Fake data that mimics what CoinGecko returns
    const mockData = {}
    const statusCode = 500

    // 2. Hijack the global fetch and force it to resolve successfully
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => mockData,
      status: statusCode,
      statusText: "Internal Server Error",
    } as Response)

    await expect(getMarketChart("bitcoin", "usd", 1)).rejects.toThrow(
      `CoinGecko Market Chart API error: ${statusCode} Internal Server Error`
    )
  })
})

async function donnerUnBurger(n: number): Promise<string> {
  if (n < 0) {
    throw new Error("Erreur lors de la commande du burger")
  }
  return "🍔"
}

describe("calculatePriceChange", () => {
  it("detect numbers <= 0", () => {
    expect(donnerUnBurger(-1)).rejects.toThrow(
      "Erreur lors de la commande du burger"
    )
  })
})

const calculatePriceChange = (
  purchasePrice: number,
  currentPrice: number
): number => {
  if (purchasePrice <= 0) {
    throw new Error("Le prix d'achat doit être supérieur à 0")
  }

  const change = ((currentPrice - purchasePrice) / purchasePrice) * 100

  // Arrondi propre à 2 décimales
  return Math.round(change * 100) / 100
}

describe("calculatePriceChange", () => {
  it("detect numbers <= 0", () => {
    const t = () => calculatePriceChange(0, 50)
    expect(t).toThrow("Le prix d'achat doit être supérieur à 0")
  })
  it("calculates price change correctly", () => {
    const t = calculatePriceChange(100, 50)
    expect(t).toBe(-50)
  })
})
