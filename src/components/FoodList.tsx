import { useState } from 'react';
import { useFoods, useDeleteFood } from '@/hooks/useFoods';
import { Food } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Plus,
  Loader2,
  AlertCircle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import FoodFormSimple from './FoodFormSimple';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FoodList = () => {
  const { data: foods, isLoading, error } = useFoods();
  const deleteFoodMutation = useDeleteFood();
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus makanan ini?')) {
      try {
        await deleteFoodMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting food:', error);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'makanan':
        return 'bg-green-100 text-green-800';
      case 'minuman':
        return 'bg-blue-100 text-blue-800';
      case 'dessert':
        return 'bg-pink-100 text-pink-800';
      case 'snack':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNutritionValue = (value: number, unit: string) => {
    return `${value.toFixed(1)} ${unit}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Memuat data makanan...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <span className="ml-2 text-red-500">Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daftar Makanan</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Makanan
        </Button>
      </div>

      {showAddForm && (
        <FoodFormSimple 
          onClose={() => setShowAddForm(false)}
          onSuccess={() => setShowAddForm(false)}
        />
      )}

      {editingFood && (
        <FoodFormSimple 
          food={editingFood}
          onClose={() => setEditingFood(null)}
          onSuccess={() => setEditingFood(null)}
        />
      )}

      {foods && foods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <Card key={food._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{food.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {food.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingFood(food)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(food._id)}
                      disabled={deleteFoodMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge className={getCategoryColor(food.category)}>
                      {food.category}
                    </Badge>
                    <span className="text-sm">
                      {food.servingSize} {food.servingUnit}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Kalori:</span>
                      <span className="font-medium">{formatNutritionValue(food.nutritionalInfo.calories, 'kkal')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein:</span>
                      <span className="font-medium">{formatNutritionValue(food.nutritionalInfo.protein, 'g')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Karbo:</span>
                      <span className="font-medium">{formatNutritionValue(food.nutritionalInfo.carbohydrates, 'g')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lemak:</span>
                      <span className="font-medium">{formatNutritionValue(food.nutritionalInfo.fats, 'g')}</span>
                    </div>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Info className="h-4 w-4 mr-2" />
                        Info Gizi Lengkap
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Informasi Gizi Lengkap</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Kolesterol:</span>
                            <span>{formatNutritionValue(food.nutritionalInfo.cholesterol, 'mg')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Serat:</span>
                            <span>{formatNutritionValue(food.nutritionalInfo.fiber, 'g')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gula:</span>
                            <span>{formatNutritionValue(food.nutritionalInfo.sugar, 'g')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sodium:</span>
                            <span>{formatNutritionValue(food.nutritionalInfo.sodium, 'mg')}</span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  {food.image && (
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Status: {food.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                    <span>
                      {new Date(food.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada makanan
          </h3>
          <p className="text-gray-500 mb-4">
            Mulai dengan menambahkan makanan pertama Anda.
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Makanan Pertama
          </Button>
        </div>
      )}
    </div>
  );
};

export default FoodList; 