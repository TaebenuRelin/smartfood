import React, { useState } from 'react';
import { DailyMealPlan } from '@/components/meal-plan/DailyMealPlan';
import { MealPlanPreferencesForm } from '@/components/meal-plan/MealPlanPreferencesForm';
import { MealPlan, MealPlanPreferences } from '@/lib/types/meal-plan';

// Example meal plan data
const exampleMealPlan: MealPlan = {
  date: new Date().toISOString(),
  userGoal: 'weight_loss',
  totalDailyCalories: 1800,
  meals: [
    {
      name: 'Sarapan',
      time: '07:00 - 08:00',
      totalCalories: 240,
      items: [
        { name: 'Oatmeal', calories: 150, portion: '1 mangkuk' },
        { name: 'Pisang', calories: 90, portion: '1 buah' },
      ],
    },
    {
      name: 'Makan Siang',
      time: '12:00 - 13:00',
      totalCalories: 600,
      items: [
        { name: 'Nasi Merah', calories: 200, portion: '150g' },
        { name: 'Dada Ayam Rebus', calories: 250, portion: '100g' },
        { name: 'Sayur Bayam', calories: 150, portion: '1 porsi' },
      ],
    },
    {
      name: 'Snack Sore',
      time: '15:00 - 16:00',
      totalCalories: 160,
      items: [
        { name: 'Telur Rebus', calories: 70, portion: '1 butir' },
        { name: 'Apel', calories: 90, portion: '1 buah' },
      ],
    },
    {
      name: 'Makan Malam',
      time: '18:00 - 19:00',
      totalCalories: 400,
      items: [
        { name: 'Smoothie Protein', calories: 250, portion: '1 gelas' },
        { name: 'Sayur Rebus', calories: 150, portion: '1 porsi' },
      ],
    },
  ],
};

export const MealPlanPage: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const handlePreferencesSubmit = (preferences: MealPlanPreferences) => {
    // In a real application, this would call an API to generate a meal plan
    // For now, we'll use the example meal plan
    setMealPlan(exampleMealPlan);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Rencana Makanan SmartFood
      </h1>
      
      {!mealPlan ? (
        <MealPlanPreferencesForm onSubmit={handlePreferencesSubmit} />
      ) : (
        <DailyMealPlan mealPlan={mealPlan} />
      )}
    </div>
  );
}; 