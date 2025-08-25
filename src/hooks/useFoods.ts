
"use client"
import { useState } from "react"
import { foods as initialFoods, type Food } from "../API/food"

export const useFoods = () => {
  const [foods, setFoods] = useState<Food[]>(initialFoods) // ← plus de localStorage

  const addFood = (foodData: Omit<Food, "id">) => {
    const newFood: Food = {
      ...foodData,
      id: `food_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
    setFoods(prev => [...prev, newFood])
  }

  const updateFood = (id: string, foodData: Omit<Food, "id">) => {
    setFoods(prev => prev.map(f => (f.id === id ? { ...foodData, id } : f)))
  }

  const deleteFood = (id: string) => {
    setFoods(prev => prev.filter(f => f.id !== id))
  }

  const getFoodsByPackage = (packageId: string) =>
    foods.filter(f => f.packageId === packageId && f.available)

  const getFoodById = (id: string) => foods.find(f => f.id === id)

  const getAllFoodsByPackage = (packageId: string) =>
    foods.filter(f => f.packageId === packageId)

  return {
    foods,
    addFood,
    updateFood,
    deleteFood,
    getFoodsByPackage,
    getFoodById,
    getAllFoodsByPackage,
  }
}

export { Food }