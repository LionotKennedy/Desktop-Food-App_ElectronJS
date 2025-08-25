import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Users, Plus, Star, Sparkles } from "lucide-react";
import { Food } from "../../API/food";

interface FoodCardProps {
  food: Food;
  onAddToCart: (foodId: string) => void;
  onViewDetails: (foodId: string) => void;
}

export const FoodCard = ({ food, onAddToCart, onViewDetails }: FoodCardProps) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} Ar`;
  };


  const getAllergenBadgeVariant = (allergen: string) => {
    switch (allergen.toLowerCase()) {
      case 'lait': return 'secondary';
      case 'œufs': return 'outline';
      case 'gluten': return 'secondary';
      case 'poisson': return 'outline';
      case 'crustacés': return 'secondary';
      case 'soja': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <Card className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] border-border bg-gradient-card relative overflow-hidden">
      {/* Badges de statut */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {food.isPopular && (
          <Badge variant="destructive" className="flex items-center gap-1 text-xs shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Populaire
          </Badge>
        )}
        {food.isNew && (
          <Badge className="bg-gradient-primary flex items-center gap-1 text-xs shadow-sm">
            <Sparkles className="w-3 h-3 fill-current" />
            Nouveau
          </Badge>
        )}
      </div>

      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Contenu */}
        <div className="p-4 space-y-3">
          {/* Titre et prix */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-foreground leading-tight">
              {food.name}
            </h3>
            <span className="text-xl font-bold text-primary ml-2">
              {formatPrice(food.price)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {food.description}
          </p>

          {/* Informations */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{food.preparationTime} min</span>
            </div>
            {food.calories && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{food.calories} cal</span>
              </div>
            )}
          </div>

          {/* Allergènes */}
          {food.allergens.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {food.allergens.map((allergen) => (
                <Badge
                  key={allergen}
                  variant={getAllergenBadgeVariant(allergen)}
                  className="text-xs"
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(food.id);
              }}
              className="flex-1"
            >
              Détails
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(food.id);
              }}
              size="sm"
              className="flex-1 bg-gradient-primary hover:shadow-primary"
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};