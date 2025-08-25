// Update the import path below if the file is located elsewhere, for example:
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Flame } from "lucide-react";
import { FoodItem } from "../../API/food";

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard = ({ item }: FoodCardProps) => (
  <Card className="w-full bg-card border-border shadow-sm hover:shadow-lg transition">
    <CardHeader className="p-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-md"
      />
    </CardHeader>

    <CardContent className="p-4 space-y-2">
      <div className="flex items-start justify-between">
        <CardTitle className="text-base font-bold text-foreground">
          {item.name}
        </CardTitle>
        <span className="text-sm font-semibold text-red-600">
          {item.price.toFixed(2)} €
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {item.description}
      </p>

      <div className="flex gap-2">
        {item.popular && (
          <Badge variant="default" className="text-xs">
            Populaire
          </Badge>
        )}
        {item.spicy && (
          <Badge variant="destructive" className="text-xs flex items-center gap-1">
            <Flame className="w-3 h-3" /> Épicé
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);