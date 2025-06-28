import React from "react";
import { useFoods } from "@/hooks/useFoods";

const SupabaseTest: React.FC = () => {
  const { data: foods, isLoading, error } = useFoods();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>
      
      {isLoading && <p>Loading foods...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error.message}
        </div>
      )}
      
      {foods && (
        <div>
          <p className="mb-4">Found {foods.length} foods from Supabase:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.slice(0, 6).map((food) => (
              <div key={food.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{food.name}</h3>
                <p className="text-sm text-gray-600">{food.description}</p>
                <p className="text-sm font-medium mt-2">{food.calories} calories</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseTest; 