import React from "react";
import { Utensils } from "lucide-react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  variant?: "light" | "dark";
}

export function Logo({ className = "", iconSize = 24, textSize = "text-xl", variant = "dark" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className={`
          ${isLight ? "bg-white/20 text-white" : "bg-indigo-600 text-white"} 
          p-2 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center
        `}
      >
        <Utensils size={iconSize} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`
          ${textSize} font-display font-black tracking-tighter 
          ${isLight ? "text-white" : "text-slate-900 dark:text-white"}
        `}>
          Smart<span className={isLight ? "text-indigo-200" : "text-indigo-600"}>.</span>
        </span>
        <span className={`
          text-[10px] font-bold uppercase tracking-[0.2em] 
          ${isLight ? "text-indigo-100/70" : "text-slate-400"}
        `}>
          Cafeteria
        </span>
      </div>
    </div>
  );
}
