"use client"

import { useState, useCallback } from "react"
import type { Food } from "../API/food"
import type { CartItem } from "../components/cart/CartSidebar"

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((food: Food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.food.id === food.id)

      if (existingItem) {
        return prevItems.map((item) => (item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevItems, { food, quantity: 1 }]
      }
    })
  }, [])

  const updateQuantity = useCallback((foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.food.id === foodId ? { ...item, quantity } : item)))
  }, [])

  const removeFromCart = useCallback((foodId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.food.id !== foodId))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.food.price * item.quantity, 0)
  }, [cartItems])

  return {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
  }
}
