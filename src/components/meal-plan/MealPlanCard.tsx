import React from 'react';
import { Meal } from '@/lib/types/meal-plan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MealPlanCardProps {
  meal: Meal;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({ meal }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{meal.name}</span>
          <span className="text-sm text-muted-foreground">{meal.time}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {meal.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                {item.portion && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({item.portion})
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {item.calories} cal
              </span>
            </div>
          ))}
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center font-medium">
              <span>Total</span>
              <span>{meal.totalCalories} calories</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 