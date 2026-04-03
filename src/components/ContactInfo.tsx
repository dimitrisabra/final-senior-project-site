import React from "react";

export function ContactInfo({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl text-indigo-600">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{detail}</p>
      </div>
    </div>
  );
}
