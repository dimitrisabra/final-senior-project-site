import React from "react";
import { motion } from "motion/react";
import { MealCard } from "../components/MealCard";
import { Meal } from "../types";

interface DessertsProps {
  meals: Meal[];
  addToCart: (meal: Meal) => void;
  ratings: Record<string, number>;
  handleRate: (mealId: string, rating: number) => void;
  favorites: string[];
  toggleFavorite: (mealId: string) => void;
  searchQuery: string;
}

export function Desserts({
  meals,
  addToCart,
  ratings,
  handleRate,
  favorites,
  toggleFavorite,
  searchQuery
}: DessertsProps) {
  const dessertMeals = meals.filter(m => {
    if (m.category !== "Desserts") return false;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Desserts Menu</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dessertMeals.map(meal => (
          <MealCard 
            key={meal.id} 
            meal={meal} 
            onOrder={() => addToCart(meal)} 
            rating={ratings[meal.id] || 0}
            onRate={(r) => handleRate(meal.id, r)}
            isFavorite={favorites.includes(meal.id)}
            onToggleFavorite={() => toggleFavorite(meal.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
