import React from "react";
import { motion } from "motion/react";

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  dietaryPreference: string;
  setDietaryPreference: (pref: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

export function Settings({ 
  darkMode, 
  setDarkMode,
  dietaryPreference,
  setDietaryPreference,
  phoneNumber,
  setPhoneNumber
}: SettingsProps) {
  return (
    <motion.div key="settings" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold dark:text-white">App Settings</h2>
          <p className="text-slate-500 dark:text-slate-400">Customize your smart cafeteria experience</p>
        </div>
        
        <div className="p-8 space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold dark:text-white">Dark Mode</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-colors relative ${darkMode ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${darkMode ? "left-7" : "left-1"}`} />
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold dark:text-white">Dietary Preference</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Filter the meals menu based on your preference</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["All", "Vegetarian", "Spicy", "Healthy"].map((pref) => (
                <button
                  key={pref}
                  onClick={() => setDietaryPreference(pref)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    dietaryPreference === pref
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300"
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold dark:text-white">Phone Number</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">For order notifications and delivery</p>
            </div>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white font-medium"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
