"use client"

import { type Expense } from "@/components/ExpensesTable"
import { ExpenseForm } from "@/components/ExpenseForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddEditExpenseDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  expense?: Expense
  onSubmit: (expense: Expense) => void
}

export function AddEditExpenseDialog({
  isOpen,
  onOpenChange,
  expense,
  onSubmit,
}: AddEditExpenseDialogProps) {
  const isEditing = !!expense

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une dépense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Éditer une dépense" : "Ajouter une dépense"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Mettez à jour les détails de votre dépense"
              : "Enregistrez une nouvelle dépense"}
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          expense={expense}
          onSubmit={(newExpense) => {
            onSubmit(newExpense)
            onOpenChange(false)
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
