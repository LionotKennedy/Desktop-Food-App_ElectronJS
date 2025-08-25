
"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { X, Plus, Minus, ShoppingCart, Trash2, Check } from "lucide-react"
import type { Food } from "../../API/food"

export interface CartItem {
  food: Food
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (foodId: string, quantity: number) => void
  onRemoveItem: (foodId: string) => void
  onValidateOrder: () => void
  onClearCart: () => void
}

export const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onValidateOrder,
  onClearCart,
}: CartSidebarProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} Ar`
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.food.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleIncrement = (foodId: string, currentQuantity: number) => {
    onUpdateQuantity(foodId, currentQuantity + 1)
  }

  const handleDecrement = (foodId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      onUpdateQuantity(foodId, currentQuantity - 1)
    } else {
      onRemoveItem(foodId)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[420px] bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Mon Panier</h2>
              {cartItems.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getTotalItems()} article{getTotalItems() > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              // Empty cart
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Votre panier est vide</h3>
                <p className="text-muted-foreground mb-4">
                  Ajoutez des plats délicieux à votre panier pour commencer votre commande.
                </p>
                <Button onClick={onClose} variant="outline">
                  Continuer mes achats
                </Button>
              </div>
            ) : (
              // Cart items
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.food.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.food.image || "/placeholder.svg"}
                            alt={item.food.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-foreground text-sm leading-tight">{item.food.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.food.id)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive ml-2 flex-shrink-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>

                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.food.description}</p>

                          <div className="flex items-center justify-between">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDecrement(item.food.id, item.quantity)}
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleIncrement(item.food.id, item.quantity)}
                                className="h-7 w-7 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-sm font-semibold text-primary">
                                {formatPrice(item.food.price * item.quantity)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-xs text-muted-foreground">
                                  {formatPrice(item.food.price)} × {item.quantity}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-border bg-card p-4 space-y-4">
              {/* Total */}
              <div className="space-y-2">
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {getTotalItems()} article{getTotalItems() > 1 ? "s" : ""} • Temps de préparation estimé:{" "}
                  {Math.max(...cartItems.map((item) => item.food.preparationTime))} min
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button onClick={onValidateOrder} className="w-full bg-gradient-primary hover:shadow-primary" size="lg">
                  <Check className="w-4 h-4 mr-2" />
                  Valider la commande
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClearCart} className="flex-1 bg-transparent" size="sm">
                    Vider le panier
                  </Button>
                  <Button variant="ghost" onClick={onClose} className="flex-1" size="sm">
                    Continuer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
