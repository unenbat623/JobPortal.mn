import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, LogOut, User, Building2, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onAuthClick: () => void;
}

export const Navbar = ({ onAuthClick }: NavbarProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'employer') return '/employer';
    return '/candidate';
  };

  return (
    <nav className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Briefcase className="h-7 w-7" />
            <span>JobPortal.mn</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Нүүр
            </Link>
            <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">
              Ажлын зарууд
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Үнэ
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    {user?.role === 'admin' && <Shield className="mr-2 h-4 w-4" />}
                    {user?.role === 'employer' && <Building2 className="mr-2 h-4 w-4" />}
                    {user?.role === 'candidate' && <User className="mr-2 h-4 w-4" />}
                    {user?.role === 'admin' && 'Админ самбар'}
                    {user?.role === 'employer' && 'Ажил олгогч'}
                    {user?.role === 'candidate' && 'Миний самбар'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Гарах
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onAuthClick}>
                Нэвтрэх / Бүртгүүлэх
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
