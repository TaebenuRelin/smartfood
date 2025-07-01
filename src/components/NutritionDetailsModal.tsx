import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NutritionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  nutrition: { [key: string]: any };
}

const nutritionLabels: { [key: string]: string } = {
  kalori: "Kalori (kkal)",
  protein: "Protein (g)",
  karbohidrat: "Karbohidrat (g)",
  lemak: "Lemak (g)",
  serat: "Serat (g)",
  gula: "Gula (g)",
  sodium: "Sodium (mg)",
  kalsium: "Kalsium (mg)",
  zat_besi: "Zat Besi (mg)",
  vitamin_c: "Vitamin C (mg)",
  vitamin_a: "Vitamin A (IU)",
  vitamin_d: "Vitamin D (IU)",
  vitamin_e: "Vitamin E (mg)",
  vitamin_k: "Vitamin K (µg)",
  vitamin_b1: "Vitamin B1 (mg)",
  vitamin_b2: "Vitamin B2 (mg)",
  vitamin_b3: "Vitamin B3 (mg)",
  vitamin_b6: "Vitamin B6 (mg)",
  vitamin_b12: "Vitamin B12 (µg)",
  folat: "Folat (µg)",
  magnesium: "Magnesium (mg)",
  fosfor: "Fosfor (mg)",
  kalium: "Kalium (mg)",
  zinc: "Zinc (mg)",
};

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
            {Object.entries(nutritionLabels).map(([key, label]) => (
              nutrition[key] !== undefined && (
                <li key={key}>
                  <strong>{label}:</strong> {nutrition[key]}
                </li>
              )
            ))}
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
