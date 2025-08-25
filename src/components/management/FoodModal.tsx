
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { Badge } from "../ui/badge"
import { X, Upload, Plus } from "lucide-react"
import type { Food } from "../../hooks/useFoods"

interface FoodModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (foodData: Omit<Food, "id">) => void
  editingFood: Food | null
  packageId: string
}

export const FoodModal: React.FC<FoodModalProps> = ({ isOpen, onClose, onSave, editingFood, packageId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    available: true,
    preparationTime: 15,
    ingredients: [] as string[],
    allergens: [] as string[],
    calories: 0,
    isPopular: false,
    isNew: false,
  })

  const [newIngredient, setNewIngredient] = useState("")
  const [newAllergen, setNewAllergen] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (editingFood) {
      setFormData({
        name: editingFood.name,
        description: editingFood.description,
        price: editingFood.price,
        image: editingFood.image,
        category: editingFood.category,
        available: editingFood.available,
        preparationTime: editingFood.preparationTime,
        ingredients: [...editingFood.ingredients],
        allergens: [...editingFood.allergens],
        calories: editingFood.calories || 0,
        isPopular: editingFood.isPopular || false,
        isNew: editingFood.isNew || false,
      })
      setImagePreview(editingFood.image)
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        available: true,
        preparationTime: 15,
        ingredients: [],
        allergens: [],
        calories: 0,
        isPopular: false,
        isNew: false,
      })
      setImagePreview(null)
    }
  }, [editingFood, isOpen])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }))
      setNewIngredient("")
    }
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const addAllergen = () => {
    if (newAllergen.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergens: [...prev.allergens, newAllergen.trim()],
      }))
      setNewAllergen("")
    }
  }

  const removeAllergen = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      packageId,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingFood ? "Modifier le plat" : "Nouveau plat"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image du plat</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Glissez une image ici ou cliquez pour sélectionner
                  </p>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs mx-auto" />
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du plat *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          {/* Price and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (Ar) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preparationTime">Temps de préparation (min)</Label>
              <Input
                id="preparationTime"
                type="number"
                value={formData.preparationTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, preparationTime: Number(e.target.value) }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData((prev) => ({ ...prev, calories: Number(e.target.value) }))}
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <Label>Ingrédients</Label>
            <div className="flex gap-2">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Ajouter un ingrédient"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
              />
              <Button type="button" onClick={addIngredient} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeIngredient(index)}
                >
                  {ingredient} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="space-y-2">
            <Label>Allergènes</Label>
            <div className="flex gap-2">
              <Input
                value={newAllergen}
                onChange={(e) => setNewAllergen(e.target.value)}
                placeholder="Ajouter un allergène"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAllergen())}
              />
              <Button type="button" onClick={addAllergen} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.allergens.map((allergen, index) => (
                <Badge
                  key={index}
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => removeAllergen(index)}
                >
                  {allergen} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Switches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, available: checked }))}
              />
              <Label htmlFor="available">Disponible</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPopular"
                checked={formData.isPopular}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPopular: checked }))}
              />
              <Label htmlFor="isPopular">Populaire</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isNew"
                checked={formData.isNew}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isNew: checked }))}
              />
              <Label htmlFor="isNew">Nouveau</Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {editingFood ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
