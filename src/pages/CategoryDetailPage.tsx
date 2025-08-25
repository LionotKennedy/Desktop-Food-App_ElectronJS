
"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, ShoppingCart, Grid, List, Package, Settings } from "lucide-react"
import { getFoodsByPackage, searchFoods, type Food } from "../API/food"
import { useToast } from "../hooks/use-toast"
import { useEffect, useState } from "react"
import { packages } from "../API/packages"
import { FilterBar, type FilterOptions } from "../components/food/FilterBar"
import { Card, CardContent } from "../components/ui/card"
import { FoodGrid } from "../components/food/FoodGrid"
import { CartSidebar } from "../components/cart/CartSidebar"
import { OrdersSidebar } from "../components/orders/OrdersSidebar"
import { InvoiceModal } from "../components/orders/InvoiceModal"
import { useCart } from "../hooks/useCart"
import { useOrders, type Order } from "../hooks/useOrders"
import { FoodManagement } from "../components/management/FoodManagement"
// import { useAppContext } from "../contexts/AppContext"

export const CategoryDetailPage = () => {
  const { packageId } = useParams<{ packageId: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [foods, setFoods] = useState<Food[]>([])
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [showFoodManagement, setShowFoodManagement] = useState(false)
  // const { cart } = useAppContext()

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
  } = useCart()

  const { orders, isOrdersOpen, addOrder, openOrders, closeOrders, getTotalOrders } = useOrders()

  const currentPackage = packages.find((pkg) => pkg.id === packageId)

  useEffect(() => {
    if (packageId) {
      setIsLoading(true)
      setTimeout(() => {
        const packageFoods = getFoodsByPackage(packageId)
        setFoods(packageFoods)
        setFilteredFoods(packageFoods)
        setIsLoading(false)
      }, 500)
    }
  }, [packageId])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredFoods(foods)
    } else {
      const results = searchFoods(query, packageId)
      setFilteredFoods(results)
    }
  }

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...foods]

    if (searchQuery.trim() !== "") {
      filtered = searchFoods(searchQuery, packageId)
    }

    if (filters.onlyPopular) {
      filtered = filtered.filter((food) => food.isPopular)
    }

    if (filters.onlyNew) {
      filtered = filtered.filter((food) => food.isNew)
    }

    if (filters.preparationTime) {
      filtered = filtered.filter((food) => food.preparationTime <= filters.preparationTime!)
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter((food) => food.price >= min && food.price <= max)
    }

    setFilteredFoods(filtered)
  }

  const handleAddToCart = (foodId: string) => {
    const food = foods.find((f) => f.id === foodId)
    if (food) {
      addToCart(food)
      toast({
        title: "Ajouté au panier",
        description: `${food.name} a été ajouté à votre panier`,
      })
    }
  }

  const handleViewDetails = (foodId: string) => {
    console.log("Voir détails:", foodId)
  }

  const handleBack = () => {
    navigate("/dashboard")
  }

  const handleValidateOrder = () => {
    if (cartItems.length > 0) {
      const orderItems = cartItems.map((item) => ({
        id: item.food.id,
        name: item.food.name,
        price: item.food.price,
        quantity: item.quantity,
        image: item.food.image,
        description: item.food.description,
      }))

      addOrder(orderItems)

      toast({
        title: "Commande validée",
        description: `Votre commande de ${getTotalItems()} article${getTotalItems() > 1 ? "s" : ""} a été validée`,
      })

      clearCart()
      closeCart()
    }
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été supprimés de votre panier",
    })
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsInvoiceModalOpen(true)
    closeOrders()
  }

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false)
    setSelectedOrder(null)
  }

  const handleToggleFoodManagement = () => {
    setShowFoodManagement(!showFoodManagement)
  }

  if (!currentPackage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Catégorie non trouvée</h1>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

  if (showFoodManagement) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleToggleFoodManagement}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la catégorie
            </Button>
          </div>
          {/* <FoodManagement
            packageId={packageId!}
            packageName={currentPackage.name}
            onBack={handleToggleFoodManagement}
          /> */}
          <FoodManagement
            packageId={packageId!}
            packageName={currentPackage.name}
            onBack={handleToggleFoodManagement}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleToggleFoodManagement}
                className="flex items-center gap-2 bg-transparent"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Gérer les plats</span>
              </Button>

              <Button
                variant="outline"
                onClick={openOrders}
                className="flex items-center gap-2 relative bg-transparent"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Commandes</span>
                {getTotalOrders() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600">
                    {getTotalOrders()}
                  </Badge>
                )}
              </Button>

              <Button variant="outline" onClick={openCart} className="flex items-center gap-2 relative bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Panier</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={currentPackage.image || "/placeholder.svg"}
                  alt={currentPackage.name}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h1 className="text-3xl font-bold text-foreground">{currentPackage.name}</h1>
                    <Badge variant="secondary" className="ml-4">
                      {filteredFoods.length} plat{filteredFoods.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">{currentPackage.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {foods.some((f) => f.isPopular) && (
                      <Badge variant="destructive">Contient des plats populaires</Badge>
                    )}
                    {foods.some((f) => f.isNew) && (
                      <Badge className="bg-gradient-primary">Nouveautés disponibles</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <FilterBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            totalItems={filteredFoods.length}
            searchQuery={searchQuery}
          />
        </div>

        <FoodGrid
          foods={filteredFoods}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          isLoading={isLoading}
        />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onValidateOrder={handleValidateOrder}
        onClearCart={handleClearCart}
      />

      <OrdersSidebar isOpen={isOrdersOpen} onClose={closeOrders} orders={orders} onOrderClick={handleOrderClick} />

      <InvoiceModal isOpen={isInvoiceModalOpen} onClose={handleCloseInvoiceModal} order={selectedOrder} />
    </div>
  )
}
