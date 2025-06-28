import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getNutritionLogs, 
  addNutritionLog,
  type NutritionLog
} from '@/lib/supabaseApi';
import { toast } from 'sonner';

// Query keys
export const nutritionKeys = {
  all: ['nutrition'] as const,
  logs: (userId?: string) => [...nutritionKeys.all, 'logs', userId] as const,
};

// Get nutrition logs
export const useNutritionLogs = (userId?: string) => {
  return useQuery({
    queryKey: nutritionKeys.logs(userId),
    queryFn: () => getNutritionLogs(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Add nutrition log mutation
export const useAddNutritionLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addNutritionLog,
    onSuccess: (newLog) => {
      queryClient.invalidateQueries({ queryKey: nutritionKeys.logs(newLog.user_id) });
      toast.success('Log nutrisi berhasil ditambahkan!');
    },
    onError: (error) => {
      toast.error('Gagal menambahkan log nutrisi: ' + error.message);
    },
  });
}; 