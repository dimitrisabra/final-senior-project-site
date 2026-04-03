import { Meal } from '../types';

export async function fetchMeals(): Promise<Meal[]> {
  try {
    const response = await fetch('/api/meals');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}
