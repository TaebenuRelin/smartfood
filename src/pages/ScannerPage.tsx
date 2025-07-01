import FoodScanner from "@/components/FoodScanner";
import { useNavigate } from "react-router-dom";

const ScannerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <FoodScanner onBackToHome={() => navigate('/')} />
    </div>
  );
};

export default ScannerPage; 