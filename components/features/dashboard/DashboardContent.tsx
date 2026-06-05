"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExpensesTable, type Expense } from "./expenses/ExpensesTable"
import { ExpenseForm } from "./expenses/ExpenseForm"
import { ExpenseFilters, type FilterState } from "./expenses/ExpenseFilters"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, AlertCircle } from "lucide-react"

interface DashboardContentProps {
  initialExpenses: Expense[]
}

export function DashboardContent({ initialExpenses }: DashboardContentProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>()
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    category: "Tous",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  })

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category !== "Tous" && expense.category !== filters.category) {
      return false
    }
    if (filters.startDate && expense.date < filters.startDate) {
      return false
    }
    if (filters.endDate && expense.date > filters.endDate) {
      return false
    }
    if (filters.minAmount && expense.amount < filters.minAmount) {
      return false
    }
    if (filters.maxAmount && expense.amount > filters.maxAmount) {
      return false
    }
    return true
  })

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense])
    setIsDialogOpen(false)
  }

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    )
    setEditingExpense(undefined)
    setIsDialogOpen(false)
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
    setDeleteConfirm(null)
  }

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense)
    setIsDialogOpen(true)
  }

  const handleOpenDialog = () => {
    setEditingExpense(undefined)
    setIsDialogOpen(true)
  }

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      <ExpenseFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={() =>
          setFilters({
            category: "Tous",
            startDate: "",
            endDate: "",
            minAmount: "",
            maxAmount: "",
          })
        }
      />

      <Card className="glass-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Dépenses</h2>
            <p className="text-sm text-muted-foreground">
              {filteredExpenses.length} dépense
              {filteredExpenses.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(totalAmount)}
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenDialog} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingExpense ? "Modifier" : "Ajouter"} une dépense
                  </DialogTitle>
                  <DialogDescription>
                    {editingExpense
                      ? "Modifiez les détails de la dépense"
                      : "Ajoutez une nouvelle dépense à votre suivi"}
                  </DialogDescription>
                </DialogHeader>
                <ExpenseForm
                  expense={editingExpense}
                  onSubmit={
                    editingExpense ? handleUpdateExpense : handleAddExpense
                  }
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {deleteConfirm && (
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium">Confirmer la suppression</p>
              <p className="text-sm text-muted-foreground">
                Cette action est irréversible.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirm(null)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteExpense(deleteConfirm)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        )}

        <ExpensesTable
          expenses={filteredExpenses}
          onEdit={handleEditClick}
          onDelete={(id) => setDeleteConfirm(id)}
        />
      </Card>
    </div>
  )
}
