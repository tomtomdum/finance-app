"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

export interface Expense {
  id: string
  category: string
  description: string
  date: string
  amount: number
}

type SortField = "category" | "description" | "date" | "amount"
type SortOrder = "asc" | "desc"

interface ExpensesTableProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

interface SortableHeaderProps {
  field: SortField
  label: string
  onSort: (field: SortField) => void
}

function SortableHeader({ field, label, onSort }: SortableHeaderProps) {
  return (
    <TableHead className="cursor-pointer select-none hover:bg-muted/50">
      <button className="flex items-center gap-1" onClick={() => onSort(field)}>
        {label}
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      </button>
    </TableHead>
  )
}

export function ExpensesTable({
  expenses,
  onEdit,
  onDelete,
}: ExpensesTableProps) {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const sortedExpenses = [...expenses].sort((a, b) => {
    let aVal: string | number = a[sortField]
    let bVal: string | number = b[sortField]

    if (sortField === "amount") {
      aVal = a.amount
      bVal = b.amount
      return sortOrder === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    }

    aVal = (aVal as string).toLowerCase()
    bVal = (bVal as string).toLowerCase()
    const comparison = (aVal as string).localeCompare(bVal as string)
    return sortOrder === "asc" ? comparison : -comparison
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader
            field="category"
            label="Catégorie"
            onSort={handleSort}
          />
          <SortableHeader
            field="description"
            label="Description"
            onSort={handleSort}
          />
          <SortableHeader field="date" label="Date" onSort={handleSort} />
          <SortableHeader field="amount" label="Montant" onSort={handleSort} />
          <TableHead className="w-20 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.category}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{formatDate(expense.date)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(expense.amount)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(expense)}
                    title="Éditer"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete(expense.id)}
                    title="Supprimer"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              Aucune dépense enregistrée
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
