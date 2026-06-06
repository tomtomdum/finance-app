"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface FilterState {
  category: string
  startDate: string
  endDate: string
  minAmount: number | ""
  maxAmount: number | ""
}

const CATEGORIES = [
  "Tous",
  "Alimentation",
  "Transport",
  "Loisirs",
  "Santé",
  "Logement",
  "Utilities",
  "Autre",
]

interface ExpenseFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onReset: () => void
}

export function ExpenseFilters({
  filters,
  onFilterChange,
  onReset,
}: ExpenseFiltersProps) {
  const hasActiveFilters =
    filters.category !== "Tous" ||
    filters.startDate ||
    filters.endDate ||
    filters.minAmount ||
    filters.maxAmount

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filtres</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-1">
            <X className="h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1 block text-sm font-medium">Catégorie</label>
          <select
            value={filters.category}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:ring-1 focus:ring-ring focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Date de</label>
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              onFilterChange({ ...filters, startDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Date à</label>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              onFilterChange({ ...filters, endDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Montant min</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={filters.minAmount}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minAmount: e.target.value ? parseFloat(e.target.value) : "",
              })
            }
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Montant max</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={filters.maxAmount}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxAmount: e.target.value ? parseFloat(e.target.value) : "",
              })
            }
            placeholder="999999.99"
          />
        </div>
      </div>
    </div>
  )
}
