"use client"

import type React from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Separator } from "../ui/separator"
import { X, Package, Calendar } from "lucide-react"
import type { Order } from "../../hooks/useOrders"

interface OrdersSidebarProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
  onOrderClick: (order: Order) => void
}

export const OrdersSidebar: React.FC<OrdersSidebarProps> = ({ isOpen, onClose, orders, onOrderClick }) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "confirmed":
        return "Confirmée"
      case "completed":
        return "Terminée"
      default:
        return "Inconnue"
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Commandes</h2>
              <Badge variant="secondary">{orders.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Package className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Aucune commande</h3>
                <p className="text-sm text-muted-foreground">Vos commandes validées apparaîtront ici</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onOrderClick(order)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`} />
                          <span className="text-sm font-medium">Commande #{order.id.slice(-6)}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getStatusText(order.status)}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(order.date)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="w-3 h-3" />
                          {order.totalItems} article{order.totalItems > 1 ? "s" : ""}
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="font-semibold text-primary">{order.total.toFixed(2)} Ar</span>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground">Cliquez pour voir la facture</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
