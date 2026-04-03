import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Utensils, 
  MessageSquare, 
  Info, 
  Send, 
  X, 
  Sparkles, 
  Phone, 
  Search,
  LayoutDashboard,
  Coffee,
  IceCream,
  Apple,
  LogOut,
  Heart,
  Calendar,
  Clock,
  Settings as SettingsIcon,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { Meal, ChatMessage, Order } from "./types";
import { Logo } from "./components/Logo";
import { fetchMeals } from "./services/dbService";
import { chatWithAI } from "./services/aiService";
import { NavButton } from "./components/NavButton";
import { Dashboard } from "./pages/Dashboard";
import { Meals } from "./pages/Meals";
import { Snacks } from "./pages/Snacks";
import { Beverages } from "./pages/Beverages";
import { Desserts } from "./pages/Desserts";
import { Cart } from "./pages/Cart";
import { AIChat } from "./pages/AIChat";
import { Recommendations } from "./pages/Recommendations";
import { Favorites } from "./pages/Favorites";
import { TodaysMeal } from "./pages/TodaysMeal";
import { Settings } from "./pages/Settings";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { OrderHistory } from "./pages/OrderHistory";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminMeals } from "./pages/admin/AdminMeals";
import { AdminSnacks } from "./pages/admin/AdminSnacks";
import { AdminBeverages } from "./pages/admin/AdminBeverages";
import { AdminDesserts } from "./pages/admin/AdminDesserts";

type Page = "dashboard" | "meals" | "snacks" | "beverages" | "desserts" | "ai-chat" | "about" | "contact" | "recommend" | "cart" | "todays-meal" | "settings" | "favorites" | "order-history" | "admin-meals" | "admin-snacks" | "admin-beverages" | "admin-desserts" | "admin-orders";

