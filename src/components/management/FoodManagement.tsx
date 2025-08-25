
"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Edit, Trash2, ChefHat, Clock, DollarSign } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { useFoods } from "../../hooks/useFoods"
import type { Food } from "../../API/food"
import { useNotifications } from "../../hooks/useNotifications"
import { FoodModal } from "./FoodModal"

import { useEffect } from "react"


interface FoodManagementProps {
  packageId: string
  packageName: string
  onBack: () => void
}

export const FoodManagement: React.FC<FoodManagementProps> = ({ packageId, packageName, onBack }) => {
  const { foods, addFood, updateFood, deleteFood, getFoodsByPackage, getAllFoodsByPackage } = useFoods()
  const { addNotification } = useNotifications()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFood, setEditingFood] = useState<Food | null>(null)

  // const packageFoods = getFoodsByPackage(packageId)
  const packageFoods = getAllFoodsByPackage(packageId)

  const handleCreateFood = () => {
    setEditingFood(null)
    setIsModalOpen(true)
  }

  const handleEditFood = (food: Food) => {
    setEditingFood(food)
    setIsModalOpen(true)
  }

  const handleDeleteFood = (food: Food) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${food.name}" ?`)) {
      deleteFood(food.id)
      addNotification({
        type: "success",
        title: "Plat supprimé",
        message: `Le plat "${food.name}" a été supprimé avec succès.`,
      })
    }
  }

  const handleSaveFood = (foodData: Omit<Food, "id">) => {
    if (editingFood) {
      updateFood(editingFood.id, foodData)
      addNotification({
        type: "success",
        title: "Plat modifié",
        message: `Le plat "${foodData.name}" a été modifié avec succès.`,
      })
    } else {
      addFood(foodData)
      addNotification({
        type: "success",
        title: "Plat créé",
        message: `Le plat "${foodData.name}" a été créé avec succès.`,
      })
    }
  }
    useEffect(() => {
    // console.log("📦 Package ID reçu:", packageId);
    // console.log("📦 Package Name:", packageName);
    // console.log("📦 Nombre de plats trouvés:", packageFoods.length);
  }, [packageId, packageName, packageFoods]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2">
            ← Retour aux packages
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Plats - {packageName}</h1>
          <p className="text-muted-foreground mt-1">Gérez les plats de cette catégorie</p>
        </div>
        <Button onClick={handleCreateFood} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Plat
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{packageFoods.length}</p>
                <p className="text-sm text-muted-foreground">Plats totaux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">
                  {packageFoods.filter((f) => f.available).length}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">{packageFoods.filter((f) => f.available).length}</p>
                <p className="text-sm text-muted-foreground">Disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(packageFoods.reduce((sum, f) => sum + f.preparationTime, 0) / packageFoods.length) || 0}
                </p>
                <p className="text-sm text-muted-foreground">Temps moyen (min)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(packageFoods.reduce((sum, f) => sum + f.price, 0) / packageFoods.length) || 0}
                </p>
                <p className="text-sm text-muted-foreground">Prix moyen (Ar)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packageFoods.map((food) => (
          <Card key={food.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img src={food.image || "/placeholder.svg"} alt={food.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-1">
                {food.isPopular && (
                  <Badge variant="destructive" className="bg-red-600">
                    Populaire
                  </Badge>
                )}
                {food.isNew && <Badge className="bg-green-600">Nouveau</Badge>}
                {!food.available && (
                  <Badge variant="secondary" className="bg-gray-600">
                    Indisponible
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{food.name}</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{food.price} Ar</span>
                <Badge variant="outline">{food.preparationTime} min</Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{food.description}</p>

              <div className="space-y-2 mb-4">
                {food.ingredients.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Ingrédients:</p>
                    <div className="flex flex-wrap gap-1">
                      {food.ingredients.slice(0, 3).map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {food.ingredients.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{food.ingredients.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {food.allergens.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Allergènes:</p>
                    <div className="flex flex-wrap gap-1">
                      {food.allergens.map((allergen, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditFood(food)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteFood(food)}
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
      <FoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFood}
        editingFood={editingFood}
        packageId={packageId}
      />
    </div>
  )
}
