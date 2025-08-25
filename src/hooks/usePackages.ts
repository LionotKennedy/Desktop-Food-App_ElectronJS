
// src/hooks/usePackages.ts
import { useState, useCallback } from "react"
import { packages as initialPackages } from "../API/packages" // ✅ import unique
import type { Package } from "../API/packages"

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>(initialPackages)

  const addPackage = useCallback((newPackage: Omit<Package, "id">) => {
    const id = `package-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const packageWithId = { ...newPackage, id }
    setPackages((prev) => [...prev, packageWithId])
    return packageWithId
  }, [])

  const updatePackage = useCallback((id: string, updatedPackage: Omit<Package, "id">) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === id ? { ...updatedPackage, id } : pkg)))
  }, [])

  const deletePackage = useCallback((id: string) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id))
  }, [])

  const getPackageById = useCallback(
    (id: string) => {
      return packages.find((pkg) => pkg.id === id)
    },
    [packages],
  )

  return {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    getPackageById,
  }
}