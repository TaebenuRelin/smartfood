import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];
type Food = Tables['foods']['Row'];
type Category = Tables['categories']['Row'];
type Order = Tables['orders']['Row'];
type OrderItem = Tables['order_items']['Row'];
type User = Tables['users']['Row'];

// Food hooks
export const useFoods = () => {
  return useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('*, categories(*)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Food & { categories: Category })[];
    },
  });
};

export const useFood = (id: string) => {
  return useQuery({
    queryKey: ['foods', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('*, categories(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Food & { categories: Category };
    },
  });
};

// Category hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });
};

// Order hooks
export const useOrders = (userId?: string) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select('*, order_items(*, foods(*))')
        .order('created_at', { ascending: false });
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as (Order & {
        order_items: (OrderItem & { foods: Food })[];
      })[];
    },
    enabled: !!userId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderData: {
      user_id: string;
      total_amount: number;
      delivery_address: string;
      items: { food_id: string; quantity: number; price_at_time: number }[];
    }) => {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: orderData.user_id,
          total_amount: orderData.total_amount,
          delivery_address: orderData.delivery_address,
          status: 'pending',
          payment_status: 'pending',
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          orderData.items.map((item) => ({
            order_id: order.id,
            ...item,
          }))
        );
      
      if (itemsError) throw itemsError;
      
      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// User hooks
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as User;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: {
      email: string;
      full_name: string;
      phone_number?: string;
      address?: string;
    }) => {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();
      
      if (error) throw error;
      return data as User;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users', data.id] });
    },
  });
}; 