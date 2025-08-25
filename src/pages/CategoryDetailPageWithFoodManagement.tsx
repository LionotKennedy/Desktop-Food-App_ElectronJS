
"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Settings, ArrowLeft } from "lucide-react"
import { FoodManagement } from "../components/management/FoodManagement"


export const CategoryDetailPageWithFoodManagement = () => {
  const [showFoodManagement, setShowFoodManagement] = useState(false)
  const packageId = "your_package_id"
  const currentPackage = { name: "Your Package Name" }

  const handleFoodManagement = () => {
    setShowFoodManagement(true)
  }

  const handleBack = () => {
    // Your back logic here
  }

  const handleBackToCategory = () => {
    setShowFoodManagement(false)
  }

  if (showFoodManagement) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button
                variant="outline"
                onClick={handleBackToCategory}
                className="flex items-center space-x-2 bg-transparent"
              >
                ← Retour à la catégorie
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <FoodManagement
            packageId={packageId!}
            packageName={currentPackage?.name || ""}
            onBack={handleBackToCategory}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleFoodManagement}
                className="flex items-center gap-2 bg-transparent"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Gérer les plats</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
