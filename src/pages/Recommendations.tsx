import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { MealCard } from "../components/MealCard";
import { Meal } from "../types";

interface RecommendationsProps {
  recFilters: {
    spicy: boolean;
    vegetarian: boolean;
    healthy: boolean;
    maxCalories: number;
  };
  setRecFilters: React.Dispatch<React.SetStateAction<{
    spicy: boolean;
    vegetarian: boolean;
    healthy: boolean;
    maxCalories: number;
  }>>;
  handleGetRecommendation: () => void;
  recommendedMeals: Meal[];
  addToCart: (meal: Meal) => void;
  ratings: Record<string, number>;
  handleRate: (mealId: string, rating: number) => void;
  favorites: string[];
  toggleFavorite: (mealId: string) => void;
}

export function Recommendations({
  recFilters,
  setRecFilters,
  handleGetRecommendation,
  recommendedMeals,
  addToCart,
  ratings,
  handleRate,
  favorites,
  toggleFavorite
}: RecommendationsProps) {
  return (
    <motion.div key="recommend" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">AI Meal Planner</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Personalized nutrition advice based on our current menu.</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Preferences</label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={recFilters.spicy}
                  onChange={(e) => setRecFilters(prev => ({ ...prev, spicy: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">Spicy Options</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={recFilters.vegetarian}
                  onChange={(e) => setRecFilters(prev => ({ ...prev, vegetarian: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">Vegetarian Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={recFilters.healthy}
                  onChange={(e) => setRecFilters(prev => ({ ...prev, healthy: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">Healthy Choice</span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Max Calories</label>
              <span className="text-indigo-600 font-bold">{recFilters.maxCalories} kcal</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="1200" 
              step="50"
              value={recFilters.maxCalories}
              onChange={(e) => setRecFilters(prev => ({ ...prev, maxCalories: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
              <span>200 kcal</span>
              <span>1200 kcal</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleGetRecommendation}
          className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-3 text-lg"
        >
          <Sparkles size={24} />
          Get AI Recommendations
        </button>
      </div>
      {recommendedMeals.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h3 className="text-xl font-bold dark:text-white">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMeals.map(meal => {
              const activeTags = [];
              if (recFilters.spicy) activeTags.push("Spicy");
              if (recFilters.vegetarian) activeTags.push("Vegetarian");
              if (recFilters.healthy) activeTags.push("Healthy");
              return (
              <MealCard 
                key={meal.id} 
                meal={meal} 
                onOrder={() => addToCart(meal)}
                rating={ratings[meal.id] || 0}
                onRate={(r) => handleRate(meal.id, r)}
                isFavorite={favorites.includes(meal.id)}
                onToggleFavorite={() => toggleFavorite(meal.id)}
                activeTags={activeTags}
              />
            )})}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
