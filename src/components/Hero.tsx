
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Zap, Target, Shield } from "lucide-react";

interface HeroProps {
  onStartScanning: () => void;
}

const Hero = ({ onStartScanning }: HeroProps) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-smartfood-100/50 to-smartfood-200/30 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-smartfood-300/20 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-smartfood-100 text-smartfood-800 border-smartfood-300">
            🚀 Platform AI Terdepan untuk Deteksi Makanan
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-smartfood-600 via-smartfood-700 to-smartfood-800 bg-clip-text text-transparent leading-tight">
            Kenali Makananmu,
            <br />
            Jaga Kesehatanmu
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Cukup ambil foto makanan, dan biarkan AI kami memberikan informasi nutrisi lengkap secara instan. 
            Pantau pola makan dan capai target kesehatan Anda dengan mudah.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={onStartScanning}
              size="lg" 
              className="bg-food-gradient hover:scale-105 transition-transform text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl"
            >
              <Camera className="w-6 h-6 mr-3" />
              Mulai Scan Makanan
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-smartfood-300 text-smartfood-700 hover:bg-smartfood-50 text-lg px-8 py-6 rounded-xl"
            >
              Lihat Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-smartfood-200 food-card-hover">
              <div className="w-14 h-14 bg-smartfood-500 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Deteksi Instan</h3>
              <p className="text-muted-foreground text-center">Identifikasi makanan dalam hitungan detik dengan akurasi tinggi</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-smartfood-200 food-card-hover">
              <div className="w-14 h-14 bg-smartfood-600 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Info Gizi Akurat</h3>
              <p className="text-muted-foreground text-center">Kalori, protein, lemak, dan karbohidrat dengan data terpercaya</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-smartfood-200 food-card-hover">
              <div className="w-14 h-14 bg-smartfood-700 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Data Aman</h3>
              <p className="text-muted-foreground text-center">Privasi terjamin dengan enkripsi tingkat enterprise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
