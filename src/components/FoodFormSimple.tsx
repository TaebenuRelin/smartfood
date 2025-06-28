import { useState } from 'react';
import { Food, NutritionalInfo, ServingUnit } from '@/lib/api';
import { useCreateFood, useUpdateFood } from '@/hooks/useFoods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Loader2 } from 'lucide-react';

interface FoodFormSimpleProps {
  food?: Food;
  onClose: () => void;
  onSuccess: () => void;
}

const defaultNutritionalInfo: NutritionalInfo = {
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fats: 0,
  cholesterol: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
};

const FoodFormSimple = ({ food, onClose, onSuccess }: FoodFormSimpleProps) => {
  const isEditing = !!food;
  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const [formData, setFormData] = useState({
    name: food?.name || '',
    description: food?.description || '',
    nutritionalInfo: food?.nutritionalInfo || defaultNutritionalInfo,
    servingSize: food?.servingSize || 100,
    servingUnit: food?.servingUnit || 'g' as ServingUnit,
    category: food?.category || 'makanan',
    image: food?.image || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && food) {
        await updateFoodMutation.mutateAsync({
          id: food._id,
          data: formData,
        });
      } else {
        await createFoodMutation.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleNutritionalInfoChange = (field: keyof NutritionalInfo, value: string) => {
    setFormData({
      ...formData,
      nutritionalInfo: {
        ...formData.nutritionalInfo,
        [field]: Number(value),
      },
    });
  };

  const isLoading = createFoodMutation.isPending || updateFoodMutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {isEditing ? 'Edit Makanan' : 'Tambah Makanan Baru'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Makanan</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Nasi Goreng"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi makanan..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servingSize">Ukuran Porsi</Label>
              <Input
                id="servingSize"
                type="number"
                value={formData.servingSize}
                onChange={(e) => setFormData({ ...formData, servingSize: Number(e.target.value) })}
                placeholder="100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servingUnit">Satuan Porsi</Label>
              <Select
                value={formData.servingUnit}
                onValueChange={(value) => setFormData({ ...formData, servingUnit: value as ServingUnit })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">Gram (g)</SelectItem>
                  <SelectItem value="ml">Mililiter (ml)</SelectItem>
                  <SelectItem value="piece">Buah/Potong</SelectItem>
                  <SelectItem value="portion">Porsi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Informasi Gizi (per porsi)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Kalori (kkal)</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.nutritionalInfo.calories}
                  onChange={(e) => handleNutritionalInfoChange('calories', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={formData.nutritionalInfo.protein}
                  onChange={(e) => handleNutritionalInfoChange('protein', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbohydrates">Karbohidrat (g)</Label>
                <Input
                  id="carbohydrates"
                  type="number"
                  value={formData.nutritionalInfo.carbohydrates}
                  onChange={(e) => handleNutritionalInfoChange('carbohydrates', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fats">Lemak (g)</Label>
                <Input
                  id="fats"
                  type="number"
                  value={formData.nutritionalInfo.fats}
                  onChange={(e) => handleNutritionalInfoChange('fats', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cholesterol">Kolesterol (mg)</Label>
                <Input
                  id="cholesterol"
                  type="number"
                  value={formData.nutritionalInfo.cholesterol}
                  onChange={(e) => handleNutritionalInfoChange('cholesterol', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiber">Serat (g)</Label>
                <Input
                  id="fiber"
                  type="number"
                  value={formData.nutritionalInfo.fiber}
                  onChange={(e) => handleNutritionalInfoChange('fiber', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sugar">Gula (g)</Label>
                <Input
                  id="sugar"
                  type="number"
                  value={formData.nutritionalInfo.sugar}
                  onChange={(e) => handleNutritionalInfoChange('sugar', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sodium">Sodium (mg)</Label>
                <Input
                  id="sodium"
                  type="number"
                  value={formData.nutritionalInfo.sodium}
                  onChange={(e) => handleNutritionalInfoChange('sodium', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="makanan">Makanan</SelectItem>
                <SelectItem value="minuman">Minuman</SelectItem>
                <SelectItem value="dessert">Dessert</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL Gambar</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isEditing ? 'Update' : 'Tambah'} Makanan
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FoodFormSimple;