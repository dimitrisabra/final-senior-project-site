import React from "react";
import { motion } from "motion/react";
import { Heart, Zap, Clock, ChevronRight } from "lucide-react";
import { Meal } from "../types";

export interface MealCardProps {
  meal: Meal;
  onOrder?: () => void;
  rating: number;
  onRate: (rating: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  key?: string | number;
  activeTags?: string[];
}

export function MealCard({ meal, onOrder, rating, onRate, isFavorite, onToggleFavorite, activeTags }: MealCardProps) {
  const displayTags = activeTags ? meal.tags.filter(tag => activeTags.includes(tag)) : meal.tags;
  return (
    <motion.div 
      layout
      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 group"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={meal.image || "https://picsum.photos/seed/meal/400/300"} 
          alt={meal.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`p-2 rounded-lg shadow-sm transition-colors backdrop-blur-sm ${isFavorite ? "bg-red-500 text-white" : "bg-white/90 dark:bg-slate-900/90 text-indigo-600 hover:text-red-500"}`}
          >
            <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">{meal.name}</h3>
          <span className="font-bold text-indigo-600 whitespace-nowrap">${meal.price.toFixed(2)}</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">{meal.description}</p>
        
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRate(star)}
              className={`transition-colors ${star <= rating ? "text-yellow-400" : "text-slate-200 dark:text-slate-700 hover:text-yellow-200"}`}
            >
              <Zap size={14} fill={star <= rating ? "currentColor" : "none"} />
            </button>
          ))}
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 ml-1">{rating > 0 ? `${rating}.0` : "No rating"}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {displayTags.map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-3 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[10px] font-medium">
            <Clock size={12} />
            <span>{meal.calories} kcal</span>
          </div>
          <button 
            onClick={onOrder}
            className="text-indigo-600 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all"
          >
            Add to Cart <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
