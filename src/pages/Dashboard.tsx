import React from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight, Sparkles, Package } from "lucide-react";
import { MealCard } from "../components/MealCard";
import { Meal, Order } from "../types";

interface DashboardProps {
  todaysSpecial?: Meal;
  meals: Meal[];
  addToCart: (meal: Meal) => void;
  setActiveTab: (tab: any) => void;
  ratings: Record<string, number>;
  handleRate: (mealId: string, rating: number) => void;
  favorites: string[];
  toggleFavorite: (mealId: string) => void;
  orders: Order[];
}

export function Dashboard({
  todaysSpecial,
  meals,
  addToCart,
  setActiveTab,
  ratings,
  handleRate,
  favorites,
  toggleFavorite,
  orders
}: DashboardProps) {
  const mealOnly = meals.filter(meal => meal.category === "Meals");
  const recommendedSource = mealOnly.length > 0 ? mealOnly : meals;
  const recentOrder = orders.length > 0 ? orders[0] : null;

  return (
    <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Student! 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Browse meals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {todaysSpecial && (
          <div className="lg:col-span-2 relative h-[400px] rounded-3xl overflow-hidden shadow-xl group">
            <img 
              src={todaysSpecial.image} 
              alt="Special" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Today's Special</span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                  <Clock size={10} /> 11:00 AM - 2:00 PM
                </span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{todaysSpecial.name}</h2>
              <p className="text-slate-200 max-w-lg mb-6 line-clamp-2">{todaysSpecial.description}</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => addToCart(todaysSpecial)}
                  className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2"
                >
                  Add to Cart <ArrowRight size={18} />
                </button>
                <span className="text-2xl font-bold text-white">${todaysSpecial.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {recentOrder ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 h-[190px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white">Recent Order</h4>
                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                  {recentOrder.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
                  <Package size={20} className="text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate dark:text-white">#{recentOrder.id}</p>
                  <p className="text-xs text-slate-500 truncate">{recentOrder.items.length} items • ${recentOrder.total.toFixed(2)}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab("order-history")}
                className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700"
              >
                Track Order
              </button>
            </div>
          ) : (
            <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden h-[190px]">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="space-y-4 relative">
                <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-xl font-bold leading-tight">AI Recommendation</h3>
              </div>
              <button 
                onClick={() => setActiveTab("ai-chat")}
                className="w-full py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors relative text-sm"
              >
                Ask Assistant
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 h-[186px]">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white">Live Status</h4>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> Live
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Wait Time</span>
                <span className="font-bold text-slate-900 dark:text-white">~8 mins</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[30%]" />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Cafeteria Capacity</span>
                <span className="font-bold text-slate-900 dark:text-white">42% Full</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[42%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recommended for You</h3>
          <button onClick={() => setActiveTab("meals")} className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...recommendedSource].sort(() => 0.5 - Math.random()).slice(0, 4).map(meal => (
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
      </div>
    </motion.div>
  );
}
