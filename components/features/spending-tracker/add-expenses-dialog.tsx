"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // Souvent inclus dans Shadcn pour aligner les boutons en bas
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
// Note : Si tu utilises le Select de Shadcn standard, ajuste l'import selon ton setup
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Expense, ExpenseCategory } from "./expense-manager" // Import de tes types

type AddExpenseDialogProps = {
  onAddExpense: (expense: Expense) => void
}

export default function AddExpenseDialog({
  onAddExpense,
}: AddExpenseDialogProps) {
  // 1. Gestion de l'ouverture du Dialog
  const [open, setOpen] = useState(false)

  // 2. Gestion des champs du formulaire
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<ExpenseCategory>("other")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  // 3. Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple
    if (!description || !amount) return

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category,
      date,
    }

    // On envoie la dépense au composant parent
    onAddExpense(newExpense)

    // Réinitialisation du formulaire et fermeture
    setDescription("")
    setAmount("")
    setCategory("other")
    setDate(new Date().toISOString().split("T")[0])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="glass-button !bg-white/30">
          Ajouter une dépense
        </Button>
      </DialogTrigger>

      <DialogContent className="glass-dialog sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une dépense</DialogTitle>
          <DialogDescription>
            Remplissez les détails de votre transaction ci-dessous.
          </DialogDescription>
        </DialogHeader>

        {/* On enveloppe le tout dans une balise form pour gérer le Submit proprement */}
        <form onSubmit={handleSubmit}>
          <FieldGroup className="space-y-4py-4">
            {/* Champ : Description */}
            <Field>
              <FieldLabel htmlFor="expense-desc">Description</FieldLabel>
              <Input
                id="expense-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Épicerie Maxi"
                required
              />
            </Field>

            {/* Champ : Montant */}
            <Field>
              <FieldLabel htmlFor="expense-amount">Montant ($)</FieldLabel>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </Field>

            {/* Champ : Catégorie */}
            <Field>
              <FieldLabel htmlFor="expense-category">Catégorie</FieldLabel>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as ExpenseCategory)}
              >
                <SelectTrigger id="expense-category">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">🏠 Logement</SelectItem>
                  <SelectItem value="utilities">💡 Factures</SelectItem>
                  <SelectItem value="food">🛒 Alimentation</SelectItem>
                  <SelectItem value="transport">Car Transport</SelectItem>
                  <SelectItem value="health">❤️ Santé</SelectItem>
                  <SelectItem value="hobbies">🎨 Loisirs</SelectItem>
                  <SelectItem value="entertainment">
                    🎬 Divertissement
                  </SelectItem>
                  <SelectItem value="other">❓ Autre</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Champ : Date */}
            <Field>
              <FieldLabel htmlFor="expense-date">Date</FieldLabel>
              <Input
                id="expense-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Field>

            {/* Boutons d'action */}
            <DialogFooter className="pt-4">
              <Button
                className="glass-button !bg-red-500/40"
                type="button"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button className="glass-button !bg-green-500/40" type="submit">
                Enregistrer
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
