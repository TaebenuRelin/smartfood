import React from 'react';
import { MealPlanPreferences, UserGoal } from '@/lib/types/meal-plan';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  goal: z.enum(['weight_loss', 'maintenance', 'muscle_gain']),
  dailyCalorieTarget: z.number().min(1000).max(5000),
  dietaryRestrictions: z.array(z.string()).optional(),
});

interface MealPlanPreferencesFormProps {
  onSubmit: (preferences: MealPlanPreferences) => void;
}

export const MealPlanPreferencesForm: React.FC<MealPlanPreferencesFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: 'maintenance',
      dailyCalorieTarget: 2000,
      dietaryRestrictions: [],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pengaturan Rencana Makanan</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tujuan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weight_loss">
                        Penurunan Berat Badan
                      </SelectItem>
                      <SelectItem value="maintenance">
                        Menjaga Berat Badan
                      </SelectItem>
                      <SelectItem value="muscle_gain">
                        Meningkatkan Massa Otot
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dailyCalorieTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Kalori Harian</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Buat Rencana Makanan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}; 