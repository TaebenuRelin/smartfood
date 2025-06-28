import { useQuery } from '@tanstack/react-query';
import { 
  getMotivasiHarian, 
  getRandomMotivasi,
  type MotivasiHarian
} from '@/lib/supabaseApi';

// Query keys
export const motivasiKeys = {
  all: ['motivasi'] as const,
  list: () => [...motivasiKeys.all, 'list'] as const,
  random: () => [...motivasiKeys.all, 'random'] as const,
};

// Get all motivasi harian
export const useMotivasiHarian = () => {
  return useQuery({
    queryKey: motivasiKeys.list(),
    queryFn: getMotivasiHarian,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get random motivasi
export const useRandomMotivasi = () => {
  return useQuery({
    queryKey: motivasiKeys.random(),
    queryFn: getRandomMotivasi,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 