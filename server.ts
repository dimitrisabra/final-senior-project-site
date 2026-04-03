import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import "dotenv/config";
import { db, initDb } from "./src/db";

const MEALS = [
  {
    id: "m1",
    name: "BBQ Chicken Pizza",
    description: "Tangy BBQ sauce, grilled chicken, red onions, and cilantro.",
    price: 12.50,
    category: "Meals",
    calories: 850,
    ingredients: ["Chicken", "BBQ Sauce", "Cheese", "Onions"],
    image: "/meals/1.jpg",
    tags: ["Spicy"]
  },
  {
    id: "m2",
    name: "Beef Burger with Fries",
    description: "Juicy beef patty with fresh lettuce, tomato, and a side of crispy fries.",
    price: 11.00,
    category: "Meals",
    calories: 950,
    ingredients: ["Beef", "Bun", "Potato", "Lettuce"],
    image: "/meals/2.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m3",
    name: "Beef Stir Fry with Rice",
    description: "Tender beef strips sautéed with fresh vegetables in a savory soy-based sauce.",
    price: 13.00,
    category: "Meals",
    calories: 650,
    ingredients: ["Beef", "Rice", "Vegetables", "Soy Sauce"],
    image: "/meals/3.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m4",
    name: "Beef Tacos",
    description: "Three soft corn tortillas filled with seasoned ground beef, fresh salsa, and cheese.",
    price: 10.50,
    category: "Meals",
    calories: 550,
    ingredients: ["Beef", "Tortilla", "Salsa", "Cheese"],
    image: "/meals/4.jpg",
    tags: ["Spicy"]
  },
  {
    id: "m5",
    name: "Chicken Alfredo Pasta",
    description: "Creamy fettuccine alfredo topped with grilled chicken breast and parmesan.",
    price: 14.00,
    category: "Meals",
    calories: 880,
    ingredients: ["Chicken", "Pasta", "Cream", "Parmesan"],
    image: "/meals/5.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m6",
    name: "Chicken Curry with Rice",
    description: "A fragrant and spicy chicken curry served with fluffy basmati rice.",
    price: 12.00,
    category: "Meals",
    calories: 720,
    ingredients: ["Chicken", "Rice", "Curry Spices", "Coconut Milk"],
    image: "/meals/6.jpg",
    tags: ["Spicy"]
  },
  {
    id: "m7",
    name: "Chicken Parmesan with Pasta",
    description: "Breaded chicken breast topped with marinara and melted mozzarella over spaghetti.",
    price: 13.50,
    category: "Meals",
    calories: 820,
    ingredients: ["Chicken", "Pasta", "Marinara", "Mozzarella"],
    image: "/meals/7.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m8",
    name: "Chicken Shawarma Plate",
    description: "Marinated chicken shawarma served with hummus, salad, and pita bread.",
    price: 12.50,
    category: "Meals",
    calories: 680,
    ingredients: ["Chicken", "Hummus", "Pita", "Salad"],
    image: "/meals/8.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m9",
    name: "Grilled Chicken with Rice",
    description: "Simple and healthy grilled chicken breast served with seasoned rice.",
    price: 11.50,
    category: "Meals",
    calories: 580,
    ingredients: ["Chicken", "Rice", "Herbs"],
    image: "/meals/9.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m10",
    name: "Grilled Salmon with Quinoa",
    description: "Perfectly grilled salmon fillet served over a bed of nutritious quinoa.",
    price: 15.50,
    category: "Meals",
    calories: 520,
    ingredients: ["Salmon", "Quinoa", "Lemon", "Asparagus"],
    image: "/meals/10.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m11",
    name: "Lamb Kafta with Rice",
    description: "Spiced ground lamb skewers grilled and served with aromatic rice.",
    price: 14.50,
    category: "Meals",
    calories: 750,
    ingredients: ["Lamb", "Rice", "Spices", "Tahini"],
    image: "/meals/11.jpg",
    tags: ["Spicy"]
  },
  {
    id: "m12",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomato sauce, mozzarella cheese, and basil leaves.",
    price: 10.00,
    category: "Meals",
    calories: 700,
    ingredients: ["Tomato Sauce", "Mozzarella", "Basil"],
    image: "/meals/12.jpg",
    tags: ["Vegetarian"]
  },
  {
    id: "m13",
    name: "Mushroom Risotto",
    description: "Creamy Italian rice dish cooked with a variety of fresh mushrooms and parmesan.",
    price: 13.00,
    category: "Meals",
    calories: 620,
    ingredients: ["Rice", "Mushrooms", "Parmesan", "White Wine"],
    image: "/meals/13.jpg",
    tags: ["Vegetarian"]
  },
  {
    id: "m14",
    name: "Pepperoni Pizza",
    description: "A crowd favorite topped with spicy pepperoni and gooey mozzarella.",
    price: 11.50,
    category: "Meals",
    calories: 800,
    ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce"],
    image: "/meals/14.jpg",
    tags: ["Spicy"]
  },
  {
    id: "m15",
    name: "Seafood",
    description: "A fresh selection of seasonal seafood prepared with garlic and herbs.",
    price: 16.50,
    category: "Meals",
    calories: 480,
    ingredients: ["Shrimp", "Mussels", "Garlic", "Herbs"],
    image: "/meals/15.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m16",
    name: "Spaghetti Bolognese",
    description: "Traditional Italian meat sauce served over al dente spaghetti.",
    price: 12.00,
    category: "Meals",
    calories: 750,
    ingredients: ["Pasta", "Beef", "Tomato", "Herbs"],
    image: "/meals/16.jpg",
    tags: ["Healthy"]
  },
  {
    id: "m17",
    name: "Vegetable Pasta Primavera",
    description: "A light pasta dish loaded with fresh seasonal vegetables and olive oil.",
    price: 11.00,
    category: "Meals",
    calories: 550,
    ingredients: ["Pasta", "Vegetables", "Olive Oil", "Garlic"],
    image: "/meals/17.jpg",
    tags: ["Vegetarian", "Healthy", "Vegan"]
  },
  {
    id: "m18",
    name: "Veggie Burger",
    description: "A delicious plant-based patty with all the classic burger toppings.",
    price: 10.50,
    category: "Meals",
    calories: 600,
    ingredients: ["Plant-based Patty", "Bun", "Lettuce", "Tomato"],
    image: "/meals/18.jpg",
    tags: ["Vegetarian", "Healthy", "Vegan"]
  },
  {
    id: "m19",
    name: "Cheese Manakish",
    description: "Traditional Lebanese flatbread topped with a blend of melted cheeses.",
    price: 6.50,
    category: "Meals",
    calories: 450,
    ingredients: ["Flatbread", "Cheese Blend"],
    image: "/meals/19.jpg",
    tags: ["Vegetarian"]
  },
  {
    id: "m20",
    name: "Zaatar Manakish",
    description: "Traditional Lebanese flatbread topped with a savory mix of zaatar and olive oil.",
    price: 5.50,
    category: "Meals",
    calories: 400,
    ingredients: ["Flatbread", "Zaatar", "Olive Oil"],
    image: "/meals/20.jpg",
    tags: ["Vegetarian", "Healthy", "Vegan"]
  },
  {
    id: "b1",
    name: "Apple Juice",
    description: "100% pure pressed apple juice.",
    price: 3.50,
    category: "Beverages",
    calories: 120,
    ingredients: ["Apples"],
    image: "/beverage/apple_juice.png",
    tags: ["Fresh", "Natural"]
  },
  {
    id: "b2",
    name: "Coffee",
    description: "Freshly brewed premium coffee beans.",
    price: 2.50,
    category: "Beverages",
    calories: 5,
    ingredients: ["Coffee Beans", "Water"],
    image: "/beverage/coffee.png",
    tags: ["Hot", "Caffeine"]
  },
  {
    id: "b3",
    name: "Coke",
    description: "Classic refreshing cola.",
    price: 2.00,
    category: "Beverages",
    calories: 140,
    ingredients: ["Carbonated Water", "Sugar", "Caramel Color"],
    image: "/beverage/coke.png",
    tags: ["Cold", "Classic"]
  },
  {
    id: "b4",
    name: "Green Tea",
    description: "Light and healthy steamed green tea.",
    price: 2.50,
    category: "Beverages",
    calories: 0,
    ingredients: ["Green Tea Leaves", "Water"],
    image: "/beverage/green_tea.png",
    tags: ["Hot", "Healthy"]
  },
  {
    id: "b5",
    name: "Iced Tea",
    description: "Chilled black tea with a hint of lemon.",
    price: 2.75,
    category: "Beverages",
    calories: 80,
    ingredients: ["Black Tea", "Lemon", "Sugar"],
    image: "/beverage/iced_tea.png",
    tags: ["Cold", "Refreshing"]
  },
  {
    id: "b6",
    name: "Lemonade",
    description: "Zesty and refreshing homemade lemonade.",
    price: 3.00,
    category: "Beverages",
    calories: 120,
    ingredients: ["Lemon", "Water", "Sugar"],
    image: "/beverage/lemonade.png",
    tags: ["Cold", "Zesty"]
  },
  {
    id: "b7",
    name: "Milkshake",
    description: "Creamy and thick vanilla milkshake.",
    price: 4.50,
    category: "Beverages",
    calories: 450,
    ingredients: ["Milk", "Ice Cream", "Vanilla"],
    image: "/beverage/milkshake.png",
    tags: ["Cold", "Sweet"]
  },
  {
    id: "b8",
    name: "Orange Juice",
    description: "Freshly squeezed oranges.",
    price: 3.50,
    category: "Beverages",
    calories: 110,
    ingredients: ["Oranges"],
    image: "/beverage/orange_juice.png",
    tags: ["Fresh", "Vitamin C"]
  },
  {
    id: "b9",
    name: "Pepsi",
    description: "Refreshing cola flavor.",
    price: 2.00,
    category: "Beverages",
    calories: 150,
    ingredients: ["Carbonated Water", "Sugar", "Caramel Color"],
    image: "/beverage/pepsi.png",
    tags: ["Cold", "Classic"]
  },
  {
    id: "b10",
    name: "Water",
    description: "Pure chilled spring water.",
    price: 1.50,
    category: "Beverages",
    calories: 0,
    ingredients: ["Water"],
    image: "/beverage/water.png",
    tags: ["Cold", "Hydrating"]
  },
  {
    id: "s1",
    name: "Candy",
    description: "A variety of sweet and chewy treats.",
    price: 1.50,
    category: "Snacks",
    calories: 200,
    ingredients: ["Sugar", "Gelatin", "Flavoring"],
    image: "/snacks/candy.png",
    tags: ["Sweet", "Chewy"]
  },
  {
    id: "s2",
    name: "Chips",
    description: "Crispy and salty potato chips.",
    price: 2.00,
    category: "Snacks",
    calories: 300,
    ingredients: ["Potato", "Oil", "Salt"],
    image: "/snacks/chips.png",
    tags: ["Salty", "Crunchy"]
  },
  {
    id: "s3",
    name: "Chocolate Bar",
    description: "Rich and smooth milk chocolate.",
    price: 1.75,
    category: "Snacks",
    calories: 250,
    ingredients: ["Cocoa", "Milk", "Sugar"],
    image: "/snacks/chocolate_bar.png",
    tags: ["Sweet", "Chocolate"]
  },
  {
    id: "s4",
    name: "Cookies",
    description: "Freshly baked chocolate chip cookies.",
    price: 2.50,
    category: "Snacks",
    calories: 350,
    ingredients: ["Flour", "Sugar", "Chocolate Chips"],
    image: "/snacks/cookies.png",
    tags: ["Sweet", "Baked"]
  },
  {
    id: "s5",
    name: "Fruit Chips",
    description: "Naturally sweet dried fruit slices.",
    price: 3.00,
    category: "Snacks",
    calories: 150,
    ingredients: ["Mixed Fruits"],
    image: "/snacks/fruit_chips.png",
    tags: ["Healthy", "Sweet"]
  },
  {
    id: "s6",
    name: "Granola Bar",
    description: "Healthy mix of oats, nuts, and honey.",
    price: 2.00,
    category: "Snacks",
    calories: 180,
    ingredients: ["Oats", "Nuts", "Honey"],
    image: "/snacks/granola_bar.png",
    tags: ["Healthy", "Crunchy"]
  },
  {
    id: "s7",
    name: "Nachos",
    description: "Crunchy tortilla chips with cheese sauce.",
    price: 4.00,
    category: "Snacks",
    calories: 500,
    ingredients: ["Tortilla Chips", "Cheese Sauce"],
    image: "/snacks/nachos.png",
    tags: ["Salty", "Cheesy"]
  },
  {
    id: "s8",
    name: "Popcorn",
    description: "Light and fluffy buttered popcorn.",
    price: 3.00,
    category: "Snacks",
    calories: 200,
    ingredients: ["Corn", "Butter", "Salt"],
    image: "/snacks/popcorn.png",
    tags: ["Light", "Salty"]
  },
  {
    id: "s9",
    name: "Pretzels",
    description: "Classic salty twisted pretzels.",
    price: 2.00,
    category: "Snacks",
    calories: 150,
    ingredients: ["Flour", "Salt"],
    image: "/snacks/pretzels.png",
    tags: ["Salty", "Crunchy"]
  },
  {
    id: "s10",
    name: "Trail Mix",
    description: "A nutritious blend of nuts, seeds, and dried fruit.",
    price: 3.50,
    category: "Snacks",
    calories: 250,
    ingredients: ["Nuts", "Seeds", "Dried Fruit"],
    image: "/snacks/trail_mix.png",
    tags: ["Healthy", "Nutritious"]
  },
  {
    id: "d1",
    name: "Apple Pie",
    description: "Classic warm apple pie with a flaky crust.",
    price: 4.50,
    category: "Desserts",
    calories: 400,
    ingredients: ["Apples", "Flour", "Sugar", "Cinnamon"],
    image: "/dessert/apple_pie.png",
    tags: ["Sweet", "Classic"]
  },
  {
    id: "d2",
    name: "Brownie",
    description: "Fudgy and rich chocolate brownie.",
    price: 3.50,
    category: "Desserts",
    calories: 350,
    ingredients: ["Cocoa", "Sugar", "Flour", "Eggs"],
    image: "/dessert/brownie.png",
    tags: ["Sweet", "Chocolate"]
  },
  {
    id: "d3",
    name: "Cheesecake",
    description: "Creamy New York style cheesecake.",
    price: 5.00,
    category: "Desserts",
    calories: 450,
    ingredients: ["Cream Cheese", "Sugar", "Graham Cracker"],
    image: "/dessert/cheesecake.png",
    tags: ["Sweet", "Creamy"]
  },
  {
    id: "d4",
    name: "Chocolate Cake",
    description: "Moist layers of dark chocolate cake.",
    price: 4.50,
    category: "Desserts",
    calories: 500,
    ingredients: ["Cocoa", "Flour", "Sugar"],
    image: "/dessert/chocolate_cake.png",
    tags: ["Sweet", "Chocolate"]
  },
  {
    id: "d5",
    name: "Cupcake",
    description: "Sweet vanilla cupcake with colorful frosting.",
    price: 2.50,
    category: "Desserts",
    calories: 250,
    ingredients: ["Flour", "Sugar", "Frosting"],
    image: "/dessert/cupcake.png",
    tags: ["Sweet", "Small"]
  },
  {
    id: "d6",
    name: "Donut",
    description: "Glazed donut with a soft and airy texture.",
    price: 2.00,
    category: "Desserts",
    calories: 300,
    ingredients: ["Flour", "Sugar", "Glaze"],
    image: "/dessert/donut.png",
    tags: ["Sweet", "Fried"]
  },
  {
    id: "d7",
    name: "Fruit Salad",
    description: "A fresh mix of seasonal fruits.",
    price: 4.00,
    category: "Desserts",
    calories: 150,
    ingredients: ["Mixed Fruits"],
    image: "/dessert/fruit_salad.png",
    tags: ["Healthy", "Fresh"]
  },
  {
    id: "d8",
    name: "Ice Cream",
    description: "Two scoops of premium vanilla ice cream.",
    price: 3.50,
    category: "Desserts",
    calories: 300,
    ingredients: ["Milk", "Cream", "Sugar", "Vanilla"],
    image: "/dessert/ice_cream.png",
    tags: ["Sweet", "Cold"]
  },
  {
    id: "d9",
    name: "Pancake",
    description: "Fluffy pancakes served with maple syrup.",
    price: 5.00,
    category: "Desserts",
    calories: 450,
    ingredients: ["Flour", "Milk", "Eggs", "Maple Syrup"],
    image: "/dessert/pancake.png",
    tags: ["Sweet", "Breakfast"]
  },
  {
    id: "d10",
    name: "Waffle",
    description: "Golden crispy waffle with fresh berries.",
    price: 5.50,
    category: "Desserts",
    calories: 480,
    ingredients: ["Flour", "Milk", "Eggs", "Berries"],
    image: "/dessert/waffle.png",
    tags: ["Sweet", "Crispy"]
  }
];

