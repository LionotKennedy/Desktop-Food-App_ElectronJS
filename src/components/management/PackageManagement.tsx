
"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Edit, Trash2, PackageIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { usePackages } from "../../hooks/usePackages"
import type { Package } from "../../API/packages"
import { useNotifications } from "../../hooks/useNotifications"
import { PackageModal } from "./PackageModal"

export const PackageManagement: React.FC = () => {
  const { packages, addPackage, updatePackage, deletePackage } = usePackages()
  const { addNotification } = useNotifications()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)

  const handleCreatePackage = () => {
    setEditingPackage(null)
    setIsModalOpen(true)
  }

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg)
    setIsModalOpen(true)
  }

  const handleDeletePackage = (pkg: Package) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${pkg.name}" ?`)) {
      deletePackage(pkg.id)
      addNotification({
        type: "success",
        title: "Package supprimé",
        message: `Le package "${pkg.name}" a été supprimé avec succès.`,
      })
    }
  }

  const handleSavePackage = (packageData: Omit<Package, "id">) => {
    if (editingPackage) {
      updatePackage(editingPackage.id, packageData)
      addNotification({
        type: "success",
        title: "Package modifié",
        message: `Le package "${packageData.name}" a été modifié avec succès.`,
      })
    } else {
      addPackage(packageData)
      addNotification({
        type: "success",
        title: "Package créé",
        message: `Le package "${packageData.name}" a été créé avec succès.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Packages</h1>
          <p className="text-muted-foreground mt-1">Gérez les catégories de plats de votre restaurant</p>
        </div>
        <Button onClick={handleCreatePackage} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Package
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <PackageIcon className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{packages.length}</p>
                <p className="text-sm text-muted-foreground">Packages totaux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">
                  {packages.reduce((sum, pkg) => sum + pkg.itemCount, 0)}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">{packages.reduce((sum, pkg) => sum + pkg.itemCount, 0)}</p>
                <p className="text-sm text-muted-foreground">Articles totaux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {Math.round(packages.reduce((sum, pkg) => sum + pkg.itemCount, 0) / packages.length) || 0}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(packages.reduce((sum, pkg) => sum + pkg.itemCount, 0) / packages.length) || 0}
                </p>
                <p className="text-sm text-muted-foreground">Moyenne/package</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/90 text-gray-800">
                  {pkg.itemCount} articles
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{pkg.name}</CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditPackage(pkg)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePackage(pkg)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePackage}
        editingPackage={editingPackage}
      />
    </div>
  )
}
