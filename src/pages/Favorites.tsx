import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { MealCard } from "../components/MealCard";
import { Meal } from "../types";

interface FavoritesProps {
  favorites: string[];
  setActiveTab: (tab: string) => void;
  addToCart: (meal: Meal) => void;
  ratings: Record<string, number>;
  handleRate: (mealId: string, rating: number) => void;
  toggleFavorite: (mealId: string) => void;
  meals: Meal[];
}

export function Favorites({
  favorites,
  setActiveTab,
  addToCart,
  ratings,
  handleRate,
  toggleFavorite,
  meals
}: FavoritesProps) {
  return (
    <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">My Favorites</h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">{favorites.length} items saved</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.filter(m => favorites.includes(m.id)).map(meal => (
          <MealCard 
            key={meal.id} 
            meal={meal} 
            onOrder={() => addToCart(meal)}
            rating={ratings[meal.id] || 0}
            onRate={(r) => handleRate(meal.id, r)}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(meal.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
