import Dashboard from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Dashboard onBackToHome={() => navigate('/')} />
    </div>
  );
};

export default DashboardPage; 