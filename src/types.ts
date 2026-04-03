export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Meals" | "Snacks" | "Beverages" | "Desserts";
  calories: number;
  ingredients: string[];
  image: string;
  tags: string[];
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface OrderItem {
  meal: Meal;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "Pending" | "Completed" | "Cancelled";
}
