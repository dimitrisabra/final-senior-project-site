function localOfflineAssistant(message: string, meals: any[]) {
  const msg = message.toLowerCase();
  const detectCategory = () => {
    if (msg.includes("dessert") || msg.includes("sweet")) {
      return { category: "Desserts" as const, label: "desserts" };
    }
    if (msg.includes("beverage") || msg.includes("drink")) {
      return { category: "Beverages" as const, label: "beverages" };
    }
    if (msg.includes("snack")) {
      return { category: "Snacks" as const, label: "snacks" };
    }
    if (msg.includes("meal") || msg.includes("lunch") || msg.includes("dinner") || msg.includes("entree") || msg.includes("main")) {
      return { category: "Meals" as const, label: "meals" };
    }
    return null;
  };
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! I am your Cafeteria Assistant. How can I help you today? I can tell you about our menu, prices, and nutritional information.";
  }

  if (msg.includes("today's special") || msg.includes("special") || msg.includes("today's meal")) {
    const hour = new Date().getHours();
    const mealsOnly = meals.filter(m => m.category === "Meals");
    const special = mealsOnly.length > 0 ? mealsOnly[hour % mealsOnly.length] : meals[0];
    if (!special) return "I'm sorry, I couldn't find today's special.";
    return `Today's special is the ${special.name}. It's a ${special.description} and costs $${special.price.toFixed(2)}.`;
  }

  const priceMatch = msg.match(/(?:under|less than|below|at most|max(?:imum)?)\s*(?:\$)?\s*(\d+(?:\.\d+)?)/);
  if (priceMatch) {
    const maxPrice = parseFloat(priceMatch[1]);
    const category = detectCategory();
    const pool = category ? meals.filter(m => m.category === category.category) : meals;
    const affordableItems = pool.filter(m => m.price <= maxPrice);
    if (affordableItems.length > 0) {
      const label = category ? category.label : "items";
      return `I found ${affordableItems.length} ${label} under $${maxPrice}: ${affordableItems.map(i => `${i.name} ($${i.price.toFixed(2)})`).join(", ")}.`;
    } else {
      const label = category ? category.label : "items";
      const cheapest = [...pool].sort((a, b) => a.price - b.price)[0];
      if (!cheapest) {
        return `I'm sorry, I couldn't find any ${label} to compare prices.`;
      }
      return `I'm sorry, we don't have any ${label} under $${maxPrice}. Our cheapest ${label.slice(0, -1)} is the ${cheapest.name} at $${cheapest.price.toFixed(2)}.`;
    }
  }
  
  if (msg.includes("vegan")) {
    const items = meals.filter(m => m.tags.includes("Vegan"));
    if (items.length > 0) {
      return `I found ${items.length} vegan options for you: ${items.map(i => i.name).join(", ")}.`;
    } else {
      const vegetarianItems = meals.filter(m => m.tags.includes("Vegetarian"));
      return `I found 0 vegan options, but I do have these vegetarian options: ${vegetarianItems.map(i => i.name).join(", ")}.`;
    }
  }

  if (msg.includes("vegetarian")) {
    const items = meals.filter(m => m.tags.includes("Vegetarian"));
    if (items.length > 0) {
      return `There are ${items.length} vegetarian choices available: ${items.map(i => i.name).join(", ")}.`;
    } else {
      return "I'm sorry, I couldn't find any vegetarian options.";
    }
  }

  if (msg.includes("calories") || msg.includes("kcal") || msg.includes("healthy")) {
    const healthy = meals.filter(m => m.calories < 500);
    if (healthy.length < 2) return "I recommend checking our salad options for healthy choices.";
    return `For a healthy, low-calorie choice, try the ${healthy[0].name} (${healthy[0].calories} kcal) or the ${healthy[1].name} (${healthy[1].calories} kcal).`;
  }

  if (msg.includes("dessert") || msg.includes("sweet")) {
    const items = meals.filter(m => m.category === "Desserts");
    return `For dessert, we have: ${items.map(i => i.name).join(", ")}. Which one would you like to know more about?`;
  }

  if (msg.includes("beverage") || msg.includes("drink")) {
    const items = meals.filter(m => m.category === "Beverages");
    return `We have a variety of beverages: ${items.map(i => i.name).join(", ")}.`;
  }

  if (msg.includes("snack")) {
    const items = meals.filter(m => m.category === "Snacks");
    return `Looking for a quick bite? Try our snacks: ${items.map(i => i.name).join(", ")}.`;
  }

  if (msg.includes("menu") || msg.includes("meal list")) {
    const categories = ["Meals", "Snacks", "Beverages", "Desserts"];
    let response = "Here is our full menu:";
    for (const cat of categories) {
      const items = meals.filter(m => m.category === cat);
      response += `\n\n${cat}: ${items.map(i => i.name).join(", ")}`;
    }
    return response;
  }

  if (msg.includes("meal")) {
    const items = meals.filter(m => m.category === "Meals");
    return `Our main meals include: ${items.map(i => i.name).join(", ")}.`;
  }

  if (msg.includes("price") || msg.includes("cost") || msg.includes("cheap") || msg.includes("expensive")) {
    const sorted = [...meals].sort((a, b) => a.price - b.price);
    if (msg.includes("expensive")) {
      const expensive = sorted.slice(-2).reverse();
      return `Our premium options are the ${expensive.map(m => `${m.name} ($${m.price.toFixed(2)})`).join(" and ")}.`;
    }
    const cheap = sorted.slice(0, 3);
    return `Our most budget-friendly options are ${cheap.map(m => `${m.name} ($${m.price.toFixed(2)})`).join(", ")}.`;
  }

  const found = meals.find(m => msg.includes(m.name.toLowerCase()));
  if (found) {
    return `${found.name} (${found.category})\n- Price: $${found.price.toFixed(2)}\n- Calories: ${found.calories} kcal\n- Tags: ${found.tags.join(", ")}\n- Description: ${found.description}`;
  }

  return "I'm sorry, I couldn't find an answer to that. You can ask me about meal prices, calories, dietary tags, or specific meal names.";
}

export async function chatWithAI(message: string, meals: any[]) {
  return localOfflineAssistant(message, meals);
}
