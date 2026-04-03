import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, MessageSquare, Send } from "lucide-react";
import { ChatMessage, Meal } from "../types";
import { chatWithAI } from "../services/aiService";

interface AIChatProps {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatInput: string;
  setChatInput: (input: string) => void;
  isChatLoading: boolean;
  setIsChatLoading: (loading: boolean) => void;
  handleSendMessage: () => void;
  suggestedQuestions: string[];
  meals: Meal[];
}

export function AIChat({
  chatMessages,
  setChatMessages,
  chatInput,
  setChatInput,
  isChatLoading,
  setIsChatLoading,
  handleSendMessage,
  suggestedQuestions,
  meals
}: AIChatProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <motion.div key="ai-chat" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-indigo-600 text-white flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-2xl"><Sparkles size={24} /></div>
        <div>
          <h2 className="text-xl font-bold">Smart Assistant</h2>
          <p className="text-indigo-100 text-xs">Ask me anything about our cafeteria!</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
        {chatMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="opacity-50 space-y-4">
              <MessageSquare size={48} className="text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-slate-500 dark:text-slate-400 max-w-xs">Start a conversation to get help with nutrition, menu details, or recommendations.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {suggestedQuestions.map((q, i) => (
                <button 
                  key={i}
                  onClick={async () => {
                    setChatInput(q);
                    const userMessage: ChatMessage = { role: "user", text: q };
                    setChatMessages(prev => [...prev, userMessage]);
                    setChatInput("");
                    setIsChatLoading(true);
                    try {
                      const response = await chatWithAI(q, meals);
                      setChatMessages(prev => [...prev, { role: "model", text: response || "I'm sorry, I couldn't process that." }]);
                    } catch (error) {
                      console.error("Chat error:", error);
                      setChatMessages(prev => [...prev, { role: "model", text: "Error connecting to the AI assistant." }]);
                    } finally {
                      setIsChatLoading(false);
                    }
                  }}
                  className="p-3 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-200 dark:shadow-none" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm"}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isChatLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input 
            type="text" 
            placeholder="Ask about today's special, calories, or vegan options..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!chatInput.trim() || isChatLoading}
            className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
