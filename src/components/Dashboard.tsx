import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Target, TrendingUp, Calendar, Utensils, Award, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyzeFood } from '@/lib/api';
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface DashboardProps {
  onBackToHome: () => void;
}

const Dashboard = ({ onBackToHome }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [foodHistory, setFoodHistory] = useState<any[]>([]);
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    targetCalories: user?.targetCalories || 2000,
    height: user?.height || 170,
    weight: user?.weight || 65,
    targetPurpose: user?.targetPurpose || 'jaga berat badan',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const todayStats = {
    calories: { consumed: 1850, target: 2200 },
    protein: { consumed: 85, target: 120 },
    carbs: { consumed: 220, target: 275 },
    fat: { consumed: 65, target: 80 }
  };

  const recentMeals = [
    { time: "08:00", name: "Nasi Gudeg", calories: 420, image: "🍛" },
    { time: "12:30", name: "Gado-gado", calories: 380, image: "🥗" },
    { time: "15:00", name: "Pisang Goreng", calories: 180, image: "🍌" },
    { time: "19:00", name: "Nasi Goreng", calories: 385, image: "🍳" }
  ];

  const weeklyFoodSuggestions = {
    'menurunkan berat badan': [
      [
        { name: 'Dada Ayam Rebus', time: '08:00', calories: 120, protein: 22, carbs: 0, fat: 2, icon: '🍗' },
        { name: 'Salad Sayur', time: '12:30', calories: 90, protein: 2, carbs: 18, fat: 1, icon: '🥗' },
        { name: 'Oatmeal', time: '15:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Ikan Kukus', time: '19:00', calories: 180, protein: 20, carbs: 0, fat: 4, icon: '🐟' },
      ],
      [
        { name: 'Telur Rebus', time: '08:00', calories: 80, protein: 6, carbs: 1, fat: 5, icon: '🥚' },
        { name: 'Tumis Brokoli', time: '12:30', calories: 70, protein: 3, carbs: 10, fat: 1, icon: '🥦' },
        { name: 'Smoothie Buah', time: '15:00', calories: 120, protein: 2, carbs: 25, fat: 1, icon: '🍓' },
        { name: 'Tahu Kukus', time: '19:00', calories: 90, protein: 8, carbs: 2, fat: 4, icon: '🍢' },
      ],
      [
        { name: 'Yogurt Rendah Lemak', time: '08:00', calories: 90, protein: 10, carbs: 5, fat: 4, icon: '🥛' },
        { name: 'Sup Ayam', time: '12:30', calories: 110, protein: 15, carbs: 10, fat: 5, icon: '🍲' },
        { name: 'Apel', time: '15:00', calories: 60, protein: 1, carbs: 15, fat: 0, icon: '🍏' },
        { name: 'Ikan Panggang', time: '19:00', calories: 170, protein: 20, carbs: 0, fat: 5, icon: '🐟' },
      ],
      [
        { name: 'Oatmeal', time: '08:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Salad Buah', time: '12:30', calories: 100, protein: 2, carbs: 18, fat: 1, icon: '🍉' },
        { name: 'Tahu Kukus', time: '15:00', calories: 90, protein: 8, carbs: 2, fat: 4, icon: '🍢' },
        { name: 'Ayam Kukus', time: '19:00', calories: 120, protein: 20, carbs: 0, fat: 4, icon: '🍗' },
      ],
      [
        { name: 'Telur Dadar', time: '08:00', calories: 110, protein: 10, carbs: 2, fat: 5, icon: '🍳' },
        { name: 'Sayur Bening', time: '12:30', calories: 80, protein: 3, carbs: 10, fat: 1, icon: '🥬' },
        { name: 'Pisang', time: '15:00', calories: 90, protein: 2, carbs: 18, fat: 1, icon: '🍌' },
        { name: 'Ikan Kukus', time: '19:00', calories: 180, protein: 20, carbs: 0, fat: 4, icon: '🐟' },
      ],
      [
        { name: 'Oatmeal', time: '08:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Tumis Sayur', time: '12:30', calories: 90, protein: 3, carbs: 10, fat: 1, icon: '🥦' },
        { name: 'Apel', time: '15:00', calories: 60, protein: 1, carbs: 15, fat: 0, icon: '🍏' },
        { name: 'Ayam Kukus', time: '19:00', calories: 120, protein: 20, carbs: 0, fat: 4, icon: '🍗' },
      ],
      [
        { name: 'Yogurt', time: '08:00', calories: 90, protein: 10, carbs: 5, fat: 4, icon: '🥛' },
        { name: 'Sup Ayam', time: '12:30', calories: 110, protein: 15, carbs: 10, fat: 5, icon: '🍲' },
        { name: 'Smoothie Buah', time: '15:00', calories: 120, protein: 2, carbs: 25, fat: 1, icon: '🍓' },
        { name: 'Ikan Panggang', time: '19:00', calories: 170, protein: 20, carbs: 0, fat: 5, icon: '🐟' },
      ],
    ],
    'menaikkan berat badan': [
      [
        { name: 'Nasi Goreng', time: '08:00', calories: 420, protein: 20, carbs: 50, fat: 10, icon: '🍳' },
        { name: 'Daging Sapi', time: '12:30', calories: 350, protein: 50, carbs: 0, fat: 15, icon: '🥩' },
        { name: 'Susu Full Cream', time: '15:00', calories: 200, protein: 10, carbs: 10, fat: 10, icon: '🥛' },
        { name: 'Alpukat', time: '19:00', calories: 250, protein: 5, carbs: 20, fat: 5, icon: '🥑' },
      ],
      [
        { name: 'Roti Tawar', time: '08:00', calories: 180, protein: 8, carbs: 30, fat: 5, icon: '🍞' },
        { name: 'Ayam Goreng', time: '12:30', calories: 320, protein: 40, carbs: 0, fat: 15, icon: '🍗' },
        { name: 'Keju', time: '15:00', calories: 150, protein: 10, carbs: 10, fat: 10, icon: '🧀' },
        { name: 'Kentang Panggang', time: '19:00', calories: 210, protein: 4, carbs: 25, fat: 5, icon: '🥔' },
      ],
      [
        { name: 'Nasi Uduk', time: '08:00', calories: 400, protein: 10, carbs: 50, fat: 15, icon: '🍚' },
        { name: 'Daging Sapi', time: '12:30', calories: 350, protein: 50, carbs: 0, fat: 15, icon: '🥩' },
        { name: 'Susu Full Cream', time: '15:00', calories: 200, protein: 10, carbs: 10, fat: 10, icon: '🥛' },
        { name: 'Alpukat', time: '19:00', calories: 250, protein: 5, carbs: 20, fat: 5, icon: '🥑' },
      ],
      [
        { name: 'Roti Tawar', time: '08:00', calories: 180, protein: 8, carbs: 30, fat: 5, icon: '🍞' },
        { name: 'Ayam Goreng', time: '12:30', calories: 320, protein: 40, carbs: 0, fat: 15, icon: '🍗' },
        { name: 'Keju', time: '15:00', calories: 150, protein: 10, carbs: 10, fat: 10, icon: '🧀' },
        { name: 'Kentang Panggang', time: '19:00', calories: 210, protein: 4, carbs: 25, fat: 5, icon: '🥔' },
      ],
      [
        { name: 'Nasi Goreng', time: '08:00', calories: 420, protein: 20, carbs: 50, fat: 10, icon: '🍳' },
        { name: 'Daging Sapi', time: '12:30', calories: 350, protein: 50, carbs: 0, fat: 15, icon: '🥩' },
        { name: 'Susu Full Cream', time: '15:00', calories: 200, protein: 10, carbs: 10, fat: 10, icon: '🥛' },
        { name: 'Alpukat', time: '19:00', calories: 250, protein: 5, carbs: 20, fat: 5, icon: '🥑' },
      ],
      [
        { name: 'Roti Tawar', time: '08:00', calories: 180, protein: 8, carbs: 30, fat: 5, icon: '🍞' },
        { name: 'Ayam Goreng', time: '12:30', calories: 320, protein: 40, carbs: 0, fat: 15, icon: '🍗' },
        { name: 'Keju', time: '15:00', calories: 150, protein: 10, carbs: 10, fat: 10, icon: '🧀' },
        { name: 'Kentang Panggang', time: '19:00', calories: 210, protein: 4, carbs: 25, fat: 5, icon: '🥔' },
      ],
      [
        { name: 'Nasi Uduk', time: '08:00', calories: 400, protein: 10, carbs: 50, fat: 15, icon: '🍚' },
        { name: 'Daging Sapi', time: '12:30', calories: 350, protein: 50, carbs: 0, fat: 15, icon: '🥩' },
        { name: 'Susu Full Cream', time: '15:00', calories: 200, protein: 10, carbs: 10, fat: 10, icon: '🥛' },
        { name: 'Alpukat', time: '19:00', calories: 250, protein: 5, carbs: 20, fat: 5, icon: '🥑' },
      ],
      [
        { name: 'Roti Tawar', time: '08:00', calories: 180, protein: 8, carbs: 30, fat: 5, icon: '🍞' },
        { name: 'Ayam Goreng', time: '12:30', calories: 320, protein: 40, carbs: 0, fat: 15, icon: '🍗' },
        { name: 'Keju', time: '15:00', calories: 150, protein: 10, carbs: 10, fat: 10, icon: '🧀' },
        { name: 'Kentang Panggang', time: '19:00', calories: 210, protein: 4, carbs: 25, fat: 5, icon: '🥔' },
      ],
    ],
    'jaga berat badan': [
      [
        { name: 'Nasi Gudeg', time: '08:00', calories: 420, protein: 10, carbs: 50, fat: 10, icon: '🍛' },
        { name: 'Gado-gado', time: '12:30', calories: 380, protein: 5, carbs: 30, fat: 15, icon: '🥗' },
        { name: 'Pisang Goreng', time: '15:00', calories: 180, protein: 4, carbs: 20, fat: 5, icon: '🍌' },
        { name: 'Nasi Goreng', time: '19:00', calories: 385, protein: 10, carbs: 50, fat: 10, icon: '🍳' },
      ],
      [
        { name: 'Bubur Ayam', time: '08:00', calories: 250, protein: 5, carbs: 20, fat: 5, icon: '🍲' },
        { name: 'Ayam Bakar', time: '12:30', calories: 320, protein: 20, carbs: 0, fat: 10, icon: '🍗' },
        { name: 'Salad Buah', time: '15:00', calories: 120, protein: 4, carbs: 10, fat: 2, icon: '🍉' },
        { name: 'Sup Sayur', time: '19:00', calories: 150, protein: 5, carbs: 10, fat: 5, icon: '🥬' },
      ],
      [
        { name: 'Nasi Uduk', time: '08:00', calories: 400, protein: 10, carbs: 50, fat: 15, icon: '🍚' },
        { name: 'Ayam Goreng', time: '12:30', calories: 320, protein: 20, carbs: 0, fat: 10, icon: '🍗' },
        { name: 'Pisang', time: '15:00', calories: 90, protein: 4, carbs: 10, fat: 2, icon: '🍌' },
        { name: 'Sup Ayam', time: '19:00', calories: 110, protein: 5, carbs: 5, fat: 5, icon: '🍲' },
      ],
      [
        { name: 'Roti Tawar', time: '08:00', calories: 180, protein: 8, carbs: 30, fat: 5, icon: '🍞' },
        { name: 'Ayam Panggang', time: '12:30', calories: 300, protein: 20, carbs: 0, fat: 10, icon: '🍗' },
        { name: 'Yogurt', time: '15:00', calories: 90, protein: 10, carbs: 5, fat: 4, icon: '🥛' },
        { name: 'Sup Sayur', time: '19:00', calories: 150, protein: 5, carbs: 10, fat: 5, icon: '🥬' },
      ],
      [
        { name: 'Nasi Gudeg', time: '08:00', calories: 420, protein: 10, carbs: 50, fat: 10, icon: '🍛' },
        { name: 'Gado-gado', time: '12:30', calories: 380, protein: 5, carbs: 30, fat: 15, icon: '🥗' },
        { name: 'Pisang Goreng', time: '15:00', calories: 180, protein: 4, carbs: 20, fat: 5, icon: '🍌' },
        { name: 'Nasi Goreng', time: '19:00', calories: 385, protein: 10, carbs: 50, fat: 10, icon: '🍳' },
      ],
      [
        { name: 'Bubur Ayam', time: '08:00', calories: 250, protein: 5, carbs: 20, fat: 5, icon: '🍲' },
        { name: 'Ayam Bakar', time: '12:30', calories: 320, protein: 20, carbs: 0, fat: 10, icon: '🍗' },
        { name: 'Salad Buah', time: '15:00', calories: 120, protein: 4, carbs: 10, fat: 2, icon: '🍉' },
        { name: 'Sup Sayur', time: '19:00', calories: 150, protein: 5, carbs: 10, fat: 5, icon: '🥬' },
      ],
      [
        { name: 'Nasi Uduk', time: '08:00', calories: 400, protein: 10, carbs: 50, fat: 15, icon: '🍚' },
        { name: 'Ayam Goreng', time: '12:30', calories: 320, protein: 20, carbs: 0, fat: 10, icon: '🍗' },
        { name: 'Pisang', time: '15:00', calories: 90, protein: 4, carbs: 10, fat: 2, icon: '🍌' },
        { name: 'Sup Ayam', time: '19:00', calories: 110, protein: 5, carbs: 5, fat: 5, icon: '🍲' },
      ],
    ],
    'diet': [
      [
        { name: 'Oatmeal', time: '08:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Telur Rebus', time: '12:30', calories: 80, protein: 6, carbs: 1, fat: 5, icon: '🥚' },
        { name: 'Smoothie Buah', time: '15:00', calories: 120, protein: 2, carbs: 25, fat: 1, icon: '🍓' },
        { name: 'Salad Sayur', time: '19:00', calories: 90, protein: 2, carbs: 18, fat: 1, icon: '🥗' },
      ],
      [
        { name: 'Yogurt', time: '08:00', calories: 90, protein: 10, carbs: 5, fat: 4, icon: '🥛' },
        { name: 'Sup Ayam', time: '12:30', calories: 110, protein: 15, carbs: 10, fat: 5, icon: '🍲' },
        { name: 'Apel', time: '15:00', calories: 60, protein: 1, carbs: 15, fat: 0, icon: '🍏' },
        { name: 'Ikan Panggang', time: '19:00', calories: 170, protein: 20, carbs: 0, fat: 5, icon: '🐟' },
      ],
      [
        { name: 'Oatmeal', time: '08:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Salad Buah', time: '12:30', calories: 100, protein: 2, carbs: 18, fat: 1, icon: '🍉' },
        { name: 'Tahu Kukus', time: '15:00', calories: 90, protein: 8, carbs: 2, fat: 4, icon: '🍢' },
        { name: 'Ayam Kukus', time: '19:00', calories: 120, protein: 20, carbs: 0, fat: 4, icon: '🍗' },
      ],
      [
        { name: 'Telur Dadar', time: '08:00', calories: 110, protein: 10, carbs: 2, fat: 5, icon: '🍳' },
        { name: 'Sayur Bening', time: '12:30', calories: 80, protein: 3, carbs: 10, fat: 1, icon: '🥬' },
        { name: 'Pisang', time: '15:00', calories: 90, protein: 2, carbs: 18, fat: 1, icon: '🍌' },
        { name: 'Ikan Kukus', time: '19:00', calories: 180, protein: 20, carbs: 0, fat: 4, icon: '🐟' },
      ],
      [
        { name: 'Oatmeal', time: '08:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Tumis Sayur', time: '12:30', calories: 90, protein: 3, carbs: 10, fat: 1, icon: '🥦' },
        { name: 'Apel', time: '15:00', calories: 60, protein: 1, carbs: 15, fat: 0, icon: '🍏' },
        { name: 'Ayam Kukus', time: '19:00', calories: 120, protein: 20, carbs: 0, fat: 4, icon: '🍗' },
      ],
      [
        { name: 'Yogurt', time: '08:00', calories: 90, protein: 10, carbs: 5, fat: 4, icon: '🥛' },
        { name: 'Sup Ayam', time: '12:30', calories: 110, protein: 15, carbs: 10, fat: 5, icon: '🍲' },
        { name: 'Smoothie Buah', time: '15:00', calories: 120, protein: 2, carbs: 25, fat: 1, icon: '🍓' },
        { name: 'Ikan Panggang', time: '19:00', calories: 170, protein: 20, carbs: 0, fat: 5, icon: '🐟' },
      ],
      [
        { name: 'Oatmeal', time: '08:00', calories: 150, protein: 5, carbs: 27, fat: 3, icon: '🥣' },
        { name: 'Telur Rebus', time: '12:30', calories: 80, protein: 6, carbs: 1, fat: 5, icon: '🥚' },
        { name: 'Smoothie Buah', time: '15:00', calories: 120, protein: 2, carbs: 25, fat: 1, icon: '🍓' },
        { name: 'Salad Sayur', time: '19:00', calories: 90, protein: 2, carbs: 18, fat: 1, icon: '🥗' },
      ],
    ],
  };
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const weeklyProgressCalories = (weeklyFoodSuggestions[user?.targetPurpose || 'jaga berat badan'] || []).map(
    (meals) => meals.reduce((sum, meal) => sum + (meal.calories || 0), 0)
  );
  const progressMingguan = days.map((day, idx) => ({
    day,
    calories: weeklyProgressCalories[idx] || 0,
  }));
  const todayMeals = weeklyFoodSuggestions[user?.targetPurpose || 'jaga berat badan'][selectedDay];
  const totalNutrisi = todayMeals.reduce((acc, meal) => ({
    calories: acc.calories + (meal.calories || 0),
    protein: acc.protein + (meal.protein || 0),
    carbs: acc.carbs + (meal.carbs || 0),
    fat: acc.fat + (meal.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const handleAnalyze = async () => {
    const data = await analyzeFood(input);
    setResult(data);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await axios.patch('/api/auth/profile', {
        userId: user.id,
        ...profileForm,
      });
      toast && toast({
        title: 'Profil Berhasil Disimpan',
        description: 'Data profil berhasil diperbarui.',
        variant: 'default',
      });
      window.location.reload();
    } catch (error: any) {
      toast && toast({
        title: 'Gagal Menyimpan Profil',
        description: error.response?.data?.error || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history' && user) {
      fetch(`http://localhost:3000/api/nutrition-logs/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setFoodHistory(data.data);
        });
    }
  }, [activeTab, user]);

  // Hitung total kalori mingguan dari makanan mingguan
  const weeklyCalories = (weeklyFoodSuggestions[user?.targetPurpose || 'jaga berat badan'] || []).map(
    (meals) => meals.reduce((sum, meal) => sum + (meal.calories || 0), 0)
  );
  const weeklyProgress = days.map((day, idx) => ({
    day,
    calories: weeklyCalories[idx] || 0,
  }));

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-lg text-muted-foreground">Memuat data akun...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-smartfood-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBackToHome}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-smartfood-800">Dashboard Nutrisi</h1>
              <p className="text-muted-foreground">Pantau progress dan capai target kesehatan Anda</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Daily Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Kalori Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-smartfood-600">
                      {totalNutrisi.calories}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.calories.target}
                    </span>
                  </div>
                  <Progress value={(totalNutrisi.calories / todayStats.calories.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {todayStats.calories.target - totalNutrisi.calories} tersisa
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Protein</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {totalNutrisi.protein}g
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.protein.target}g
                    </span>
                  </div>
                  <Progress value={(totalNutrisi.protein / todayStats.protein.target) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Karbohidrat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-yellow-600">
                      {totalNutrisi.carbs}g
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.carbs.target}g
                    </span>
                  </div>
                  <Progress value={(totalNutrisi.carbs / todayStats.carbs.target) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Lemak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-red-600">
                      {totalNutrisi.fat}g
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.fat.target}g
                    </span>
                  </div>
                  <Progress value={(totalNutrisi.fat / todayStats.fat.target) * 100} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress and Recent Meals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-smartfood-600" />
                    <span>Progress Mingguan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressMingguan.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-12">{day.day}</span>
                        <div className="flex-1 mx-4">
                          <Progress
                            value={day.calories > 0 ? (day.calories / todayStats.calories.target) * 100 : 0}
                            className="h-2"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-16 text-right">
                          {day.calories > 0 ? `${day.calories} kal` : '-'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Utensils className="w-5 h-5 text-smartfood-600" />
                    <span>Makanan Mingguan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {days.map((day, idx) => (
                      <button
                        key={day}
                        className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${selectedDay === idx ? 'bg-smartfood-600 text-white' : 'bg-white text-smartfood-700 border-smartfood-200 hover:bg-smartfood-100'}`}
                        onClick={() => setSelectedDay(idx)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <div className="bg-smartfood-50 rounded-lg p-4">
                    <div className="font-bold mb-2 text-smartfood-700">{days[selectedDay]}</div>
                    <ul className="space-y-2">
                      {todayMeals.map((meal, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-xl">{meal.icon}</span>
                          <span className="flex-1">{meal.name} <span className="text-xs text-muted-foreground">{meal.time}</span></span>
                          <Badge variant="outline">{meal.calories} kal</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-smartfood-600" />
                  <span>Riwayat Makanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {foodHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      Belum ada riwayat makanan
                    </h3>
                    <p className="text-muted-foreground">
                      Tambahkan makanan dari fitur analisis untuk melihat riwayat di sini.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {foodHistory.map((item) => (
                      <Card key={item._id} className="border border-green-200">
                        <CardContent className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="font-bold text-lg text-green-700">{item.foodName}</div>
                            <div className="text-sm text-muted-foreground">{new Date(item.createdAt).toLocaleString('id-ID')}</div>
                          </div>
                          <div className="flex gap-6">
                            <div className="text-center">
                              <div className="font-bold text-green-700">{item.calories ?? '-'}</div>
                              <div className="text-xs">Kalori</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-blue-700">{item.protein ?? '-'}</div>
                              <div className="text-xs">Protein</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-yellow-700">{item.carbs ?? '-'}</div>
                              <div className="text-xs">Karbo</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-red-700">{item.fat ?? '-'}</div>
                              <div className="text-xs">Lemak</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-smartfood-600" />
                  <span>Profil Pengguna</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nama</span>
                    <span className="font-medium">{user ? user.name : 'Guest'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{user ? user.email : 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Usia</span>
                    <span className="font-medium">25 tahun</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Berat Badan</span>
                    <span className="font-medium">{user?.weight ? user.weight + ' kg' : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tinggi Badan</span>
                    <span className="font-medium">{user?.height ? user.height + ' cm' : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Target Kalori</span>
                    <span className="font-medium">{user?.targetCalories ? user.targetCalories + ' kal' : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Target</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">{user?.targetPurpose || '-'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
