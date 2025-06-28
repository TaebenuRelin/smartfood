
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, BarChart3, Home, Menu } from "lucide-react";

interface HeaderProps {
  currentView: 'home' | 'scanner' | 'dashboard';
  onViewChange: (view: 'home' | 'scanner' | 'dashboard') => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-smartfood-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-food-gradient rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-smartfood-600 to-smartfood-800 bg-clip-text text-transparent">
                SmartFood
              </h1>
              <Badge variant="secondary" className="text-xs">AI Powered</Badge>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              onClick={() => onViewChange('home')}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </Button>
            <Button
              variant={currentView === 'scanner' ? 'default' : 'ghost'}
              onClick={() => onViewChange('scanner')}
              className="flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Scanner</span>
            </Button>
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onViewChange('dashboard')}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
