"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Expense } from "@/components/ExpensesTable"

const CATEGORIES = [
  "Alimentation",
  "Transport",
  "Loisirs",
  "Santé",
  "Logement",
  "Utilities",
  "Autre",
]

interface ExpenseFormProps {
  expense?: Expense
  onSubmit: (expense: Expense) => void
  onCancel: () => void
}

export function ExpenseForm({ expense, onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    id: expense?.id || "",
    category: expense?.category || CATEGORIES[0],
    description: expense?.description || "",
    date: expense?.date || new Date().toISOString().split("T")[0],
    amount: expense?.amount || 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.category.trim()) newErrors.category = "Catégorie requise"
    if (!formData.description.trim())
      newErrors.description = "Description requise"
    if (!formData.date) newErrors.date = "Date requise"
    if (formData.amount <= 0) newErrors.amount = "Montant doit être > 0"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: formData.id || Date.now().toString(),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Catégorie</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:ring-1 focus:ring-ring focus:outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-destructive">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <Input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Ex: Courses au supermarché"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Date</label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {errors.date && (
          <p className="mt-1 text-xs text-destructive">{errors.date}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Montant (€)</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: parseFloat(e.target.value) })
          }
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="mt-1 text-xs text-destructive">{errors.amount}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{expense ? "Mettre à jour" : "Ajouter"}</Button>
      </div>
    </form>
  )
}
