import { FoodCard } from "./FoodCard";
import { Food } from "../../API/food";

interface FoodGridProps {
  foods: Food[];
  onAddToCart: (foodId: string) => void;
  onViewDetails: (foodId: string) => void;
  isLoading?: boolean;
}

export const FoodGrid = ({ foods, onAddToCart, onViewDetails, isLoading }: FoodGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg h-80"></div>
          </div>
        ))}
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <div className="w-12 h-12 text-muted-foreground">🍽️</div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucun plat disponible
        </h3>
        <p className="text-muted-foreground">
          Il n'y a pas de plats disponibles dans cette catégorie pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};