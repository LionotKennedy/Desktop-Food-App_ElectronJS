
// Types pour les aliments

import beefImg1 from "../assets/viandes/1.jpg";
import beefImg2 from "../assets/viandes/2.jpg";
import beefImg3 from "../assets/viandes/5.jpg";
import beefImg4 from "../assets/viandes/4.jpg";

// Types pour les aliments poisson
import poisson1 from "../assets/poissons/1.jpg";
import poisson2 from "../assets/poissons/2.jpg";
import poisson3 from "../assets/poissons/3.jpg";

// Types pour les aliments vegetarien
import vege1 from "../assets/vegetariens/1.jpg";
import vege2 from "../assets/vegetariens/2.jpg";
import vege3 from "../assets/vegetariens/3.jpg";
import vege4 from "../assets/vegetariens/4.jpg";
import vege5 from "../assets/vegetariens/5.jpg";

// Types pour les aliments boisson
import boisson1 from "../assets/boissons/1.jpg";
import boisson2 from "../assets/boissons/2.jpg";
import boisson3 from "../assets/boissons/3.jpg";
import boisson4 from "../assets/boissons/4.jpg";

// Types pour les aliments vin
import vin1 from "../assets/vins/1.jpg";
import vin2 from "../assets/vins/2.jpg";
import vin3 from "../assets/vins/3.jpg";
import vin4 from "../assets/vins/4.jpg";
import vin5 from "../assets/vins/5.jpg";

// Types pour les aliments pizza
import pizza1 from "../assets/pizzas/1.jpg";
import pizza2 from "../assets/pizzas/2.jpg";
import pizza3 from "../assets/pizzas/3.jpg";
import pizza4 from "../assets/pizzas/4.jpg";

// Types pour les aliments dessert
import dessert1 from "../assets/desserts/1.jpg";
import dessert2 from "../assets/desserts/2.jpg";
import dessert3 from "../assets/desserts/3.jpg";
import dessert4 from "../assets/desserts/4.jpg";

// Types pour les aliments entree
import entree1 from "../assets/entrees/1.jpg";
import entree2 from "../assets/entrees/2.jpg";
import entree3 from "../assets/entrees/3.jpg";
import entree4 from "../assets/entrees/4.jpg";


export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  packageId: string;
  available: boolean;
  preparationTime: number; // en minutes
  ingredients: string[];
  allergens: string[];
  calories?: number;
  isPopular?: boolean;
  isNew?: boolean;
}