const DEFAULT_STUDENT_ID = "123";
const DEFAULT_STUDENT_PASSWORD = "123";
const DEFAULT_ADMIN_PASSWORD = "123";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [userId, setUserId] = useState(DEFAULT_STUDENT_ID);
  const [password, setPassword] = useState(DEFAULT_STUDENT_PASSWORD);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Page>("dashboard");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [cart, setCart] = useState<{ meal: Meal, quantity: number }[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  
  useEffect(() => {
    async function init() {
      const data = await fetchMeals();
      setMeals(data);
    }
    init();
  }, []);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [recFilters, setRecFilters] = useState({
    spicy: false,
    vegetarian: false,
    healthy: false,
    maxCalories: 800
  });
  const [recommendedMeals, setRecommendedMeals] = useState<Meal[]>([]);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("dark-mode");
    return saved ? JSON.parse(saved) : false;
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("meal-favorites");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("meal-ratings");
    return saved ? JSON.parse(saved) : {};
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async (uid: string) => {
    const response = await fetch(`/api/orders/${uid}`);
    if (!response.ok) return;
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchOrders(userId);
    }
  }, [isLoggedIn, userId]);

  const [dietaryPreference, setDietaryPreference] = useState(() => {
    const saved = localStorage.getItem("dietary-preference");
    return saved || "All";
  });

  const [phoneNumber, setPhoneNumber] = useState(() => {
    const saved = localStorage.getItem("phone-number");
    return saved || "";
  });

  useEffect(() => {
    localStorage.setItem("dietary-preference", dietaryPreference);
  }, [dietaryPreference]);

  useEffect(() => {
    localStorage.setItem("phone-number", phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    localStorage.setItem("meal-ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("meal-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleFavorite = (mealId: string) => {
    setFavorites(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId) 
        : [...prev, mealId]
    );
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminMode) {
      if (password === DEFAULT_ADMIN_PASSWORD) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setActiveTab("admin-orders");
        setLoginError("");
      } else {
        setLoginError("Invalid Admin password.");
      }
    } else {
      if (userId === DEFAULT_STUDENT_ID && password === DEFAULT_STUDENT_PASSWORD) {
        setIsLoggedIn(true);
        setIsAdmin(false);
        setLoginError("");
      } else {
        setLoginError("Invalid Student ID or password.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsAdminMode(false);
    setUserId(DEFAULT_STUDENT_ID);
    setPassword(DEFAULT_STUDENT_PASSWORD);
    setLoginError("");
    setActiveTab("dashboard");
  };

  const handleToggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
    setUserId(DEFAULT_STUDENT_ID);
    setPassword(isAdminMode ? DEFAULT_STUDENT_PASSWORD : DEFAULT_ADMIN_PASSWORD);
    setLoginError("");
  };

  const handleRate = (mealId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [mealId]: rating }));
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { role: "user", text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await chatWithAI(userMessage.text, meals);
      setChatMessages(prev => [...prev, { role: "model", text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: "model", text: "Error connecting to the assistant." }]);
    } finally {
      setIsChatLoading(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleGetRecommendation = () => {
    const filtered = meals.filter(meal => {
      if (recFilters.spicy && !meal.tags.includes("Spicy")) return false;
      if (recFilters.vegetarian && !meal.tags.includes("Vegetarian")) return false;
      if (recFilters.healthy && !meal.tags.includes("Healthy")) return false;
      if (meal.calories > recFilters.maxCalories) return false;
      return true;
    });

    setRecommendedMeals(filtered);
  };

  const getTodaysSpecial = () => {
    const hour = new Date().getHours();
    const mealsOnly = meals.filter(m => m.category === "Meals");
    if (mealsOnly.length === 0) return meals[0];
    return mealsOnly[hour % mealsOnly.length];
  };

  const todaysSpecial = getTodaysSpecial();

  const suggestedQuestions = [
    "Show me today's meal",
    "Show me the menu",
    "What are your vegan options?",
    "What's for dessert?"
  ];

  const addToCart = (meal: Meal) => {
    setCart(prev => {
      const existing = prev.find(item => item.meal.id === meal.id);
      if (existing) {
        return prev.map(item => item.meal.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { meal, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setCart(prev => prev.filter(item => item.meal.id !== mealId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    const newOrder: Order = {
      id: num,
      userId: userId,
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: "Pending"
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder)
    });

    if (response.ok) {
      setOrderNumber(num);
      setCart([]);
      fetchOrders(userId);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans overflow-hidden relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 m-4 border border-slate-100">
          <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 rotate-12"><Utensils size={120} /></div>
              <div className="absolute bottom-10 right-10 -rotate-12"><Utensils size={120} /></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Coffee size={200} /></div>
            </div>
            
            <div className="relative z-10">
              <Logo variant="light" textSize="text-4xl" iconSize={32} className="mb-12" />
              
              <h1 className="text-8xl font-display font-black leading-[0.8] tracking-tighter">
                Smart <br />
                <span className="text-indigo-200 uppercase">Cafeteria</span>
              </h1>
            </div>
          </div>

          <div className="p-8 lg:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full space-y-10">
              <div className="space-y-2">
                <div className="lg:hidden mb-10">
                  <Logo textSize="text-2xl" iconSize={28} />
                </div>
                <h2 className="text-4xl font-display font-bold text-slate-900 tracking-tight">
                  {isAdminMode ? "Admin Login" : "Welcome back"}
                </h2>
                <p className="text-slate-500 font-medium">
                  {isAdminMode ? "Access the cafeteria management system." : "Please enter your student credentials to continue."}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {!isAdminMode && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Student ID</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="e.g. 2023001"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 font-medium"
                    />
                  </div>
                  {loginError && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"
                    >
                      <X size={14} /> {loginError}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-4">
                  <button 
                    type="submit"
                    className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isAdminMode ? "Login as Admin" : "Sign In to Dashboard"}
                    <ArrowRight size={18} />
                  </button>

                  <button 
                    type="button"
                    onClick={handleToggleAdminMode}
                    className="w-full py-4 text-indigo-600 font-bold text-sm hover:bg-indigo-50 rounded-2xl transition-all"
                  >
                    {isAdminMode ? "Back to Student Login" : "Login as Admin"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col md:flex-row transition-colors duration-300">
        <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen z-50">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <Logo textSize="text-lg" iconSize={20} />
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {isAdmin && (
              <>
                <div className="pt-2 pb-2 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Management</div>
                <NavButton active={activeTab === "admin-orders"} onClick={() => setActiveTab("admin-orders")} icon={<ShoppingBag size={18} />} label="All Orders" />
                <NavButton active={activeTab === "admin-meals"} onClick={() => setActiveTab("admin-meals")} icon={<Utensils size={18} />} label="Manage Meals" />
                <NavButton active={activeTab === "admin-snacks"} onClick={() => setActiveTab("admin-snacks")} icon={<Apple size={18} />} label="Manage Snacks" />
                <NavButton active={activeTab === "admin-beverages"} onClick={() => setActiveTab("admin-beverages")} icon={<Coffee size={18} />} label="Manage Beverages" />
                <NavButton active={activeTab === "admin-desserts"} onClick={() => setActiveTab("admin-desserts")} icon={<IceCream size={18} />} label="Manage Desserts" />
              </>
            )}
            {!isAdmin && (
              <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={<LayoutDashboard size={18} />} label="Dashboard" />
            )}
            <NavButton active={activeTab === "todays-meal"} onClick={() => setActiveTab("todays-meal")} icon={<Calendar size={18} />} label="Today's Meal" />
            
            {!isAdmin && (
              <>
                <div className="pt-4 pb-2 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Menu</div>
                <NavButton active={activeTab === "meals"} onClick={() => setActiveTab("meals")} icon={<Utensils size={18} />} label="Meals" />
                <NavButton active={activeTab === "snacks"} onClick={() => setActiveTab("snacks")} icon={<Apple size={18} />} label="Snacks" />
                <NavButton active={activeTab === "beverages"} onClick={() => setActiveTab("beverages")} icon={<Coffee size={18} />} label="Beverages" />
                <NavButton active={activeTab === "desserts"} onClick={() => setActiveTab("desserts")} icon={<IceCream size={18} />} label="Desserts" />
                
                <div className="pt-4 pb-2 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Orders</div>
                <NavButton active={activeTab === "cart"} onClick={() => setActiveTab("cart")} icon={
                  <div className="relative">
                    <Utensils size={18} />
                    {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
                  </div>
                } label="My Cart" />
                <NavButton active={activeTab === "order-history"} onClick={() => setActiveTab("order-history")} icon={<Clock size={18} />} label="Order History" />
                <NavButton active={activeTab === "favorites"} onClick={() => setActiveTab("favorites")} icon={<Heart size={18} />} label="Favorites" />
              </>
            )}
            
            <div className="pt-4 pb-2 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">AI Services</div>
            <NavButton active={activeTab === "ai-chat"} onClick={() => setActiveTab("ai-chat")} icon={<MessageSquare size={18} />} label="AI Chat" />
            <NavButton active={activeTab === "recommend"} onClick={() => setActiveTab("recommend")} icon={<Sparkles size={18} />} label="Recommendations" />
            
            <div className="pt-4 pb-2 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">System</div>
            <NavButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={<SettingsIcon size={18} />} label="Settings" />
            <NavButton active={activeTab === "about"} onClick={() => setActiveTab("about")} icon={<Info size={18} />} label="About" />
            <NavButton active={activeTab === "contact"} onClick={() => setActiveTab("contact")} icon={<Phone size={18} />} label="Contact" />
          </nav>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium text-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-lg capitalize dark:text-white">{activeTab.replace("-", " ")}</h2>
            </div>
            <div className="flex items-center gap-4">
              {["meals", "snacks", "beverages", "desserts"].includes(activeTab) && (
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 lg:w-64 dark:text-white"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-100 dark:border-indigo-800">
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {isAdmin ? "A" : "S"}
                </div>
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 hidden lg:block">
                  {isAdmin ? "Admin" : "Student"}
                </span>
              </div>
            </div>
          </header>

        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <Dashboard 
                todaysSpecial={todaysSpecial}
                meals={meals}
                addToCart={addToCart}
                setActiveTab={setActiveTab}
                ratings={ratings}
                handleRate={handleRate}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                orders={orders}
              />
            )}

            {activeTab === "meals" && (
              <Meals 
                meals={meals}
                addToCart={addToCart}
                ratings={ratings}
                handleRate={handleRate}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchQuery={searchQuery}
                dietaryPreference={dietaryPreference}
              />
            )}

            {activeTab === "snacks" && (
              <Snacks 
                meals={meals}
                addToCart={addToCart}
                ratings={ratings}
                handleRate={handleRate}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === "beverages" && (
              <Beverages 
                meals={meals}
                addToCart={addToCart}
                ratings={ratings}
                handleRate={handleRate}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === "desserts" && (
              <Desserts 
                meals={meals}
                addToCart={addToCart}
                ratings={ratings}
                handleRate={handleRate}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === "cart" && (
              <Cart 
                cart={cart}
                setActiveTab={setActiveTab}
                removeFromCart={removeFromCart}
                cartTotal={cartTotal}
                handleCheckout={handleCheckout}
                orderNumber={orderNumber}
                setOrderNumber={setOrderNumber}
              />
            )}

            {activeTab === "ai-chat" && (
              <AIChat 
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                isChatLoading={isChatLoading}
                setIsChatLoading={setIsChatLoading}
                handleSendMessage={handleSendMessage}
                suggestedQuestions={suggestedQuestions}
                meals={meals}
              />
            )}

            {activeTab === "recommend" && (
              <Recommendations 
                recFilters={recFilters}
                setRecFilters={setRecFilters}
                handleGetRecommendation={handleGetRecommendation}
                recommendedMeals={recommendedMeals}
                addToCart={addToCart}
                ratings={ratings}
                handleRate={handleRate}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            )}

            {activeTab === "favorites" && (
              <Favorites 
                favorites={favorites}
                setActiveTab={setActiveTab}
                addToCart={addToCart}
                ratings={ratings}
                handleRate={handleRate}
                toggleFavorite={toggleFavorite}
                meals={meals}
              />
            )}

            {activeTab === "todays-meal" && (
              <TodaysMeal 
                todaysSpecial={todaysSpecial}
                addToCart={addToCart}
              />
            )}

            {activeTab === "settings" && (
              <Settings 
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                dietaryPreference={dietaryPreference}
                setDietaryPreference={setDietaryPreference}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            )}

            {activeTab === "order-history" && (
              <OrderHistory 
                orders={orders}
              />
            )}

            {activeTab === "admin-orders" && isAdmin && (
              <AdminOrders />
            )}

            {activeTab === "admin-meals" && isAdmin && (
              <AdminMeals 
                meals={meals} 
                onMealsUpdate={async () => {
                  const data = await fetchMeals();
                  setMeals(data);
                }} 
              />
            )}

            {activeTab === "admin-snacks" && isAdmin && (
              <AdminSnacks 
                meals={meals} 
                onMealsUpdate={async () => {
                  const data = await fetchMeals();
                  setMeals(data);
                }} 
              />
            )}

            {activeTab === "admin-beverages" && isAdmin && (
              <AdminBeverages 
                meals={meals} 
                onMealsUpdate={async () => {
                  const data = await fetchMeals();
                  setMeals(data);
                }} 
              />
            )}

            {activeTab === "admin-desserts" && isAdmin && (
              <AdminDesserts 
                meals={meals} 
                onMealsUpdate={async () => {
                  const data = await fetchMeals();
                  setMeals(data);
                }} 
              />
            )}

            {activeTab === "about" && (
              <About />
            )}

            {activeTab === "contact" && (
              <Contact />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>

    <div className="fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {isFloatingChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            >
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg"><Sparkles size={18} /></div>
                  <div>
                    <h3 className="font-bold text-sm">Smart Assistant</h3>
                    <p className="text-[10px] text-indigo-100">Always here to help</p>
                  </div>
                </div>
                <button onClick={() => setIsFloatingChatOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <MessageSquare size={32} className="text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ask me about our menu, prices, or healthy options!</p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isChatLoading}
                    className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isFloatingChatOpen ? "bg-slate-900 text-white" : "bg-indigo-600 text-white"}`}
        >
          {isFloatingChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </div>
  );
}
