import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, X, ChefHat } from "lucide-react";
import { Meal } from "../types";

interface CartProps {
  cart: { meal: Meal; quantity: number }[];
  setActiveTab: (tab: string) => void;
  removeFromCart: (mealId: string) => void;
  cartTotal: number;
  handleCheckout: () => void;
  orderNumber: string | null;
  setOrderNumber: (orderNumber: string | null) => void;
}

export function Cart({
  cart,
  setActiveTab,
  removeFromCart,
  cartTotal,
  handleCheckout,
  orderNumber,
  setOrderNumber
}: CartProps) {
  return (
    <motion.div key="cart" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.meal.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <img src={item.meal.image} alt={item.meal.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{item.meal.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">${item.meal.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => removeFromCart(item.meal.id)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 transition-colors"><X size={18} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm h-fit space-y-6">
          <h3 className="font-bold text-lg">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Tax (5%)</span>
              <span className="font-bold">${(cartTotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-indigo-600 font-bold">${(cartTotal * 1.05).toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            Checkout Now
          </button>
        </div>
      </div>

      <AnimatePresence>
        {orderNumber && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                <ChefHat size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Confirmed!</h2>
                <p className="text-slate-500 dark:text-slate-400">Your meal is being prepared.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Order Number</p>
                <p className="text-4xl font-mono font-bold text-indigo-600">#{orderNumber}</p>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setOrderNumber(null);
                    setActiveTab("order-history");
                  }}
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none"
                >
                  View Order History
                </button>
                <button 
                  onClick={() => setOrderNumber(null)}
                  className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
