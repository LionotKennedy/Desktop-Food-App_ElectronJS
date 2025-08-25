
"use client"
import { useState } from "react"
import { SearchBar } from "../components/dashboard/SearchBar"
import { PackageGrid } from "../components/dashboard/PackageGrid"
import { Button } from "../components/ui/button"
import { ShoppingCart, Receipt, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PackageManagement } from "../components/management/PackageManagement"
import { NotificationContainer } from "../components/notifications/NotificationContainer"
import { useNotifications } from "../hooks/useNotifications"
import { useOrders } from "../hooks/useOrders"
import { OrdersSidebar } from "../components/orders/OrdersSidebar"
import { useCart } from "../hooks/useCart" // Importez useCart
import { CartSidebar } from "../components/cart/CartSidebar" // Importez CartSidebar
import { Badge } from "../components/ui/badge"

interface DashboardProps {
  user: {
    username: string
    role: string
  }
  onLogout: () => void
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const navigate = useNavigate()
  const [showManagement, setShowManagement] = useState(false)
  const { notifications, removeNotification } = useNotifications()
  const { orders, isOrdersOpen, openOrders, closeOrders, getTotalOrders } = useOrders()
  const {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    getTotalItems,
  } = useCart() // Ajoutez useCart

  const handleSearch = (query: string) => {
    console.log("Recherche:", query)
    // Implémentation future de la recherche
  }

  const handlePackageSelect = (packageId: string) => {
    console.log("Package sélectionné:", packageId)
    navigate(`/category/${packageId}`)
  }

  const handleCartClick = () => {
    openCart() // Ouvre la sidebar du panier
  }

  const handleOrdersClick = () => {
    openOrders() // Ouvre la sidebar des commandes
  }

  const handleSettingsClick = () => {
    console.log("Paramètres")
    setShowManagement(true)
  }

  const handleBackToDashboard = () => {
    setShowManagement(false)
  }

  const handleOrderClick = (order: any) => {
    console.log("Commande sélectionnée:", order.id)
    // Logique future pour afficher les détails de la commande
  }

  const handleValidateOrder = () => {
    if (cartItems.length > 0) {
      // Logique pour valider la commande (à implémenter si nécessaire)
      console.log("Validation de la commande")
      clearCart()
      closeCart()
    }
  }

  const handleClearCart = () => {
    clearCart()
    // Optionnel : Ajouter une notification via useToast si disponible
    console.log("Panier vidé")
  }

  if (showManagement && (user.role === "ADMIN" || user.role === "MANAGER")) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 bg-transparent"
              >
                ← Retour au Dashboard
              </Button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Connecté en tant que <strong>{user.username}</strong> ({user.role})
                </span>
                <Button variant="outline" onClick={onLogout}>
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PackageManagement />
        </main>
        <NotificationContainer notifications={notifications} onRemove={removeNotification} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Barre de recherche */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Actions rapides */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={handleCartClick}
            className="flex items-center space-x-2 bg-transparent relative"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Panier</span>
            {/* {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                {getTotalItems()}
              </Badge>
            )} */}
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600 text-white">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleOrdersClick}
            className="flex items-center space-x-2 bg-transparent relative"
          >
            <Receipt className="w-4 h-4" />
            <span>Commandes</span>
            {/* {getTotalOrders() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600">
                {getTotalOrders()}
              </Badge>
            )} */}
            {getTotalOrders() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600 text-white">
                {getTotalOrders()}
              </Badge>
            )}
          </Button>
          {(user.role === "ADMIN" || user.role === "MANAGER") && (
            <Button
              variant="outline"
              onClick={handleSettingsClick}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Settings className="w-4 h-4" />
              <span>Gestion</span>
            </Button>
          )}
        </div>
        {/* Titre de section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Catégories de plats</h2>
          <p className="text-muted-foreground">Sélectionnez une catégorie pour voir les plats disponibles</p>
        </div>
        {/* Grille des packages */}
        <PackageGrid onPackageSelect={handlePackageSelect} />
      </main>
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
      <OrdersSidebar
        isOpen={isOrdersOpen}
        onClose={closeOrders}
        orders={orders}
        onOrderClick={handleOrderClick}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onValidateOrder={handleValidateOrder}
        onClearCart={handleClearCart}
      />
    </div>
  )
}