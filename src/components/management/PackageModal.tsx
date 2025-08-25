"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, ImageIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { Package } from "../../hooks/usePackages"

interface PackageModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (packageData: Omit<Package, "id">) => void
  editingPackage?: Package | null
}

export const PackageModal: React.FC<PackageModalProps> = ({ isOpen, onClose, onSave, editingPackage }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    itemCount: 0,
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        name: editingPackage.name,
        description: editingPackage.description,
        image: editingPackage.image,
        itemCount: editingPackage.itemCount,
      })
      setImagePreview(editingPackage.image)
    } else {
      setFormData({
        name: "",
        description: "",
        image: "",
        itemCount: 0,
      })
      setImagePreview("")
    }
  }, [editingPackage, isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "itemCount" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImagePreview(result)
      setFormData((prev) => ({ ...prev, image: result }))
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.description) {
      onSave(formData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">
            {editingPackage ? "Modifier le package" : "Nouveau package"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Image du package</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg mx-auto"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImagePreview("")
                        setFormData((prev) => ({ ...prev, image: "" }))
                      }}
                    >
                      Changer l'image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Glissez-déposez une image ou cliquez pour sélectionner
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Sélectionner une image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom du package *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Fruits de mer"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="itemCount" className="text-sm font-medium">
                  Nombre d'articles
                </label>
                <input
                  type="number"
                  id="itemCount"
                  name="itemCount"
                  value={formData.itemCount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Ex: Plateaux, poissons frais, spécialités marines..."
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {editingPackage ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
