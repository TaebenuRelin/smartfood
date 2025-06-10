
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Target, TrendingUp, Calendar, Utensils, Award } from "lucide-react";

interface DashboardProps {
  onBackToHome: () => void;
}

const Dashboard = ({ onBackToHome }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

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

  const weeklyProgress = [
    { day: "Sen", calories: 2100 },
    { day: "Sel", calories: 1950 },
    { day: "Rab", calories: 2250 },
    { day: "Kam", calories: 2050 },
    { day: "Jum", calories: 1850 },
    { day: "Sab", calories: 0 },
    { day: "Min", calories: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-smartfood-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center mb-8">
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
                      {todayStats.calories.consumed}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.calories.target}
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.calories.consumed / todayStats.calories.target) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {todayStats.calories.target - todayStats.calories.consumed} tersisa
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
                      {todayStats.protein.consumed}g
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.protein.target}g
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.protein.consumed / todayStats.protein.target) * 100} 
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Karbohidrat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-yellow-600">
                      {todayStats.carbs.consumed}g
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.carbs.target}g
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.carbs.consumed / todayStats.carbs.target) * 100} 
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Lemak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-red-600">
                      {todayStats.fat.consumed}g
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {todayStats.fat.target}g
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.fat.consumed / todayStats.fat.target) * 100} 
                    className="h-2"
                  />
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
                    {weeklyProgress.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-8">{day.day}</span>
                        <div className="flex-1 mx-4">
                          <Progress 
                            value={day.calories > 0 ? (day.calories / 2200) * 100 : 0} 
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
                    <span>Makanan Hari Ini</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMeals.map((meal, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-smartfood-50 rounded-lg">
                        <span className="text-2xl">{meal.image}</span>
                        <div className="flex-1">
                          <div className="font-medium">{meal.name}</div>
                          <div className="text-sm text-muted-foreground">{meal.time}</div>
                        </div>
                        <Badge variant="outline">{meal.calories} kal</Badge>
                      </div>
                    ))}
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
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Fitur Dalam Pengembangan
                  </h3>
                  <p className="text-muted-foreground">
                    Riwayat makanan lengkap akan tersedia segera dengan filter tanggal dan analisis trend.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-smartfood-600" />
                    <span>Profil Pengguna</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama</span>
                    <span className="font-medium">Pengguna Demo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usia</span>
                    <span className="font-medium">25 tahun</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Berat Badan</span>
                    <span className="font-medium">65 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tinggi Badan</span>
                    <span className="font-medium">170 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target</span>
                    <Badge className="bg-smartfood-100 text-smartfood-800">Menjaga Berat</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-smartfood-600" />
                    <span>Target Harian</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kalori</span>
                    <span className="font-medium">2200 kal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-medium">120g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Karbohidrat</span>
                    <span className="font-medium">275g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lemak</span>
                    <span className="font-medium">80g</span>
                  </div>
                  <Button className="w-full mt-4 bg-smartfood-600 hover:bg-smartfood-700">
                    Edit Profil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
