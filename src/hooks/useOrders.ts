"use client"

import { useState, useCallback } from "react"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  description?: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  totalItems: number
  date: Date
  status: "pending" | "confirmed" | "completed"
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)

  const addOrder = useCallback((items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items,
      total,
      totalItems,
      date: new Date(),
      status: "pending",
    }

    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }, [])

  const getOrderById = useCallback(
    (orderId: string) => {
      return orders.find((order) => order.id === orderId)
    },
    [orders],
  )

  const openOrders = useCallback(() => setIsOrdersOpen(true), [])
  const closeOrders = useCallback(() => setIsOrdersOpen(false), [])

  const getTotalOrders = useCallback(() => orders.length, [orders])

  return {
    orders,
    isOrdersOpen,
    addOrder,
    updateOrderStatus,
    getOrderById,
    openOrders,
    closeOrders,
    getTotalOrders,
  }
}
