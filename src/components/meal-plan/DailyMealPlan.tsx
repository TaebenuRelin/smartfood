import React from 'react';
import { MealPlan } from '@/lib/types/meal-plan';
import { MealPlanCard } from './MealPlanCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DailyMealPlanProps {
  mealPlan: MealPlan;
}

export const DailyMealPlan: React.FC<DailyMealPlanProps> = ({ mealPlan }) => {
  const goalLabels = {
    weight_loss: 'Penurunan Berat Badan',
    maintenance: 'Menjaga Berat Badan',
    muscle_gain: 'Meningkatkan Massa Otot',
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Rencana Makanan</span>
          <span className="text-sm text-muted-foreground">
            {new Date(mealPlan.date).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </CardTitle>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Tujuan: {goalLabels[mealPlan.userGoal]}</span>
          <span>Total Kalori: {mealPlan.totalDailyCalories} cal</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mealPlan.meals.map((meal, index) => (
            <MealPlanCard key={index} meal={meal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 