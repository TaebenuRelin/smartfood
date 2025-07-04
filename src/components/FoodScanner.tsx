import NutritionDetailsModal from "./NutritionDetailsModal";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Upload,
  ArrowLeft,
  Zap,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import multer from "multer";
import { useAuth } from "@/contexts/AuthContext";

interface FoodScannerProps {
  onBackToHome: () => void;
}

const FoodScanner = ({ onBackToHome }: FoodScannerProps) => {
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Gagal Upload',
          description: 'File harus berupa gambar (jpg, png, dsb).'
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Gagal Upload',
          description: 'Ukuran gambar maksimal 5MB.'
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      toast({
        title: 'Gagal Analisis',
        description: 'Silakan pilih gambar makanan terlebih dahulu.'
      });
      return;
    }
    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisResult(null);
    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    try {
      const response = await fetch('http://localhost:3000/api/gemini-food-analysis/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (!response.ok) {
        setAnalysisResult({ message: data.message || 'Gagal menganalisis gambar.' });
        toast({
          title: 'Gagal Analisis',
          description: data.message || 'Gagal menganalisis gambar.'
        });
        return;
      }
      const foodName = data.foodName || data.nama;
      if (!foodName || foodName.toLowerCase().includes('tidak dikenali')) {
        setAnalysisResult({ message: 'AI tidak dapat mengenali makanan dari gambar ini. Coba gambar lain.' });
        toast({
          title: 'Gagal Analisis',
          description: 'AI tidak dapat mengenali makanan dari gambar ini. Coba gambar lain.'
        });
        return;
      }
      setAnalysisResult({
        ...data,
        nutrition: data.nutrition || data.nutrisi,
        foodName: data.foodName || data.nama,
        portion: data.portion || data.porsi,
      });
    } catch (error) {
      setIsAnalyzing(false);
      setAnalysisResult({ message: error.message });
      toast({
        title: 'Gagal Analisis',
        description: error.message || 'Terjadi kesalahan saat menganalisis gambar makanan.'
      });
    }
  };

  const handleSaveHistory = async () => {
    if (!analysisResult || !user) return;
    try {
      const payload = {
        user: user.id,
        foodName: analysisResult.foodName || analysisResult.nama,
        calories: analysisResult.nutrition?.calories || analysisResult.nutrition?.kalori,
        protein: analysisResult.nutrition?.protein,
        fat: analysisResult.nutrition?.fat || analysisResult.nutrition?.lemak,
        carbs: analysisResult.nutrition?.carbs || analysisResult.nutrition?.karbohidrat,
        createdAt: new Date().toISOString(),
      };
      const response = await fetch('http://localhost:3000/api/nutrition-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Berhasil',
          description: 'Berhasil disimpan ke riwayat!'
        });
      } else {
        toast({
          title: 'Gagal',
          description: 'Gagal menyimpan riwayat: ' + data.message
        });
      }
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal menyimpan riwayat: ' + (error as Error).message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-smartfood-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBackToHome} className="mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-smartfood-800">
              Scanner Makanan AI
            </h1>
            <p className="text-muted-foreground">
              Upload foto makanan untuk mendapatkan informasi nutrisi instan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-6 h-6 text-smartfood-600" />
                <span>Upload Gambar Makanan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="border-2 border-dashed border-smartfood-300 rounded-xl p-8 text-center cursor-pointer hover:border-smartfood-400 transition-colors bg-smartfood-50/50"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected food"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Ganti Gambar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-16 h-16 text-smartfood-400 mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-smartfood-700">
                        Pilih gambar makanan
                      </p>
                      <p className="text-muted-foreground">
                        Klik untuk upload atau drag & drop
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {selectedImage && !isAnalyzing && !analysisResult && (
                <Button
                  onClick={handleAnalyze}
                  className="w-full bg-food-gradient hover:scale-105 transition-transform"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Analisis Makanan
                </Button>
              )}

              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="font-semibold text-smartfood-700 mb-2">
                      Menganalisis makanan...
                    </p>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {progress}% selesai
                    </p>
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground bg-smartfood-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Tips untuk hasil terbaik:</p>
                <ul className="space-y-1">
                  <li>• Pastikan gambar jelas dan terang</li>
                  <li>• Makanan terlihat jelas dalam frame</li>
                  <li>• Hindari bayangan yang terlalu gelap</li>
                  <li>• Ukuran file maksimal 5MB</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult && analysisResult.nutrition ? (
              <>
                <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-smartfood-800">
                        Hasil Identifikasi
                      </span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {analysisResult.confidence}% yakin
                        </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-smartfood-700">
                          {analysisResult.foodName || analysisResult.nama}
                        </h3>
                          <p className="text-muted-foreground">
                            {analysisResult.portion || analysisResult.porsi}
                          </p>
                      </div>

                      {Array.isArray(analysisResult.allergens) && analysisResult.allergens.length > 0 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-orange-600" />
                              <span className="font-semibold text-orange-800">
                                Potensi Alergen
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.allergens.map(
                                (allergen: string, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="border-orange-300 text-orange-700"
                                  >
                                    {allergen}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-smartfood-200">
                  <CardHeader>
                    <CardTitle className="text-smartfood-800">
                      Informasi Nutrisi
                    </CardTitle>
                  </CardHeader>
                  {/* UPDATED CONTENT STARTS HERE */}
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="text-center p-4 bg-smartfood-50 rounded-lg">
                              <div className="text-2xl font-bold text-smartfood-600">
                            {analysisResult.nutrition.calories || analysisResult.nutrition.kalori}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Kalori
                              </div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                            {analysisResult.nutrition.protein}g
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Protein
                              </div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                              <div className="text-2xl font-bold text-yellow-600">
                            {analysisResult.nutrition.carbs || analysisResult.nutrition.karbohidrat}g
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Karbohidrat
                              </div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                              <div className="text-2xl font-bold text-red-600">
                            {analysisResult.nutrition.fat || analysisResult.nutrition.lemak}g
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Lemak
                              </div>
                            </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={() => setShowNutritionModal(true)}
                      >
                        Lihat Detail
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Serat</span>
                      <span className="font-semibold">
                        {analysisResult.nutrition.fiber || analysisResult.nutrition.serat}g
                      </span>
                    </div>
                    <NutritionDetailsModal
                      open={showNutritionModal}
                      onClose={() => setShowNutritionModal(false)}
                      nutrition={analysisResult.nutrition}
                    />
                  </CardContent>
                  {/* UPDATED CONTENT ENDS HERE */}
                </Card>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-smartfood-600 hover:bg-smartfood-700" onClick={handleSaveHistory}>
                    Simpan ke Riwayat
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Bagikan
                  </Button>
                </div>
              </>
            ) : analysisResult && !analysisResult.nutrition ? (
              <Card className="bg-red-50 border border-red-200">
                <CardContent className="p-8 text-center text-red-600">
                  <h3 className="text-lg font-semibold mb-2">Gagal Analisis</h3>
                  <p>{analysisResult.message || 'Gagal mendapatkan hasil analisis. Coba upload gambar lain.'}</p>
                </CardContent>
              </Card>
            ) : !analysisResult && !isAnalyzing ? (
              <Card className="bg-gradient-to-br from-smartfood-100 to-smartfood-200 border-smartfood-300">
                <CardContent className="p-8 text-center">
                  <Camera className="w-16 h-16 text-smartfood-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-smartfood-800 mb-2">
                    Siap untuk Scan?
                  </h3>
                  <p className="text-smartfood-700">
                    Upload gambar makanan untuk melihat informasi nutrisi
                    lengkap dengan teknologi AI terdepan.
                  </p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodScanner;
