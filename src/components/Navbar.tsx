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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-primary">
            JobPortal.mn
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
              Ажлын зарууд
            </Link>
            <Link to="/companies" className="text-sm font-medium hover:text-primary transition-colors">
              Компаниуд
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Үнийн санал
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="gap-2">
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
            <Button onClick={onAuthClick} variant="secondary" className="bg-white text-purple-600 hover:bg-white/90 font-semibold shadow-md">
              Нэвтрэх / Бүртгүүлэх
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
