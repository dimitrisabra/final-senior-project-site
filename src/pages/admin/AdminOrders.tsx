import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ShoppingBag
} from "lucide-react";
import { Order } from "../../types";

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await fetch("/api/admin/orders");
    if (!response.ok) return;
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (response.ok) {
      fetchOrders();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100 dark:shadow-none">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold dark:text-white">All Orders</h1>
            <p className="text-slate-500 dark:text-slate-400">Track and update student orders.</p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs dark:text-white">#{order.id}</td>
                    <td className="px-6 py-4 text-sm dark:text-slate-300">{order.userId}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {order.items.map(i => `${i.quantity}x ${i.meal.name}`).join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-indigo-600">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${
                        order.status === "Completed" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" :
                        order.status === "Cancelled" ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" :
                        "bg-amber-50 text-amber-600 dark:bg-amber-900/20"
                      }`}>
                        {order.status === "Completed" ? <CheckCircle size={12} /> : 
                         order.status === "Cancelled" ? <XCircle size={12} /> : 
                         <Clock size={12} />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(order.id, "Completed")}
                          className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                          title="Mark as Completed"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                          className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                          title="Cancel Order"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
