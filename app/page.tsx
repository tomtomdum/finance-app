import { CryptoServer } from "@/components/features/crypto/CryptoServer"
import Dashboard from "./features/dashboard"
import MyButton from "@/components/test"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  const person = { name: "John Doe", age: 30 }
  const products = [
    { title: "Cabbage", id: 1 },
    { title: "Garlic", id: 2 },
    { title: "Apple", id: 3 },
  ]

  return (
    <main className=" container mx-auto p-4">
      <Tabs defaultValue="/">
        <TabsList className="glass-card border-b-2 mb-4">
          <TabsTrigger value="/">Accueil</TabsTrigger>
          <TabsTrigger value="/crypto">Crypto</TabsTrigger>
        </TabsList>
        <TabsContent value="/">
          <Dashboard />
        </TabsContent>
        <TabsContent value="/crypto">
          <CryptoServer />
        </TabsContent>
      </Tabs>
    </main>
  )
}
