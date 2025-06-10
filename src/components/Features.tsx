
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, BarChart3, History, User, Shield, Zap, Target, AlertTriangle } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Pengenalan Makanan Otomatis",
      description: "AI canggih yang mampu mengenali 50+ jenis makanan populer dari foto yang Anda ambil",
      badge: "AI Powered",
      color: "bg-blue-500"
    },
    {
      icon: BarChart3,
      title: "Estimasi Kalori & Nutrisi",
      description: "Informasi lengkap kalori, protein, lemak, dan karbohidrat berdasarkan database nutrisi terpercaya",
      badge: "Akurat",
      color: "bg-green-500"
    },
    {
      icon: AlertTriangle,
      title: "Deteksi Potensi Alergi",
      description: "Identifikasi bahan makanan yang berpotensi menyebabkan alergi seperti kacang, susu, dan telur",
      badge: "Safety First",
      color: "bg-orange-500"
    },
    {
      icon: History,
      title: "Riwayat Makanan",
      description: "Pantau pola makan harian dan mingguan untuk membantu mencapai target kesehatan Anda",
      badge: "Tracking",
      color: "bg-purple-500"
    },
    {
      icon: User,
      title: "Profil Personal",
      description: "Rekomendasi nutrisi yang disesuaikan dengan usia, berat badan, tinggi, dan target kesehatan",
      badge: "Personalized",
      color: "bg-pink-500"
    },
    {
      icon: Shield,
      title: "Keamanan Data",
      description: "Data pribadi dan riwayat makanan dilindungi dengan enkripsi tingkat enterprise",
      badge: "Secure",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-smartfood-100 text-smartfood-800 border-smartfood-300">
            ✨ Fitur Unggulan
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-smartfood-600 to-smartfood-800 bg-clip-text text-transparent">
            Teknologi Terdepan untuk
            <br />
            Gaya Hidup Sehat
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SmartFood menggunakan kecerdasan buatan terbaru untuk memberikan pengalaman tracking nutrisi yang mudah, akurat, dan menyenangkan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-smartfood-200 food-card-hover bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-smartfood-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-smartfood-100 to-smartfood-200 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-smartfood-800 mb-4">
              Mengapa Memilih SmartFood?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-smartfood-600 mb-2">85%+</div>
                <div className="text-smartfood-700">Akurasi Deteksi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-smartfood-600 mb-2">&lt;5s</div>
                <div className="text-smartfood-700">Waktu Pemrosesan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-smartfood-600 mb-2">50+</div>
                <div className="text-smartfood-700">Jenis Makanan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
