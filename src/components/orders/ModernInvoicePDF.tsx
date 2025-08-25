
"use client"
import type React from "react"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"
import type { Order } from "../../hooks/useOrders"

// Styles dynamiques pour un PDF responsive
const createStyles = (itemCount: number) => {
  // Ajuster dynamiquement la taille de la police et le padding en fonction du nombre d'articles
  const fontSizeBase = itemCount > 15 ? 8 : itemCount > 10 ? 9 : 10
  const paddingBase = itemCount > 15 ? 15 : itemCount > 10 ? 20 : 30
  const tableRowPadding = itemCount > 15 ? 6 : itemCount > 10 ? 8 : 12

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: paddingBase,
      fontFamily: "Helvetica",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: paddingBase / 2,
      paddingBottom: paddingBase / 2,
      borderBottomWidth: 2,
      borderBottomColor: "#DB2929FF",
      borderBottomStyle: "solid",
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: fontSizeBase + 8,
      fontWeight: "bold",
      color: "#DB2929FF",
      marginBottom: 4,
    },
    companyDetails: {
      fontSize: fontSizeBase - 2,
      color: "#6b7280",
      lineHeight: 1.4,
    },
    invoiceInfo: {
      alignItems: "flex-end",
    },
    invoiceTitle: {
      fontSize: fontSizeBase + 12,
      fontWeight: "bold",
      color: "#DB2929FF",
      marginBottom: 5,
    },
    invoiceNumber: {
      fontSize: fontSizeBase,
      color: "#111827",
      marginBottom: 3,
    },
    statusBadge: {
      backgroundColor: "#DB292947",
      color: "#ffffff",
      padding: "2 8",
      borderRadius: 15,
      fontSize: fontSizeBase - 2,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 4,
    },
    clientSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: paddingBase / 2,
      padding: paddingBase / 2,
      backgroundColor: "#f9fafb",
      borderRadius: 8,
    },
    sectionTitle: {
      fontSize: fontSizeBase + 2,
      fontWeight: "bold",
      color: "#111827",
      marginBottom: 4,
    },
    sectionContent: {
      fontSize: fontSizeBase - 1,
      color: "#6b7280",
      lineHeight: 1.4,
    },
    table: {
      marginBottom: paddingBase / 2,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#DB292947",
      padding: tableRowPadding,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    tableHeaderText: {
      color: "#000",
      fontSize: fontSizeBase,
      fontWeight: "bold",
    },
    tableRow: {
      flexDirection: "row",
      padding: tableRowPadding,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      borderBottomStyle: "solid",
    },
    tableRowAlt: {
      backgroundColor: "#f9fafb",
    },
    tableCell: {
      fontSize: fontSizeBase - 1,
      color: "#111827",
    },
    tableCellBold: {
      fontSize: fontSizeBase - 1,
      color: "#111827",
      fontWeight: "bold",
    },
    itemName: {
      flex: 3,
    },
    itemQuantity: {
      flex: 1,
      textAlign: "center",
    },
    itemPrice: {
      flex: 1,
      textAlign: "right",
    },
    itemTotal: {
      flex: 1,
      textAlign: "right",
    },
    totalSection: {
      alignItems: "flex-end",
      marginBottom: paddingBase / 2,
    },
    totalContainer: {
      width: 180,
      padding: paddingBase / 2,
      backgroundColor: "#DB292947",
      borderRadius: 8,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    totalLabel: {
      fontSize: fontSizeBase,
      color: "#000",
    },
    totalAmount: {
      fontSize: fontSizeBase,
      color: "#000",
      fontWeight: "bold",
    },
    grandTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#000",
      borderTopStyle: "solid",
    },
    grandTotalLabel: {
      fontSize: fontSizeBase + 2,
      color: "#000",
      fontWeight: "bold",
    },
    grandTotalAmount: {
      fontSize: fontSizeBase + 4,
      color: "#DB2929FF",
      fontWeight: "bold",
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
      borderTopStyle: "solid",
      alignItems: "center",
    },
    footerText: {
      fontSize: fontSizeBase - 2,
      color: "#6b7280",
      textAlign: "center",
      lineHeight: 1.4,
    },
    decorativeElement: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 80,
      height: 80,
      backgroundColor: "#991b1b",
      opacity: 0.1,
      borderBottomLeftRadius: 40,
    },
  })
}

