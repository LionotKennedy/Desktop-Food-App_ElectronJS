import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Rechercher un plat..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleScan = () => {
    // Fonctionnalité future pour scanner un code-barres
    console.log("Scanner activé");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 border-border focus:border-primary focus:ring-primary"
        />
      </div>
      
      <Button 
        type="submit" 
        variant="default"
        className="px-4"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline ml-2">Rechercher</span>
      </Button>
      
      <Button 
        type="button"
        variant="outline"
        onClick={handleScan}
        className="px-4"
      >
        {/* <ScanLine className="w-4 h-4" />
        <span className="hidden sm:inline ml-2">Scanner</span> */}
      </Button>
    </form>
  );
};