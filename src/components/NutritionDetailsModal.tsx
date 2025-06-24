import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NutritionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    [key: string]: any;
  };
}

const NutritionDetailsModal: React.FC<NutritionDetailsModalProps> = ({
  open,
  onClose,
  nutrition,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Rincian Nutrisi Lengkap</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <strong>Kalori:</strong> {nutrition.calories} kcal
            </li>
            <li>
              <strong>Protein:</strong> {nutrition.protein} g
            </li>
            <li>
              <strong>Karbohidrat:</strong> {nutrition.carbs} g
            </li>
            <li>
              <strong>Lemak:</strong> {nutrition.fat} g
            </li>
            <li>
              <strong>Serat:</strong> {nutrition.fiber} g
            </li>
            {/* Add more nutrition info here if available */}
          </ul>
          <Button className="mt-6 w-full" onClick={onClose}>
            Tutup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionDetailsModal;
