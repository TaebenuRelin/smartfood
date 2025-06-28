import React from "react";
import { useRandomMotivasi } from "@/hooks/useMotivasi";

const MotivasiHarian: React.FC = () => {
  const { data: motivasi, isLoading, error } = useRandomMotivasi();

  if (isLoading) {
    return (
      <div className="bg-smartfood-100 text-smartfood-800 text-center py-2 rounded mb-4 font-semibold">
        Memuat motivasi...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-smartfood-100 text-smartfood-800 text-center py-2 rounded mb-4 font-semibold">
        Tetap semangat hidup sehat hari ini!
      </div>
    );
  }

  return (
    <div className="bg-smartfood-100 text-smartfood-800 text-center py-2 rounded mb-4 font-semibold">
      {motivasi?.pesan || "Tetap semangat hidup sehat hari ini!"}
    </div>
  );
};

export default MotivasiHarian;
