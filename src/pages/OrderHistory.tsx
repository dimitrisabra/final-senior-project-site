import React from "react";
import { motion } from "motion/react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { Order } from "../types";

export function OrderHistory({ orders }: { orders: Order[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8 py-8"
    >
      <div className="flex items-center gap-4">
        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-2xl text-indigo-600">
          <Clock size={24} />
        </div>
        <h1 className="text-3xl font-bold dark:text-white">Order History</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                <p className="font-mono text-sm dark:text-white">#{order.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</p>
                <p className="text-sm dark:text-white">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</p>
                <p className="text-sm font-bold text-indigo-600">${order.total.toFixed(2)}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
                order.status === "Completed" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" :
                order.status === "Cancelled" ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" :
                "bg-amber-50 text-amber-600 dark:bg-amber-900/20"
              }`}>
                {order.status === "Completed" ? <CheckCircle size={14} /> : 
                 order.status === "Cancelled" ? <XCircle size={14} /> : 
                 <Clock size={14} />}
                {order.status}
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                        {item.quantity}x
                      </div>
                      <p className="font-medium dark:text-white">{item.meal.name}</p>
                    </div>
                    <p className="text-sm text-slate-500">${(item.meal.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
