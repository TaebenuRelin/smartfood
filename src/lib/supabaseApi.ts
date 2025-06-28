import supabase from './supabaseClient';

// Types for Supabase tables
export interface Food {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  cholesterol: number;
  fiber: number;
  sugar: number;
  sodium: number;
  serving_size: number;
  serving_unit: string;
  category: string;
  image_url: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  gender: string;
  birthdate: string;
}

export interface NutritionLog {
  id: string;
  user_id: string;
  food_id: string;
  date: string;
  quantity: number;
}

export interface MealPlanPreference {
  id: string;
  user_id: string;
  goal: string;
  daily_calorie_target: number;
  dietary_restrictions: string;
  meal_timings: object;
}

export interface Reminder {
  id: string;
  user_id: string;
  type: string;
  time: string;
  active: boolean;
}

export interface MotivasiHarian {
  id: string;
  pesan: string;
  aktif: boolean;
}

// Food API functions
export const getFoods = async (): Promise<Food[]> => {
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('is_available', true)
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch foods: ${error.message}`);
  }

  return data || [];
};

export const getFoodById = async (id: string): Promise<Food> => {
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Food not found: ${error.message}`);
  }

  return data;
};

export const createFood = async (foodData: Omit<Food, 'id' | 'created_at' | 'updated_at'>): Promise<Food> => {
  const { data, error } = await supabase
    .from('foods')
    .insert([foodData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create food: ${error.message}`);
  }

  return data;
};

export const updateFood = async (id: string, foodData: Partial<Food>): Promise<Food> => {
  const { data, error } = await supabase
    .from('foods')
    .update({ ...foodData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update food: ${error.message}`);
  }

  return data;
};

export const deleteFood = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('foods')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete food: ${error.message}`);
  }
};

// User API functions
export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }

  return data || [];
};

export const getUserById = async (id: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`User not found: ${error.message}`);
  }

  return data;
};

// Nutrition Log API functions
export const getNutritionLogs = async (userId?: string): Promise<NutritionLog[]> => {
  let query = supabase
    .from('nutrition_logs')
    .select(`
      *,
      foods (name, calories, protein, carbohydrates, fats)
    `)
    .order('date', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch nutrition logs: ${error.message}`);
  }

  return data || [];
};

export const addNutritionLog = async (logData: Omit<NutritionLog, 'id'>): Promise<NutritionLog> => {
  const { data, error } = await supabase
    .from('nutrition_logs')
    .insert([logData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add nutrition log: ${error.message}`);
  }

  return data;
};

// Meal Plan Preferences API functions
export const getMealPlanPreferences = async (userId: string): Promise<MealPlanPreference[]> => {
  const { data, error } = await supabase
    .from('meal_plan_preferences')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to fetch meal plan preferences: ${error.message}`);
  }

  return data || [];
};

export const createMealPlanPreference = async (preferenceData: Omit<MealPlanPreference, 'id'>): Promise<MealPlanPreference> => {
  const { data, error } = await supabase
    .from('meal_plan_preferences')
    .insert([preferenceData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create meal plan preference: ${error.message}`);
  }

  return data;
};

// Reminders API functions
export const getReminders = async (userId: string): Promise<Reminder[]> => {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .order('time');

  if (error) {
    throw new Error(`Failed to fetch reminders: ${error.message}`);
  }

  return data || [];
};

export const createReminder = async (reminderData: Omit<Reminder, 'id'>): Promise<Reminder> => {
  const { data, error } = await supabase
    .from('reminders')
    .insert([reminderData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create reminder: ${error.message}`);
  }

  return data;
};

// Motivasi Harian API functions
export const getMotivasiHarian = async (): Promise<MotivasiHarian[]> => {
  const { data, error } = await supabase
    .from('motivasi_harian')
    .select('*')
    .eq('aktif', true)
    .order('id');

  if (error) {
    throw new Error(`Failed to fetch motivasi harian: ${error.message}`);
  }

  return data || [];
};

export const getRandomMotivasi = async (): Promise<MotivasiHarian> => {
  const { data, error } = await supabase
    .from('motivasi_harian')
    .select('*')
    .eq('aktif', true)
    .limit(1)
    .order('id', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch random motivasi: ${error.message}`);
  }

  return data?.[0] || { id: '1', pesan: 'Tetap semangat!', aktif: true };
}; 