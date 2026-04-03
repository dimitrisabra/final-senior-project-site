import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Utensils, 
  Save,
  X
} from "lucide-react";
import { Meal } from "../../types";

interface AdminCategoryPageProps {
  meals: Meal[];
  onMealsUpdate: () => void;
  category: "Meals" | "Snacks" | "Beverages" | "Desserts";
}

export function AdminCategoryPage({ meals, onMealsUpdate, category }: AdminCategoryPageProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Meal>>({});

  const filteredMeals = meals.filter(meal => meal.category === category);

  const handleDeleteMeal = async (id: string) => {
    const response = await fetch(`/api/admin/meals/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      onMealsUpdate();
    }
  };

  const handleSaveMeal = async () => {
    const url = isAdding ? "/api/admin/meals" : `/api/admin/meals/${editForm.id}`;
    const method = isAdding ? "POST" : "PUT";
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    });
    
    if (response.ok) {
      setIsEditing(null);
      setIsAdding(false);
      setEditForm({});
      onMealsUpdate();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100 dark:shadow-none">
            <Utensils size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Manage {category}</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your {category.toLowerCase()} menu items.</p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">{category} Management</h2>
          <button 
            onClick={() => {
              setIsAdding(true);
              setEditForm({
                id: `m${Date.now()}`,
                name: "",
                description: "",
                price: 0,
                category: category,
                calories: 0,
                ingredients: [],
                image: "https://picsum.photos/seed/food/800/600",
                tags: []
              });
            }}
            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Plus size={18} /> Add New {category.slice(0, -1)}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <div key={meal.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
              <div className="h-40 relative">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => {
                      setIsEditing(meal.id);
                      setEditForm(meal);
                    }}
                    className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl text-indigo-600 hover:bg-white transition-colors shadow-sm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl text-rose-600 hover:bg-white transition-colors shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg dark:text-white">{meal.name}</h3>
                  <span className="text-indigo-600 font-bold">${meal.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{meal.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest">{meal.category}</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest">{meal.calories} kcal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {(isEditing || isAdding) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">{isAdding ? "Add New Item" : "Edit Item"}</h2>
                <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input 
                    type="text" 
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                  <input 
                    type="number" 
                    value={editForm.price || 0}
                    onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white h-24 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={editForm.category || category}
                    disabled
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white opacity-60 cursor-not-allowed"
                  >
                    <option value={category}>{category}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Calories</label>
                  <input 
                    type="number" 
                    value={editForm.calories || 0}
                    onChange={(e) => setEditForm({...editForm, calories: parseInt(e.target.value)})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                  <input 
                    type="text" 
                    value={editForm.image || ""}
                    onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => { setIsEditing(null); setIsAdding(false); }}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveMeal}
                  className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2"
                >
                  <Save size={20} /> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
