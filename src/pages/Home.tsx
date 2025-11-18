import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Building2, Users, Briefcase } from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { useJobs } from '@/contexts/JobContext';

export default function Home() {
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedCategory) params.append('category', selectedCategory);
    navigate(`/jobs?${params.toString()}`);
  };

  const latestJobs = jobs.filter(job => job.status === 'approved').slice(0, 6);

  const companies = [
    { name: 'LendMN', logo: '🏦' },
    { name: 'Tiger Finance', logo: '🐅' },
    { name: 'Таван Богд', logo: '⛰️' },
    { name: 'AND Systems', logo: '💻' },
    { name: 'G-Mobile', logo: '📱' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Монголын хамгийн том ажлын сан
          </h1>
          <p className="text-xl text-white/90 mb-12">
            Мянга мянган ажлын зар. Таны мөрөөдлийн ажил энд байна.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-xl shadow-2xl p-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Ажлын нэр, түлхүүр үг..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-1"
              />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Хот сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх хот</SelectItem>
                  <SelectItem value="Улаанбаатар">Улаанбаатар</SelectItem>
                  <SelectItem value="Дархан">Дархан</SelectItem>
                  <SelectItem value="Эрдэнэт">Эрдэнэт</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Ангилал сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх ангилал</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Санхүү">Санхүү</SelectItem>
                  <SelectItem value="Үйлчилгээ">Үйлчилгээ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} size="lg" className="w-full">
              <Search className="mr-2 h-5 w-5" />
              Ажлын зар хайх
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{jobs.filter(j => j.status === 'approved').length}+</h3>
              <p className="text-muted-foreground">Идэвхтэй ажлын зар</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Компани</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Ажил хайгч</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Шинэ ажлын зарууд</h2>
              <p className="text-muted-foreground">Саяхан нэмэгдсэн ажлын байр</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/jobs')}>
              Бүгдийг үзэх
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Тэргүүлэгч компаниуд</h2>
            <p className="text-muted-foreground">Монголын шилдэг компаниудын ажлын зар</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {companies.map((company) => (
              <div
                key={company.name}
                className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{company.logo}</div>
                <p className="font-semibold">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="container mx-auto max-w-3xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Та ажил олгогч уу?</h2>
          <p className="text-xl mb-8 text-white/90">
            Монголын мянга мянган ажил хайгчдад хүрч, шилдэг ажилчдыг олоорой
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/pricing')}>
            Ажлын зар нийтлэх
          </Button>
        </div>
      </section>
    </div>
  );
}
