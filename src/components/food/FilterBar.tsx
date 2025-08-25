import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  totalItems: number;
  searchQuery?: string;
}

export interface FilterOptions {
  priceRange?: [number, number];
  allergens?: string[];
  preparationTime?: number;
  onlyPopular?: boolean;
  onlyNew?: boolean;
}

export const FilterBar = ({ onSearch, onFilterChange, totalItems, searchQuery = "" }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const toggleFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
    onSearch("");
  };

  const hasActiveFilters = Object.keys(filters).some(key => filters[key as keyof FilterOptions]);

  return (
    <div className="space-y-4">
      {/* Barre de recherche principale */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un plat, ingrédient..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtres
          {hasActiveFilters && (
            <Badge variant="destructive" className="ml-1 px-1 text-xs">
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Résultats */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {totalItems} plat{totalItems > 1 ? 's' : ''} trouvé{totalItems > 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="w-4 h-4 mr-1" />
            Effacer les filtres
          </Button>
        )}
      </div>

      {/* Filtres avancés */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-foreground">Filtres avancés</h3>
          
          {/* Filtres rapides */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sélection rapide</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.onlyPopular ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('onlyPopular', !filters.onlyPopular)}
              >
                ⭐ Populaires
              </Button>
              <Button
                variant={filters.onlyNew ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('onlyNew', !filters.onlyNew)}
              >
                ✨ Nouveautés
              </Button>
            </div>
          </div>

          {/* Temps de préparation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Temps de préparation max</label>
            <div className="flex flex-wrap gap-2">
              {[15, 20, 30, 45].map((time) => (
                <Button
                  key={time}
                  variant={filters.preparationTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('preparationTime', filters.preparationTime === time ? undefined : time)}
                >
                  {time} min
                </Button>
              ))}
            </div>
          </div>

          {/* Prix */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gamme de prix</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={JSON.stringify(filters.priceRange) === JSON.stringify([0, 5000]) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('priceRange', JSON.stringify(filters.priceRange) === JSON.stringify([0, 5000]) ? undefined : [0, 5000])}
              >
                &lt; 5000 Ar
              </Button>
              <Button
                variant={JSON.stringify(filters.priceRange) === JSON.stringify([5000, 8000]) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('priceRange', JSON.stringify(filters.priceRange) === JSON.stringify([5000, 8000]) ? undefined : [5000, 8000])}
              >
                5000 - 8000 Ar
              </Button>
              <Button
                variant={JSON.stringify(filters.priceRange) === JSON.stringify([8000, 15000]) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('priceRange', JSON.stringify(filters.priceRange) === JSON.stringify([8000, 15000]) ? undefined : [8000, 15000])}
              >
                &gt; 8000 Ar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};