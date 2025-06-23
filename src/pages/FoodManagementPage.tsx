import FoodList from '@/components/FoodList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FoodManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Manajemen Makanan
              </h1>
              <p className="text-gray-600">
                Kelola data makanan, minuman, dan snack dalam sistem SmartFood.
              </p>
            </div>
            
            <FoodList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodManagementPage; 