// Données simulées des aliments par catégorie
export const foods: Food[] = [
  // BOISSONS
  {
    id: "boi1",
    name: "Steak de Bœuf Grillé",
    description: "Steak de bœuf tendre grillé à la perfection, servi avec des légumes de saison",
    price: 8500,
    image: boisson1,
    category: "Viande",
    packageId: "boissons",
    available: true,
    preparationTime: 25,
    ingredients: ["Bœuf", "Huile d'olive", "Thym", "Ail", "Poivre", "Sel"],
    allergens: [],
    calories: 450,
    isPopular: true
  },
  {
    id: "boi2", 
    name: "Poulet Rôti aux Herbes",
    description: "Demi-poulet rôti aux herbes de Provence, accompagné de pommes de terre",
    price: 6500,
    image: boisson2,
    category: "Viande",
    packageId: "boissons",
    available: true,
    preparationTime: 30,
    ingredients: ["Poulet", "Herbes de Provence", "Pommes de terre", "Beurre"],
    allergens: ["Lait"],
    calories: 380,
    isPopular: true
  },
  {
    id: "boi3",
    name: "Côtes d'Agneau",
    description: "Côtes d'agneau grillées avec une sauce à la menthe",
    price: 12000,
    image: boisson3,
    category: "Viande",
    packageId: "boissons",
    available: true,
    preparationTime: 20,
    ingredients: ["Agneau", "Menthe", "Ail", "Huile d'olive"],
    allergens: [],
    calories: 520,
    isNew: true
  },
  {
    id: "boi4",
    name: "Porc au Caramel",
    description: "Porc braisé au caramel, spécialité de la maison",
    price: 7500,
    image: boisson4,
    category: "Viande",
    packageId: "boissons", 
    available: true,
    preparationTime: 35,
    ingredients: ["Porc", "Sucre roux", "Sauce soja", "Gingembre"],
    allergens: ["Soja"],
    calories: 410
  },
  // ENTREE
  {
    id: "en1",
    name: "Steak de Bœuf Grillé",
    description: "Steak de bœuf tendre grillé à la perfection, servi avec des légumes de saison",
    price: 8500,
    image: entree1,
    category: "Entrées",
    packageId: "entrees",
    available: true,
    preparationTime: 25,
    ingredients: ["Bœuf", "Huile d'olive", "Thym", "Ail", "Poivre", "Sel"],
    allergens: [],
    calories: 450,
    isPopular: true
  },
  {
    id: "en2", 
    name: "Poulet Rôti aux Herbes",
    description: "Demi-poulet rôti aux herbes de Provence, accompagné de pommes de terre",
    price: 6500,
    image: entree2,
    category: "Entrées",
    packageId: "entrees",
    available: true,
    preparationTime: 30,
    ingredients: ["Poulet", "Herbes de Provence", "Pommes de terre", "Beurre"],
    allergens: ["Lait"],
    calories: 380,
    isPopular: true
  },
  {
    id: "en3",
    name: "Côtes d'Agneau",
    description: "Côtes d'agneau grillées avec une sauce à la menthe",
    price: 12000,
    image: entree3,
    category: "Entrées",
    packageId: "entrees",
    available: true,
    preparationTime: 20,
    ingredients: ["Agneau", "Menthe", "Ail", "Huile d'olive"],
    allergens: [],
    calories: 520,
    isNew: true
  },
  {
    id: "en4",
    name: "Porc au Caramel",
    description: "Porc braisé au caramel, spécialité de la maison",
    price: 7500,
    image: entree4,
    category: "Entrées",
    packageId: "entrees", 
    available: true,
    preparationTime: 35,
    ingredients: ["Porc", "Sucre roux", "Sauce soja", "Gingembre"],
    allergens: ["Soja"],
    calories: 410
  },
  // PIZZA
  {
    id: "pi1",
    name: "Steak de Bœuf Grillé",
    description: "Steak de bœuf tendre grillé à la perfection, servi avec des légumes de saison",
    price: 8500,
    image: pizza1,
    category: "Pizzas",
    packageId: "pizzas",
    available: true,
    preparationTime: 25,
    ingredients: ["Bœuf", "Huile d'olive", "Thym", "Ail", "Poivre", "Sel"],
    allergens: [],
    calories: 450,
    isPopular: true
  },
  {
    id: "pi2", 
    name: "Poulet Rôti aux Herbes",
    description: "Demi-poulet rôti aux herbes de Provence, accompagné de pommes de terre",
    price: 6500,
    image: pizza2,
    category: "pizzas",
    packageId: "pizzas",
    available: true,
    preparationTime: 30,
    ingredients: ["Poulet", "Herbes de Provence", "Pommes de terre", "Beurre"],
    allergens: ["Lait"],
    calories: 380,
    isPopular: true
  },
  {
    id: "pi3",
    name: "Côtes d'Agneau",
    description: "Côtes d'agneau grillées avec une sauce à la menthe",
    price: 12000,
    image: pizza3,
    category: "pizzas",
    packageId: "pizzas",
    available: true,
    preparationTime: 20,
    ingredients: ["Agneau", "Menthe", "Ail", "Huile d'olive"],
    allergens: [],
    calories: 520,
    isNew: true
  },
  {
    id: "pi4",
    name: "Porc au Caramel",
    description: "Porc braisé au caramel, spécialité de la maison",
    price: 7500,
    image: pizza4,
    category: "pizzas",
    packageId: "pizzas", 
    available: true,
    preparationTime: 35,
    ingredients: ["Porc", "Sucre roux", "Sauce soja", "Gingembre"],
    allergens: ["Soja"],
    calories: 410
  },

  // VIANDES
  {
    id: "v1",
    name: "Steak de Bœuf Grillé",
    description: "Steak de bœuf tendre grillé à la perfection, servi avec des légumes de saison",
    price: 8500,
    image: beefImg4,
    category: "Viande",
    packageId: "viandes",
    available: true,
    preparationTime: 25,
    ingredients: ["Bœuf", "Huile d'olive", "Thym", "Ail", "Poivre", "Sel"],
    allergens: [],
    calories: 450,
    isPopular: true
  },
  {
    id: "v2", 
    name: "Poulet Rôti aux Herbes",
    description: "Demi-poulet rôti aux herbes de Provence, accompagné de pommes de terre",
    price: 6500,
    image: beefImg1,
    category: "Viande",
    packageId: "viandes",
    available: true,
    preparationTime: 30,
    ingredients: ["Poulet", "Herbes de Provence", "Pommes de terre", "Beurre"],
    allergens: ["Lait"],
    calories: 380,
    isPopular: true
  },
  {
    id: "v3",
    name: "Côtes d'Agneau",
    description: "Côtes d'agneau grillées avec une sauce à la menthe",
    price: 12000,
    image: beefImg3,
    category: "Viande",
    packageId: "viandes",
    available: true,
    preparationTime: 20,
    ingredients: ["Agneau", "Menthe", "Ail", "Huile d'olive"],
    allergens: [],
    calories: 520,
    isNew: true
  },
  {
    id: "v4",
    name: "Porc au Caramel",
    description: "Porc braisé au caramel, spécialité de la maison",
    price: 7500,
    image: beefImg2,
    category: "Viande",
    packageId: "viandes", 
    available: true,
    preparationTime: 35,
    ingredients: ["Porc", "Sucre roux", "Sauce soja", "Gingembre"],
    allergens: ["Soja"],
    calories: 410
  },

  // POISSONS
  {
    id: "poi1",
    name: "Saumon Grillé",
    description: "Pavé de saumon grillé avec sauce hollandaise",
    price: 9500,
    image: poisson3,
    category: "Poisson",
    packageId: "fruits-mer",
    available: true,
    preparationTime: 15,
    ingredients: ["Saumon", "Beurre", "Citron", "Œufs", "Vinaigre"],
    allergens: ["Poisson", "Œufs", "Lait"],
    calories: 380,
    isPopular: true
  },
  {
    id: "poi2",
    name: "Dorade aux Légumes",
    description: "Dorade royale cuite au four avec légumes méditerranéens",
    price: 8000,
    image: poisson2,
    category: "Poisson", 
    packageId: "fruits-mer",
    available: true,
    preparationTime: 25,
    ingredients: ["Dorade", "Courgettes", "Tomates", "Olives", "Thym"],
    allergens: ["Poisson"],
    calories: 320
  },
  {
    id: "poi3",
    name: "Crevettes à l'Ail",
    description: "Grosses crevettes sautées à l'ail et au persil",
    price: 11000,
    image: poisson1,
    category: "Poisson",
    packageId: "fruits-mer",
    available: true,
    preparationTime: 10,
    ingredients: ["Crevettes", "Ail", "Persil", "Huile d'olive", "Vin blanc"],
    allergens: ["Crustacés"],
    calories: 280,
    isNew: true
  },

  // LÉGUMES
  {
    id: "le1",
    name: "Ratatouille Provençale",
    description: "Mélange de légumes du soleil mijotés aux herbes",
    price: 4500,
    image: vege1,
    category: "Légume",
    packageId: "vegetarien",
    available: true,
    preparationTime: 20,
    ingredients: ["Aubergines", "Courgettes", "Tomates", "Poivrons", "Oignons"],
    allergens: [],
    calories: 180,
    isPopular: true
  },
  {
    id: "le2",
    name: "Gratin de Légumes",
    description: "Gratin de légumes de saison gratinés au fromage",
    price: 5500,
    image: vege2,
    category: "Légume",
    packageId: "vegetarien",
    available: true,
    preparationTime: 30,
    ingredients: ["Pommes de terre", "Brocolis", "Fromage", "Crème", "Muscade"],
    allergens: ["Lait"],
    calories: 250
  },
  {
    id: "le3",
    name: "Ratatouille Provençale",
    description: "Mélange de légumes du soleil mijotés aux herbes",
    price: 4500,
    image: vege3,
    category: "Légume",
    packageId: "vegetarien",
    available: true,
    preparationTime: 20,
    ingredients: ["Aubergines", "Courgettes", "Tomates", "Poivrons", "Oignons"],
    allergens: [],
    calories: 180,
    isPopular: true
  },
  {
    id: "le4",
    name: "Gratin de Légumes",
    description: "Gratin de légumes de saison gratinés au fromage",
    price: 5500,
    image: vege4,
    category: "Légume",
    packageId: "vegetarien",
    available: true,
    preparationTime: 30,
    ingredients: ["Pommes de terre", "Brocolis", "Fromage", "Crème", "Muscade"],
    allergens: ["Lait"],
    calories: 250
  },
  {
    id: "le5",
    name: "Ratatouille Provençale",
    description: "Mélange de légumes du soleil mijotés aux herbes",
    price: 4500,
    image: vege5,
    category: "Légume",
    packageId: "vegetarien",
    available: true,
    preparationTime: 20,
    ingredients: ["Aubergines", "Courgettes", "Tomates", "Poivrons", "Oignons"],
    allergens: [],
    calories: 180,
    isPopular: true
  },
  // VINS
  {
    id: "vin1",
    name: "Ratatouille Provençale",
    description: "Mélange de légumes du soleil mijotés aux herbes",
    price: 4500,
    image: vin1,
    category: "Carte des vins",
    packageId: "vins",
    available: true,
    preparationTime: 20,
    ingredients: ["Aubergines", "Courgettes", "Tomates", "Poivrons", "Oignons"],
    allergens: [],
    calories: 180,
    isPopular: true
  },
  {
    id: "vin2",
    name: "Gratin de Légumes",
    description: "Gratin de légumes de saison gratinés au fromage",
    price: 5500,
    image: vin2,
    category: "Carte des vins",
    packageId: "vins",
    available: true,
    preparationTime: 30,
    ingredients: ["Pommes de terre", "Brocolis", "Fromage", "Crème", "Muscade"],
    allergens: ["Lait"],
    calories: 250
  },
  {
    id: "vin3",
    name: "Ratatouille Provençale",
    description: "Mélange de légumes du soleil mijotés aux herbes",
    price: 4500,
    image: vin3,
    category: "Carte des vins",
    packageId: "vins",
    available: true,
    preparationTime: 20,
    ingredients: ["Aubergines", "Courgettes", "Tomates", "Poivrons", "Oignons"],
    allergens: [],
    calories: 180,
    isPopular: true
  },
  {
    id: "vin4",
    name: "Gratin de Légumes",
    description: "Gratin de légumes de saison gratinés au fromage",
    price: 5500,
    image: vin4,
    category: "Carte des vins",
    packageId: "vins",
    available: true,
    preparationTime: 30,
    ingredients: ["Pommes de terre", "Brocolis", "Fromage", "Crème", "Muscade"],
    allergens: ["Lait"],
    calories: 250
  },
  {
    id: "vin5",
    name: "Ratatouille Provençale",
    description: "Mélange de légumes du soleil mijotés aux herbes",
    price: 4500,
    image: vin5,
    category: "Carte des vins",
    packageId: "vins",
    available: true,
    preparationTime: 20,
    ingredients: ["Aubergines", "Courgettes", "Tomates", "Poivrons", "Oignons"],
    allergens: [],
    calories: 180,
    isPopular: true
  },

  // DESSERTS
  {
    id: "des1",
    name: "Tiramisu Maison",
    description: "Tiramisu traditionnel préparé selon notre recette secrète",
    price: 3500,
    image: dessert1,
    category: "Dessert",
    packageId: "desserts",
    available: true,
    preparationTime: 5,
    ingredients: ["Mascarpone", "Œufs", "Café", "Biscuits", "Cacao"],
    allergens: ["Lait", "Œufs", "Gluten"],
    calories: 320,
    isPopular: true
  },
  {
    id: "des2",
    name: "Tarte aux Fruits",
    description: "Tarte aux fruits de saison avec crème pâtissière",
    price: 3000,
    image: dessert2,
    category: "Dessert",
    packageId: "desserts", 
    available: true,
    preparationTime: 5,
    ingredients: ["Pâte brisée", "Crème pâtissière", "Fruits de saison"],
    allergens: ["Gluten", "Lait", "Œufs"],
    calories: 280
  },
  {
    id: "des3",
    name: "Tiramisu Maison",
    description: "Tiramisu traditionnel préparé selon notre recette secrète",
    price: 3500,
    image: dessert3,
    category: "Dessert",
    packageId: "desserts",
    available: true,
    preparationTime: 5,
    ingredients: ["Mascarpone", "Œufs", "Café", "Biscuits", "Cacao"],
    allergens: ["Lait", "Œufs", "Gluten"],
    calories: 320,
    isPopular: true
  },
  {
    id: "des4",
    name: "Tarte aux Fruits",
    description: "Tarte aux fruits de saison avec crème pâtissière",
    price: 3000,
    image: dessert4,
    category: "Dessert",
    packageId: "desserts", 
    available: true,
    preparationTime: 5,
    ingredients: ["Pâte brisée", "Crème pâtissière", "Fruits de saison"],
    allergens: ["Gluten", "Lait", "Œufs"],
    calories: 280
  }
];

// Existing utility functions (getFoodsByPackage, getFoodById, searchFoods) remain unchanged
export const getFoodsByPackage = (packageId: string): Food[] =>
  foods.filter(f => f.packageId === packageId && f.available);

export const getFoodById = (id: string): Food | undefined =>
  foods.find(f => f.id === id);

export const searchFoods = (query: string, packageId?: string): Food[] => {
  const list = packageId
    ? foods.filter(f => f.packageId === packageId)
    : foods;
  return list.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.description.toLowerCase().includes(query.toLowerCase()) ||
    f.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
  );
};
