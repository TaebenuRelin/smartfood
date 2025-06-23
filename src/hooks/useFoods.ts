import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getFoods, 
  getFoodById, 
  createFood, 
  updateFood, 
  deleteFood,
  type Food,
  type CreateFoodData,
  type UpdateFoodData
} from '@/lib/api';
import { toast } from 'sonner';

// Query keys
export const foodKeys = {
  all: ['foods'] as const,
  lists: () => [...foodKeys.all, 'list'] as const,
  list: (filters: string) => [...foodKeys.lists(), { filters }] as const,
  details: () => [...foodKeys.all, 'detail'] as const,
  detail: (id: string) => [...foodKeys.details(), id] as const,
};

// Get all foods
export const useFoods = () => {
  return useQuery({
    queryKey: foodKeys.lists(),
    queryFn: getFoods,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single food by ID
export const useFood = (id: string) => {
  return useQuery({
    queryKey: foodKeys.detail(id),
    queryFn: () => getFoodById(id),
    enabled: !!id,
  });
};

// Create food mutation
export const useCreateFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodKeys.lists() });
      toast.success('Makanan berhasil ditambahkan!');
    },
    onError: (error) => {
      toast.error('Gagal menambahkan makanan: ' + error.message);
    },
  });
};

// Update food mutation
export const useUpdateFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFoodData }) => 
      updateFood(id, data),
    onSuccess: (updatedFood) => {
      queryClient.invalidateQueries({ queryKey: foodKeys.lists() });
      queryClient.invalidateQueries({ queryKey: foodKeys.detail(updatedFood._id) });
      toast.success('Makanan berhasil diperbarui!');
    },
    onError: (error) => {
      toast.error('Gagal memperbarui makanan: ' + error.message);
    },
  });
};

// Delete food mutation
export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodKeys.lists() });
      toast.success('Makanan berhasil dihapus!');
    },
    onError: (error) => {
      toast.error('Gagal menghapus makanan: ' + error.message);
    },
  });
}; 