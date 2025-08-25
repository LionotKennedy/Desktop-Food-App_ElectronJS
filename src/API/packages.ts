
// src/data/packages.ts
import fishImg from "../assets/fruitMer.jpg"
import beefImg from "../assets/BeefLoin.jpg"
import saladImg from "../assets/vege.jpg"
import coffeeImg from "../assets/boi.jpg"
import wineImg from "../assets/alco.jpg"
import pizzaImg from "../assets/pizza.jpg"
import cookieImg from "../assets/cockie2.jpg"
import soupImg from "../assets/soup.jpg"

// import { useState, useCallback } from "react"

export interface Package {
  id: string
  name: string
  description: string
  image: string
  itemCount: number
}

export const packages: Package[] = [
  {
    id: "fruits-mer",
    name: "Fruits de mer",
    description: "Plateaux, poissons frais",
    image: fishImg,
    itemCount: 12,
  },
  {
    id: "viandes",
    name: "Viandes",
    description: "Grillades, plats traditionnels",
    image: beefImg,
    itemCount: 15,
  },
  {
    id: "vegetarien",
    name: "Végétarien",
    description: "Salades, légumes, bio",
    image: saladImg,
    itemCount: 8,
  },
  {
    id: "boissons",
    name: "Boissons",
    description: "Chaudes, froides, alcoolisées",
    image: coffeeImg,
    itemCount: 20,
  },
  {
    id: "vins",
    name: "Carte des vins",
    description: "Rouges, blancs, champagnes",
    image: wineImg,
    itemCount: 25,
  },
  {
    id: "pizzas",
    name: "Pizzas",
    description: "Artisanales, pâte fraîche",
    image: pizzaImg,
    itemCount: 10,
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Pâtisseries, glaces, fruits",
    image: cookieImg,
    itemCount: 14,
  },
  {
    id: "entrees",
    name: "Entrées",
    description: "Soupes, amuse-bouches",
    image: soupImg,
    itemCount: 9,
  },
]

