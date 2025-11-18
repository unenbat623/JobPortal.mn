import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const { login, signup } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<'candidate' | 'employer'>('candidate');
  
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState<'candidate' | 'employer'>('candidate');
  const [signupCompany, setSignupCompany] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword, loginRole);
      toast.success('Амжилттай нэвтэрлээ!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Нэвтрэх амжилтгүй боллоо');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(signupEmail, signupPassword, signupName, signupRole, signupCompany);
      toast.success('Амжилттай бүртгэгдлээ!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Бүртгэл амжилтгүй боллоо');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Тавтай морил</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
            <TabsTrigger value="signup">Бүртгүүлэх</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>И-мэйл</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Нууц үг</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Та хэн бэ?</Label>
                <RadioGroup value={loginRole} onValueChange={(value: 'candidate' | 'employer') => setLoginRole(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="login-candidate" />
                    <Label htmlFor="login-candidate">Ажил хайгч</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="login-employer" />
                    <Label htmlFor="login-employer">Ажил олгогч</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">
                Нэвтрэх
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Админ нэвтрэх: admin@jobportal.mn / admin123
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Нэр</Label>
                <Input
                  type="text"
                  placeholder="Таны нэр"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>И-мэйл</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Нууц үг</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Та хэн бэ?</Label>
                <RadioGroup value={signupRole} onValueChange={(value: 'candidate' | 'employer') => setSignupRole(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="signup-candidate" />
                    <Label htmlFor="signup-candidate">Ажил хайгч</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="signup-employer" />
                    <Label htmlFor="signup-employer">Ажил олгогч</Label>
                  </div>
                </RadioGroup>
              </div>

              {signupRole === 'employer' && (
                <div className="space-y-2">
                  <Label>Компанийн нэр</Label>
                  <Input
                    type="text"
                    placeholder="Компанийн нэр"
                    value={signupCompany}
                    onChange={(e) => setSignupCompany(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                Бүртгүүлэх
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
