import Dashboard from "./features/dashboard"
import MyButton from "@/components/test"

export default function Page() {
  const person = { name: "John Doe", age: 30 }
  const products = [
    { title: "Cabbage", id: 1 },
    { title: "Garlic", id: 2 },
    { title: "Apple", id: 3 },
  ]

  return (
    <main className="container mx-auto p-4">
      <Dashboard />
      <MyButton person={person} poulet="Chicken" products={products} />
    </main>
  )
}
