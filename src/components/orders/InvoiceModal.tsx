"use client"

import type React from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { X, Printer, Calendar, Package, MapPin, Phone, Mail, FileText } from "lucide-react"
import type { Order } from "../../hooks/useOrders"
import { ModernInvoicePDFDownload } from "./ModernInvoicePDF"

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order }) => {
  const handlePrint = () => {
    window.print()
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

  if (!isOpen || !order) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b print:hidden">
            <h2 className="text-xl font-semibold">Facture - Commande #{order.id.slice(-6)}</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                className="bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-700"
                // className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <ModernInvoicePDFDownload order={order} />
                <FileText className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* En-tête de facture */}
              <div className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
                  {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"> */}
                    HOTEL SOAVADIA
                  </h1>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-red-500" />
                      123 Rue de la Gastronomie, 601 Tulear
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-red-500" />
                      +33 1 23 45 67 89
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-red-500" />
                      contact@soavadia.mg
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
                  {/* <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"> */}
                    FACTURE
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="font-mono bg-gray-100 px-2 py-1 rounded">#{order.id.slice(-8).toUpperCase()}</div>
                    <div className="flex items-center gap-2">
                      {/* <Calendar className="w-3 h-3 text-purple-500" /> */}
                      <Calendar className="w-3 h-3 text-red-500" />
                      {formatDate(order.date)}
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white shadow-lg`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-blue-200 to-purple-200 h-0.5" />

              {/* Informations commande */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Informations Client</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Client sur place</div>
                    <div>Table: Non spécifiée</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Détails Commande</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Package className="w-3 h-3" />
                      {order.totalItems} article{order.totalItems > 1 ? "s" : ""}
                    </div>
                    <div>Mode: Sur place</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tableau des articles avec design moderne */}
              <div>
                <h3 className="font-semibold mb-4 text-lg">Articles commandés</h3>
                <div className="border rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    {/* <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"> */}
                    {/* <thead className="bg-gradient-to-r from-gray-300 to-gray-300 text-black"> */}
                    <thead className="bg-gradient-to-r from-red-200 to-red-200 text-black">
                      <tr>
                        <th className="text-left p-4 font-medium">Article</th>
                        <th className="text-center p-4 font-medium">Qté</th>
                        <th className="text-right p-4 font-medium">Prix unitaire</th>
                        <th className="text-right p-4 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr
                          key={item.id}
                          className={
                            index % 2 === 0 ? "bg-background" : "bg-gradient-to-r from-blue-50/30 to-purple-50/30"
                          }
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover shadow-sm"
                                />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{item.name}</div>
                                {item.description && (
                                  <div className="text-xs text-muted-foreground">{item.description}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center font-medium">{item.quantity}</td>
                          <td className="p-4 text-right">{item.price.toFixed(2)} Ar</td>
                          {/* <td className="p-4 text-right font-bold text-blue-600"> */}
                          <td className="p-4 text-right font-bold text-red-600">
                            {(item.price * item.quantity).toFixed(2)} Ar
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totaux avec design moderne */}
              <div className="flex justify-end">
                <div className="w-full max-w-sm">
                  {/* <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-lg"> */}
                  <div className="bg-gradient-to-r from-red-200 to-red-200 text-black p-6 rounded-xl shadow-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Sous-total</span>
                        <span>{order.total.toFixed(2)} Ar</span>
                      </div>
                      <div className="flex justify-between items-center text-sm opacity-80">
                        <span>TVA (20%)</span>
                        <span>{(order.total * 0.2).toFixed(2)} Ar</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total à payer</span>
                        {/* <span className="text-green-400">{order.total.toFixed(2)} Ar</span> */}
                        <span className="text-red-700">{order.total.toFixed(2)} Ar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pied de page */}
              <div className="text-center text-xs text-muted-foreground pt-6 border-t">
                <p>Merci de votre visite !</p>
                <p>TVA incluse - Siret: 123 456 789 00012</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
