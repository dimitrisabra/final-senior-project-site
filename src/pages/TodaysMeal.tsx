import React from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight, Zap, Heart, Info } from "lucide-react";
import { Meal } from "../types";

interface TodaysMealProps {
  todaysSpecial?: Meal;
  addToCart: (meal: Meal) => void;
}

export function TodaysMeal({ todaysSpecial, addToCart }: TodaysMealProps) {
  if (!todaysSpecial) {
    return null;
  }
  return (
    <motion.div key="todays-meal" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
        <img 
          src={todaysSpecial.image} 
          alt="Today's Meal" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">Today's Special</span>
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-2">
              <Clock size={14} /> Available Now
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">{todaysSpecial.name}</h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">{todaysSpecial.description}</p>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => addToCart(todaysSpecial)}
              className="px-10 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 shadow-xl flex items-center gap-3"
            >
              Order Now <ArrowRight size={20} />
            </button>
            <div className="flex flex-col">
              <span className="text-slate-400 text-sm font-medium">Price</span>
              <span className="text-3xl font-bold text-white">${todaysSpecial.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-xl text-orange-600 w-fit mb-4"><Zap size={24} /></div>
          <h3 className="font-bold text-lg mb-1 dark:text-white">Nutrition Facts</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{todaysSpecial.calories} calories per serving</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-xl text-indigo-600 w-fit mb-4"><Heart size={24} /></div>
          <h3 className="font-bold text-lg mb-1 dark:text-white">Dietary Info</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{todaysSpecial.tags.join(", ")}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-xl text-blue-600 w-fit mb-4"><Info size={24} /></div>
          <h3 className="font-bold text-lg mb-1 dark:text-white">Ingredients</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{todaysSpecial.ingredients.slice(0, 3).join(", ")}...</p>
        </div>
      </div>
    </motion.div>
  );
}
