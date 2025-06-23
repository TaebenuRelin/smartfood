import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Food } from '@/lib/api';
import { useCreateFood, useUpdateFood } from '@/hooks/useFoods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { X, Loader2 } from 'lucide-react';

const foodSchema = z.object({
  name: z.string().min(1, 'Nama makanan harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  price: z.number().min(0, 'Harga harus lebih dari 0'),
  category: z.enum(['makanan', 'minuman', 'dessert', 'snack']),
  image: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

type FoodFormData = z.infer<typeof foodSchema>;

interface FoodFormDialogProps {
  food?: Food;
  onClose: () => void;
  onSuccess: () => void;
}

const FoodFormDialog = ({ food, onClose, onSuccess }: FoodFormDialogProps) => {
  const isEditing = !!food;
  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: food?.name || '',
      description: food?.description || '',
      price: food?.price || 0,
      category: food?.category || 'makanan',
      image: food?.image || '',
      isAvailable: food?.isAvailable ?? true,
    },
  });

  const isAvailable = watch('isAvailable');

  const onSubmit = async (data: FoodFormData) => {
    try {
      if (isEditing && food) {
        await updateFoodMutation.mutateAsync({
          id: food._id,
          data,
        });
      } else {
        await createFoodMutation.mutateAsync(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isLoading = isSubmitting || createFoodMutation.isPending || updateFoodMutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>
              {isEditing ? 'Edit Makanan' : 'Tambah Makanan Baru'}
            </CardTitle>
            <CardDescription>
              {isEditing 
                ? 'Perbarui informasi makanan yang dipilih'
                : 'Tambahkan makanan baru ke dalam database'
              }
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Makanan *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Contoh: Nasi Goreng"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Harga (IDR) *</Label>
              <Input
                id="price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="25000"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Deskripsi makanan..."
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select
                value={watch('category')}
                onValueChange={(value) => setValue('category', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan">Makanan</SelectItem>
                  <SelectItem value="minuman">Minuman</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL Gambar</Label>
              <Input
                id="image"
                {...register('image')}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isAvailable"
              checked={isAvailable}
              onCheckedChange={(checked) => setValue('isAvailable', checked)}
            />
            <Label htmlFor="isAvailable">Tersedia</Label>
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

export default FoodFormDialog; 