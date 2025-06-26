import React from "react";

const motivasiList = [
  "Tetap semangat hidup sehat hari ini!",
  "Satu langkah kecil setiap hari menuju kesehatan.",
  "Jaga pola makan, jaga masa depan.",
  "Air putih dan senyum adalah kunci awet muda.",
  "Kesehatan adalah investasi terbaik.",
  "Jangan menyerah, kamu sudah hebat sampai di titik ini!",
];

function getMotivasiHarian() {
  // Motivasi berganti setiap hari berdasarkan tanggal
  const today = new Date();
  const index = today.getDate() % motivasiList.length;
  return motivasiList[index];
}

const MotivasiHarian: React.FC = () => (
  <div className="bg-smartfood-100 text-smartfood-800 text-center py-2 rounded mb-4 font-semibold">
    {getMotivasiHarian()}
  </div>
);

export default MotivasiHarian;
