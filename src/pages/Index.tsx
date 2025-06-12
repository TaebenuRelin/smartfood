import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, History, User, BarChart3, Shield, Zap, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FoodScanner from "@/components/FoodScanner";
import Dashboard from "@/components/Dashboard";
import { useFoods, useCategories } from '@/hooks/use-api';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'scanner' | 'dashboard'>('home');
  const { toast } = useToast();
  const { data: foods, isLoading: isLoadingFoods, error: foodsError } = useFoods();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const handleViewChange = (view: 'home' | 'scanner' | 'dashboard') => {
    setCurrentView(view);
    toast({
      title: "Navigasi",
      description: `Beralih ke ${view === 'home' ? 'beranda' : view === 'scanner' ? 'scanner makanan' : 'dashboard'}`,
    });
  };

  if (foodsError) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-500">
          Error loading foods: {foodsError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-smartfood-50 via-white to-smartfood-100">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      
      {currentView === 'home' && (
        <div className="animate-fade-in">
          <Hero onStartScanning={() => handleViewChange('scanner')} />
          <Features />
        </div>
      )}
      
      {currentView === 'scanner' && (
        <div className="animate-slide-up">
          <FoodScanner onBackToHome={() => handleViewChange('home')} />
        </div>
      )}
      
      {currentView === 'dashboard' && (
        <div className="animate-slide-up">
          <Dashboard onBackToHome={() => handleViewChange('home')} />
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-smartfood-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-smartfood-300 to-smartfood-100 bg-clip-text text-transparent">
                SmartFood
              </h3>
              <p className="text-smartfood-200">
                Platform berbasis AI untuk deteksi makanan dan informasi gizi otomatis
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fitur</h4>
              <ul className="space-y-2 text-smartfood-300">
                <li>Deteksi Makanan AI</li>
                <li>Informasi Gizi</li>
                <li>Riwayat Makanan</li>
                <li>Dashboard Personal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tentang</h4>
              <ul className="space-y-2 text-smartfood-300">
                <li>Tim Pengembang</li>
                <li>Visi & Misi</li>
                <li>Kontak</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Keamanan</h4>
              <ul className="space-y-2 text-smartfood-300">
                <li>Privasi Data</li>
                <li>Keamanan</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-smartfood-700 mt-8 pt-8 text-center text-smartfood-400">
            <p>&copy; 2025 SmartFood. Dikembangkan dengan ❤️ untuk hidup yang lebih sehat.</p>
          </div>
        </div>
      </footer>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Menu Kami</h1>
        
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kategori</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {isLoadingCategories ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))
            ) : (
              categories?.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  {category.name}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoadingFoods ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="food-card-hover">
                <CardHeader>
                  <Skeleton className="h-48 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : (
            foods?.map((food) => (
              <Card key={food.id} className="food-card-hover">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    {food.image_url ? (
                      <img
                        src={food.image_url}
                        alt={food.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <Badge
                      className="absolute top-2 right-2"
                      variant={food.is_available ? "default" : "destructive"}
                    >
                      {food.is_available ? "Tersedia" : "Habis"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-1">{food.name}</CardTitle>
                  <CardDescription className="mb-2">
                    {food.description || "Tidak ada deskripsi"}
                  </CardDescription>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">
                      {formatCurrency(food.price)}
                    </span>
                    <Badge variant="outline">{food.categories.name}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