interface ModernInvoicePDFProps {
  order: Order
}

const ModernInvoicePDF: React.FC<ModernInvoicePDFProps> = ({ order }) => {
  const styles = createStyles(order.items.length)
  const showDescriptions = order.items.length <= 10 // Ne pas afficher les descriptions si plus de 10 articles

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Élément décoratif */}
        <View style={styles.decorativeElement} />
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>HOTEL SOAVADIA</Text>
            <Text style={styles.companyDetails}>
              123 Rue de la Gastronomie{"\n"}
              601 Tuléar, Madagascar{"\n"}
              Tél: +33 1 23 45 67 89{"\n"}
              Email: contact@soavadia.mg
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>FACTURE</Text>
            <Text style={styles.invoiceNumber}>N° {order.id.slice(-8).toUpperCase()}</Text>
            <Text style={styles.invoiceNumber}>Date: {formatDate(order.date)}</Text>
            {/* <View style={styles.statusBadge}>
              <Text>{getStatusText(order.status)}</Text>
            </View> */}
          </View>
        </View>
        {/* Informations client et commande */}
        <View style={styles.clientSection}>
          <View>
            <Text style={styles.sectionTitle}>Informations Client</Text>
            <Text style={styles.sectionContent}>
              Client sur place{"\n"}
              Table: Non spécifiée{"\n"}
              Mode: Hotel
            </Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Détails Commande</Text>
            <Text style={styles.sectionContent}>
              Articles: {order.totalItems} {"\n"}
              Date: {formatDate(order.date)} {"\n"}
              Statut: {getStatusText(order.status)}
            </Text>
          </View>
        </View>
        {/* Tableau des articles */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.itemName]}>Article</Text>
            <Text style={[styles.tableHeaderText, styles.itemQuantity]}>Qté</Text>
            <Text style={[styles.tableHeaderText, styles.itemPrice]}>Prix Unit.</Text>
            <Text style={[styles.tableHeaderText, styles.itemTotal]}>Total</Text>
          </View>
          {order.items.map((item, index) => (
            <View key={item.id} style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}>
              <View style={styles.itemName}>
                <Text style={styles.tableCellBold}>{item.name}</Text>
                {showDescriptions && item.description && (
                  <Text style={[styles.tableCell, { fontSize: styles.tableCell.fontSize - 1, color: "#6b7280" }]}>
                    {item.description}
                  </Text>
                )}
              </View>
              <Text style={[styles.tableCell, styles.itemQuantity]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.itemPrice]}>{item.price.toFixed(2)} Ar</Text>
              <Text style={[styles.tableCellBold, styles.itemTotal]}>
                {(item.price * item.quantity).toFixed(2)} Ar
              </Text>
            </View>
          ))}
        </View>
        {/* Section totaux */}
        <View style={styles.totalSection}>
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Sous-total:</Text>
              <Text style={styles.totalAmount}>{order.total.toFixed(2)} Ar</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TVA (20%):</Text>
              <Text style={styles.totalAmount}>{(order.total * 0.2).toFixed(2)} Ar</Text>
            </View>
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalLabel}>TOTAL:</Text>
              <Text style={styles.grandTotalAmount}>{order.total.toFixed(2)} Ar</Text>
            </View>
          </View>
        </View>
        {/* Pied de page */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Merci de votre visite au hotel Soavadia !{"\n"}
            TVA incluse - Paiement à réception{"\n"}
            Pour toute question, contactez-nous au +33 1 23 45 67 89
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export const ModernInvoicePDFDownload: React.FC<ModernInvoicePDFProps> = ({ order }) => (
  <PDFDownloadLink document={<ModernInvoicePDF order={order} />} fileName={`facture-${order.id.slice(-8)}.pdf`}>
    {({ blob, url, loading, error }) => (loading ? "Génération PDF..." : "Télécharger PDF")}
  </PDFDownloadLink>
)

export default ModernInvoicePDF

