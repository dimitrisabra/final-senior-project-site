import React from "react";
import { motion } from "motion/react";
import { Code2 } from "lucide-react";

export function About() {
  return (
    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
          Cafeteria <span className="text-indigo-600">Platform</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl">
          A modern, smart cafeteria management system designed to streamline the dining experience. 
          Our platform provides real-time menu updates, personalized recommendations, and a seamless ordering process for students and staff alike.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600">
            <Code2 size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Architecture</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
          This application is built using TypeScript and JavaScript, with a modern full-stack web architecture to ensure high performance, scalability, and an excellent user experience. The core technologies include:
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Vite", "SQL Database", "Framer Motion", "Lucide Icons"].map((tech) => (
            <li key={tech} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
