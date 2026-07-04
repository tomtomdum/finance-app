// Le service d'alerte externe (simulé)
export const notificationService = {
  sendAlert: (message: string): void => {
    // Dans la vraie vie, ça envoie un vrai SMS ou Email
    console.log(`Notification envoyée : ${message}`)
  },
}

// La fonction qu'on va tester
export function checkPriceAlert(
  cryptoName: string,
  purchasePrice: number,
  currentPrice: number
): void {
  // 1. On réutilise notre logique de calcul précédente
  const change = ((currentPrice - purchasePrice) / purchasePrice) * 100

  // 2. Si la hausse ou la baisse dépasse 10%
  if (Math.abs(change) >= 10) {
    notificationService.sendAlert(
      `Alerte sur ${cryptoName}! Le prix a bougé de ${change.toFixed(1)}%`
    )
  }
}
