export type UserGoal = 'weight_loss' | 'maintenance' | 'muscle_gain';

export interface Meal {
  name: string;
  time: string;
  items: MealItem[];
  totalCalories: number;
}

export interface MealItem {
  name: string;
  calories: number;
  portion?: string;
}

export interface MealPlan {
  date: string;
  meals: Meal[];
  totalDailyCalories: number;
  userGoal: UserGoal;
}

export interface MealPlanPreferences {
  goal: UserGoal;
  dailyCalorieTarget: number;
  dietaryRestrictions?: string[];
  mealTimings?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
    snacks?: string[];
  };
} 