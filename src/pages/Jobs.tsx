import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { JobCard } from '@/components/JobCard';
import { useJobs } from '@/contexts/JobContext';
import { Search } from 'lucide-react';

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const { jobs } = useJobs();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 10000000]);

  useEffect(() => {
    if (searchParams.get('search')) setSearchTerm(searchParams.get('search') || '');
    if (searchParams.get('city')) setSelectedCity(searchParams.get('city') || 'all');
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const filteredJobs = jobs
    .filter(job => job.status === 'approved')
    .filter(job => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = selectedCity === 'all' || job.location === selectedCity;
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesExperience = selectedExperience === 'all' || job.experience === selectedExperience;
      const matchesSalary = job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1];

      return matchesSearch && matchesCity && matchesCategory && matchesExperience && matchesSalary;
    });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Ажлын зарууд</h1>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border space-y-6">
              <h2 className="text-xl font-semibold mb-4">Шүүлтүүр</h2>
              
              <div className="space-y-2">
                <Label>Түлхүүр үг</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Хот</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Бүх хот</SelectItem>
                    <SelectItem value="Улаанбаатар">Улаанбаатар</SelectItem>
                    <SelectItem value="Дархан">Дархан</SelectItem>
                    <SelectItem value="Эрдэнэт">Эрдэнэт</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ангилал</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
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

              <div className="space-y-2">
                <Label>Туршлага</Label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Бүх түвшин</SelectItem>
                    <SelectItem value="Интерн">Интерн</SelectItem>
                    <SelectItem value="Шинэ төгсөгч">Шинэ төгсөгч</SelectItem>
                    <SelectItem value="Дунд түвшин">Дунд түвшин</SelectItem>
                    <SelectItem value="Ахлах">Ахлах</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Цалингийн хязгаар</Label>
                <Slider
                  min={0}
                  max={10000000}
                  step={500000}
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{(salaryRange[0] / 1000000).toFixed(1)}М₮</span>
                  <span>{(salaryRange[1] / 1000000).toFixed(1)}М₮</span>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredJobs.length}</span> ажлын зар олдлоо
              </p>
            </div>
            
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border">
                <p className="text-xl text-muted-foreground">Шүүлтэд тохирох ажлын зар олдсонгүй</p>
                <p className="text-sm text-muted-foreground mt-2">Шүүлтүүрээ өөрчилж дахин оролдоно уу</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
