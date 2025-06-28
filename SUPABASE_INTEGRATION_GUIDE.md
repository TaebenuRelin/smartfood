# 🚀 Supabase Integration Guide - Smartfood App

## ✅ What's Been Completed

### 1. **Database Setup**
- ✅ Created all required tables in Supabase
- ✅ Populated tables with seed data:
  - `foods.csv` - 100+ food items with nutritional data
  - `users.csv` - 10 user profiles
  - `nutrition_logs.csv` - 130 nutrition log entries
  - `meal_plan_preferences.csv` - 10 meal plan preferences
  - `reminders.csv` - 35 reminder settings
  - `motivasi_harian.csv` - 50 motivational messages

### 2. **API Integration**
- ✅ Created `src/lib/supabaseClient.ts` - Supabase client configuration
- ✅ Created `src/lib/supabaseApi.ts` - Complete API functions for all tables
- ✅ Updated `src/hooks/useFoods.ts` - Food management hooks
- ✅ Created `src/hooks/useNutrition.ts` - Nutrition logging hooks
- ✅ Created `src/hooks/useMotivasi.ts` - Motivational messages hooks
- ✅ Updated `src/components/MotivasiHarian.tsx` - Now uses Supabase data

## 🔧 Next Steps

### 1. **Install Required Dependencies**
```bash
npm install @tanstack/react-query sonner
# or
bun add @tanstack/react-query sonner
```

### 2. **Update App.tsx to Include Query Client**
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your existing app content */}
      <Toaster />
    </QueryClientProvider>
  );
}
```

### 3. **Test Database Connection**
Create a test page to verify all connections work:
```tsx
// Add this route to test Supabase integration
<Route path="/test-supabase" element={<SupabaseDataTest />} />
```

### 4. **Update Components to Use Supabase**

#### A. FoodList Component
```tsx
import { useFoods } from '@/hooks/useFoods';

// Replace existing food data with:
const { data: foods, isLoading, error } = useFoods();
```

#### B. FoodForm Component
```tsx
import { useCreateFood, useUpdateFood } from '@/hooks/useFoods';

// Use these mutations instead of direct API calls
const createFoodMutation = useCreateFood();
const updateFoodMutation = useUpdateFood();
```

#### C. Dashboard Component
```tsx
import { useNutritionLogs } from '@/hooks/useNutrition';
import { useRandomMotivasi } from '@/hooks/useMotivasi';

// Add nutrition data and motivational messages
const { data: nutritionLogs } = useNutritionLogs(userId);
const { data: motivasi } = useRandomMotivasi();
```

### 5. **Add User Authentication**
```tsx
// In your main App component
import { useAuth } from '@/hooks/useAuth';

// Create user context and authentication flow
```

### 6. **Create Additional Hooks**

#### A. User Management
```tsx
// src/hooks/useUsers.ts
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
```

#### B. Reminders Management
```tsx
// src/hooks/useReminders.ts
export const useReminders = (userId: string) => {
  return useQuery({
    queryKey: ['reminders', userId],
    queryFn: () => getReminders(userId),
  });
};
```

#### C. Meal Plan Preferences
```tsx
// src/hooks/useMealPlan.ts
export const useMealPlanPreferences = (userId: string) => {
  return useQuery({
    queryKey: ['meal-plan-preferences', userId],
    queryFn: () => getMealPlanPreferences(userId),
  });
};
```

### 7. **Update UI Components**

#### A. Food Management
- Update `FoodList.tsx` to use Supabase data
- Update `FoodForm.tsx` to use Supabase mutations
- Add loading states and error handling

#### B. Nutrition Tracking
- Create `NutritionLogForm.tsx` for adding nutrition logs
- Create `NutritionDashboard.tsx` for viewing nutrition data
- Add charts and analytics

#### C. User Profile
- Create `UserProfile.tsx` for user information
- Create `MealPlanPreferencesForm.tsx` for preferences
- Create `RemindersSettings.tsx` for reminder management

### 8. **Add Real-time Features**
```tsx
// Enable real-time subscriptions for live updates
const subscription = supabase
  .channel('nutrition_logs')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'nutrition_logs' }, payload => {
    // Handle real-time updates
  })
  .subscribe();
```

### 9. **Environment Variables**
Create `.env.local` file:
```env
VITE_SUPABASE_URL=https://dhtffsdywnapcrfyyyml.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 10. **Testing & Validation**
- Test all CRUD operations
- Verify data consistency
- Test error handling
- Validate user permissions

## 🎯 Priority Order

1. **Install dependencies** - Get React Query and Sonner working
2. **Test basic connection** - Verify Supabase integration works
3. **Update FoodList component** - Get food data displaying
4. **Add nutrition logging** - Enable users to log their meals
5. **Add user authentication** - Secure the application
6. **Add remaining features** - Reminders, meal plans, etc.

## 🔍 Troubleshooting

### Common Issues:
1. **CORS errors** - Check Supabase RLS policies
2. **Authentication errors** - Verify API keys
3. **Type errors** - Ensure TypeScript types match database schema
4. **Query errors** - Check table names and column names

### Debug Commands:
```bash
# Check Supabase connection
npm run dev
# Open browser console to see any errors
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Sonner Toast Documentation](https://sonner.emilkowal.ski/)

---

**Status**: ✅ Database Setup Complete | 🔄 API Integration In Progress | ⏳ UI Updates Pending