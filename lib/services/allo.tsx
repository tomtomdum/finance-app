// Le type d'un utilisateur retourné par l'API
interface User {
  id: number
  name: string
  email: string
}

// La fonction qui va chercher un utilisateur par son ID
export async function getUserEmail(userId: number): Promise<string> {
  // Appel à l'API publique gratuite
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`)
  }

  const user: User = await response.json()

  // On retourne uniquement l'email en minuscules
  return user.email.toLowerCase()
}
