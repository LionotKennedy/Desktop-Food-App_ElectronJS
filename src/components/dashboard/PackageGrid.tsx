
// src/components/dashboard/PackageGrid.tsx
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { packages, Package } from "../../API/packages";

interface PackageGridProps {
  onPackageSelect: (packageId: string) => void;
}

export const PackageGrid = ({ onPackageSelect }: PackageGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {packages.map((pkg: Package) => (
        <Card
          key={pkg.id}
          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 border-border bg-card"
          onClick={() => onPackageSelect(pkg.id)}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Image */}
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-32 object-cover rounded-md"
              />

              {/* Contenu */}
              <div>
                <h3 className="font-semibold text-lg text-foreground">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
                <Badge variant="secondary" className="text-xs mt-2">
                  {pkg.itemCount} articles
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};