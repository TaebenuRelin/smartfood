
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

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'scanner' | 'dashboard'>('home');
  const { toast } = useToast();

  const handleViewChange = (view: 'home' | 'scanner' | 'dashboard') => {
    setCurrentView(view);
    toast({
      title: "Navigasi",
      description: `Beralih ke ${view === 'home' ? 'beranda' : view === 'scanner' ? 'scanner makanan' : 'dashboard'}`,
    });
  };

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
    </div>
  );
};

export default Index;