async function startServer() {
  await initDb();

  const parsePort = (value: string | undefined, fallback: number) => {
    const port = Number(value);
    return Number.isFinite(port) && port > 0 ? port : fallback;
  };
  
  const count = await db('meals').count('id as count').first();
  const mealCount = Number(count?.count ?? 0);
  if (mealCount === 0) {
    for (const meal of MEALS) {
      await db('meals').insert({
        ...meal,
        ingredients: JSON.stringify(meal.ingredients),
        tags: JSON.stringify(meal.tags),
      });
    }
  }

  const app = express();
  const PORT = parsePort(process.env.PORT, 3000);
  const HMR_PORT = parsePort(process.env.HMR_PORT, 24678);

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/meals", async (_req, res) => {
    try {
      const meals = await db('meals').select('*');
      const formattedMeals = meals.map(meal => ({
        ...meal,
        ingredients: JSON.parse(meal.ingredients),
        tags: JSON.parse(meal.tags),
      }));
      res.json(formattedMeals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meals" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, subject, message } = req.body;

      const senderEmail = process.env.CONTACT_SENDER_EMAIL;
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
      const appPassword = process.env.CONTACT_APP_PASSWORD;

      if (!senderEmail || !recipientEmail || !appPassword) {
        res.status(500).json({
          error: "Contact form email settings are missing on the server.",
        });
        return;
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: senderEmail,
          pass: appPassword,
        },
      });

      const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: `New Contact Form Submission: ${subject || "No Subject"}`,
        text: `Name: ${firstName || ""} ${lastName || ""}\n\nMessage:\n${message || ""}`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  app.get("/api/orders/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await db('orders')
        .where({ userId })
        .orderBy('date', 'desc');
      
      const formattedOrders = orders.map(order => ({
        ...order,
        items: JSON.parse(order.items),
      }));
      
      res.json(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { id, userId, items, total, date, status } = req.body;
      
      await db('orders').insert({
        id,
        userId,
        items: JSON.stringify(items),
        total,
        date,
        status,
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/admin/orders", async (_req, res) => {
    try {
      const orders = await db('orders').orderBy('date', 'desc');
      const formattedOrders = orders.map(order => ({
        ...order,
        items: JSON.parse(order.items),
      }));
      res.json(formattedOrders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all orders" });
    }
  });

  app.patch("/api/admin/orders/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await db('orders').where({ id }).update({ status });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  app.post("/api/admin/meals", async (req, res) => {
    try {
      const meal = req.body;
      await db('meals').insert({
        ...meal,
        ingredients: JSON.stringify(meal.ingredients),
        tags: JSON.stringify(meal.tags),
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to create meal" });
    }
  });

  app.put("/api/admin/meals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const meal = req.body;
      await db('meals').where({ id }).update({
        ...meal,
        ingredients: JSON.stringify(meal.ingredients),
        tags: JSON.stringify(meal.tags),
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update meal" });
    }
  });

  app.delete("/api/admin/meals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db('meals').where({ id }).delete();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete meal" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { port: HMR_PORT } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
