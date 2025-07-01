const API_BASE_URL = 'http://localhost:3000/api';

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  cholesterol: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export type ServingUnit = 'g' | 'ml' | 'piece' | 'portion';

export interface Food {
  _id: string;
  name: string;
  description: string;
  nutritionalInfo: NutritionalInfo;
  servingSize: number;
  servingUnit: ServingUnit;
  category: 'makanan' | 'minuman' | 'dessert' | 'snack';
  image: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFoodData {
  name: string;
  description: string;
  nutritionalInfo: NutritionalInfo;
  servingSize: number;
  servingUnit: ServingUnit;
  category: 'makanan' | 'minuman' | 'dessert' | 'snack';
  image?: string;
}

export interface UpdateFoodData extends Partial<CreateFoodData> {
  isAvailable?: boolean;
}

// Get all foods
export const getFoods = async (): Promise<Food[]> => {
  const response = await fetch(`${API_BASE_URL}/foods`);
  if (!response.ok) {
    throw new Error('Failed to fetch foods');
  }
  return response.json();
};

// Get single food by ID
export const getFoodById = async (id: string): Promise<Food> => {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`);
  if (!response.ok) {
    throw new Error('Food not found');
  }
  return response.json();
};

// Create new food
export const createFood = async (foodData: CreateFoodData): Promise<Food> => {
  const response = await fetch(`${API_BASE_URL}/foods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodData),
  });
  if (!response.ok) {
    throw new Error('Failed to create food');
  }
  return response.json();
};

// Update food
export const updateFood = async (id: string, foodData: UpdateFoodData): Promise<Food> => {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodData),
  });
  if (!response.ok) {
    throw new Error('Failed to update food');
  }
  return response.json();
};

// Delete food
export const deleteFood = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete food');
  }
  return response.json();
};

export const analyzeFood = async (namaMakanan: string) => {
  const response = await fetch(`${API_BASE_URL}/gemini-food-analysis/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ namaMakanan }),
  });
  if (!response.ok) throw new Error('Gagal menganalisis makanan');
  return response.json();
}; 