import React from "react";
import { AdminCategoryPage } from "./AdminCategoryPage";
import { Meal } from "../../types";

export function AdminBeverages({ meals, onMealsUpdate }: { meals: Meal[], onMealsUpdate: () => void }) {
  return <AdminCategoryPage meals={meals} onMealsUpdate={onMealsUpdate} category="Beverages" />;
}
