import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter } from "lucide-react";
import { MealCard } from "../components/MealCard";
import { Meal } from "../types";

interface MealsProps {
  meals: Meal[];
  addToCart: (meal: Meal) => void;
  ratings: Record<string, number>;
  handleRate: (mealId: string, rating: number) => void;
  favorites: string[];
  toggleFavorite: (mealId: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  searchQuery: string;
  dietaryPreference: string;
}

export function Meals({
  meals,
  addToCart,
  ratings,
  handleRate,
  favorites,
  toggleFavorite,
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  dietaryPreference
}: MealsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const mainMeals = meals.filter(m => {
    if (m.category !== "Meals") return false;
    
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (dietaryPreference !== "All" && !m.tags.includes(dietaryPreference)) return false;

    if (selectedFilter === "All") return true;
    return m.tags.includes(selectedFilter);
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Main Meals Menu</h1>
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Filter size={16} className="text-slate-400 dark:text-slate-500" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{selectedFilter === "All" ? "Filter" : selectedFilter}</span>
          </button>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50"
              >
                {["All", "Healthy", "Spicy", "Vegetarian"].map(filter => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedFilter === filter ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    {filter}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mainMeals.map(meal => (
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
