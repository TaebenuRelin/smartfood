import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from "@/contexts/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [targetCalories, setTargetCalories] = useState(2000);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [targetPurpose, setTargetPurpose] = useState('jaga berat badan');
  const [userId, setUserId] = useState<string | null>(null);
  const [targetWeight, setTargetWeight] = useState(0);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      setUserId(response.data.user?._id || response.data.data?._id || response.data.data?.user?._id || null);
      setShowProfileForm(true);
      toast({
        title: "Success!",
        description: "Akun berhasil dibuat. Silakan lengkapi data profil.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await axios.patch(`/api/auth/profile`, {
        userId,
        targetCalories,
        height,
        weight,
        targetPurpose,
        targetWeight: (targetPurpose === 'menurunkan berat badan' || targetPurpose === 'menaikkan berat badan') ? targetWeight : undefined,
      });
      toast({
        title: "Profil Berhasil Disimpan",
        description: "Data profil berhasil ditambahkan.",
        variant: "default",
      });
      if (res.data && res.data.user) {
        const token = localStorage.getItem('authToken');
        login({ user: { ...res.data.user, id: res.data.user._id }, token });
      }
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Gagal Menyimpan Profil",
        description: error.response?.data?.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showProfileForm) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleProfileSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">Lengkapi Data Profil</CardTitle>
              <CardDescription>
                Masukkan data nutrisi harian dan tujuan penggunaan website.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="targetCalories">Target Kalori per Hari</Label>
                <Input id="targetCalories" type="number" required value={targetCalories} onChange={e => setTargetCalories(Number(e.target.value))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">Tinggi Badan (cm)</Label>
                <Input id="height" type="number" required value={height} onChange={e => setHeight(Number(e.target.value))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Berat Badan (kg)</Label>
                <Input id="weight" type="number" required value={weight} onChange={e => setWeight(Number(e.target.value))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetPurpose">Tujuan Penggunaan</Label>
                <select id="targetPurpose" className="border rounded px-2 py-1" value={targetPurpose} onChange={e => setTargetPurpose(e.target.value)} required>
                  <option value="diet">Diet</option>
                  <option value="jaga berat badan">Jaga Berat Badan</option>
                  <option value="menurunkan berat badan">Menurunkan Berat Badan</option>
                  <option value="menaikkan berat badan">Menaikkan Berat Badan</option>
                </select>
              </div>
              {targetPurpose === 'menurunkan berat badan' && (
                <div className="grid gap-2">
                  <Label htmlFor="targetWeight">Target Berat Badan Akhir (kg)</Label>
                  <Input id="targetWeight" type="number" required value={targetWeight || ''} onChange={e => setTargetWeight(Number(e.target.value))} />
                </div>
              )}
              {targetPurpose === 'menaikkan berat badan' && (
                <div className="grid gap-2">
                  <Label htmlFor="targetWeight">Target Berat Badan Akhir (kg)</Label>
                  <Input id="targetWeight" type="number" required value={targetWeight || ''} onChange={e => setTargetWeight(Number(e.target.value))} />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit" disabled={isLoading || !userId}>
                {isLoading ? 'Menyimpan...' : 'Simpan Profil'}
              </Button>
              {!userId && (
                <div className="text-red-500 text-sm mt-2">
                  Gagal membuat akun. Silakan register ulang dengan email yang berbeda.
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Create your account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
