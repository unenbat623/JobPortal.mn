import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Building2, MapPin, Users, Globe, Star, Briefcase } from 'lucide-react';
import { useJobs } from '@/contexts/JobContext';

interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  founded: string;
  rating: number;
  totalReviews: number;
  benefits: string[];
  culture: string;
}

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  pros: string;
  cons: string;
  helpful: number;
}

const companies: Record<string, Company> = {
  'lendmn': {
    id: 'lendmn',
    name: 'LendMN',
    logo: 'LM',
    description: 'LendMN нь Монголын санхүүгийн салбарын тэргүүлэгч компани бөгөөд олон нийтэд зээл, санхүүгийн үйлчилгээ үзүүлдэг. Бид технологи, инновацид тулгуурласан шийдлүүдээр хэрэглэгчдэд хялбар, найдвартай үйлчилгээ санал болгодог.',
    industry: 'Санхүү/Зээл',
    size: '100-200 ажилтан',
    location: 'Улаанбаатар, Монгол',
    website: 'www.lendmn.mn',
    founded: '2015',
    rating: 4.5,
    totalReviews: 47,
    benefits: ['Эрүүл мэндийн даатгал', 'Урамшуулал, шагнал', 'Гадаад сургалт', 'Уян хатан цагийн хуваарь', 'Хамт олны арга хэмжээ'],
    culture: 'Бид залуу, эрч хүчтэй баг бөгөөд инновацид нээлттэй орчинг бүрдүүлдэг. Ажилтан бүрийн санаа бодлыг үнэлж, хамтын ажиллагааг дэмждэг.'
  },
  'tiger-finance': {
    id: 'tiger-finance',
    name: 'Tiger Finance',
    logo: 'TF',
    description: 'Tiger Finance нь санхүүгийн зөвлөгөө, хөрөнгө оруулалтын үйлчилгээ үзүүлдэг байгууллага юм. Бид хувь хүн болон байгууллагуудад мэргэжлийн санхүүгийн шийдэл санал болгодог.',
    industry: 'Санхүү/Хөрөнгө оруулалт',
    size: '50-100 ажилтан',
    location: 'Улаанбаатар, Монгол',
    website: 'www.tigerfinance.mn',
    founded: '2018',
    rating: 4.2,
    totalReviews: 32,
    benefits: ['Эрүүл мэндийн даатгал', 'Ажлын гүйцэтгэлийн урамшуулал', 'Мэргэжлийн хөгжил', 'Амралтын нэмэгдэл өдөр'],
    culture: 'Бид мэргэжлийн, найрсаг орчинг бүрдүүлж, ажилтан бүрийн хувийн хөгжилд анхаарч ажилладаг.'
  },
  'tavan-bogd': {
    id: 'tavan-bogd',
    name: 'Таван Богд',
    logo: 'ТБ',
    description: 'Таван Богд групп нь үл хөдлөх хөрөнгө, барилга, зочид буудлын чиглэлээр үйл ажиллагаа явуулдаг томоохон групп компани юм.',
    industry: 'Үл хөдлөх хөрөнгө/Барилга',
    size: '200+ ажилтан',
    location: 'Улаанбаатар, Монгол',
    website: 'www.tavanbogd.mn',
    founded: '2005',
    rating: 4.3,
    totalReviews: 68,
    benefits: ['Эрүүл мэндийн даатгал', 'Тээврийн зардал', 'Сургалт хөгжил', 'Амралтын байр', 'Урамшуулалын систем'],
    culture: 'Тогтвортой хөгжилд чиглэсэн, ажилтнуудаа хөгжүүлэхэд анхаардаг, уламжлалт үнэт зүйлтэй компани.'
  },
  'and-systems': {
    id: 'and-systems',
    name: 'AND Systems',
    logo: 'AS',
    description: 'AND Systems нь програм хангамж хөгжүүлэлт, системийн интеграци, IT зөвлөгөө үзүүлдэг технологийн компани юм. Бид олон улсын жишгийн шийдлүүдийг санал болгодог.',
    industry: 'IT/Програм хангамж',
    size: '50-100 ажилтан',
    location: 'Улаанбаатар, Монгол',
    website: 'www.andsystems.mn',
    founded: '2012',
    rating: 4.6,
    totalReviews: 54,
    benefits: ['Уян хатан цагийн хуваарь', 'Гэрээс ажиллах', 'Технологийн сургалт', 'Гадаад командировк', 'Эрүүл мэндийн даатгал'],
    culture: 'Технологи, инновацид дурлах багийнхан. Суралцах, туршиж үзэх, өөрийгөө хөгжүүлэх боломжоор дүүрэн.'
  },
  'g-mobile': {
    id: 'g-mobile',
    name: 'G-Mobile',
    logo: 'GM',
    description: 'G-Mobile нь Монголын тэргүүлэгч утасны операторын компани бөгөөд олон сая хэрэглэгчдэд үйлчилгээ үзүүлж байна.',
    industry: 'Телекомуникаци',
    size: '500+ ажилтан',
    location: 'Улаанбаатар, Монгол',
    website: 'www.gmobile.mn',
    founded: '2006',
    rating: 4.1,
    totalReviews: 89,
    benefits: ['Эрүүл мэндийн даатгал', 'Утасны хөнгөлөлт', 'Сургалт', 'Амралтын нэмэгдэл', 'Урамшуулал'],
    culture: 'Том байгууллагын тогтвортой, найдвартай орчин. Карьерын өсөлтийн олон боломжтой.'
  }
};

const reviews: Record<string, Review[]> = {
  'lendmn': [
    {
      id: '1',
      author: 'Б.Болд',
      role: 'Senior Developer',
      rating: 5,
      date: '2025-01-05',
      title: 'Маш сайн ажлын орчин',
      pros: 'Технологийн чиглэлээр маш сайн ажиллаж байгаа компани. Багийнхан туслалцаа, дэмжлэг үзүүлдэг. Цалин, нөхцөл сайн.',
      cons: 'Заримдаа ажлын ачаалал их байдаг.',
      helpful: 12
    },
    {
      id: '2',
      author: 'Э.Сарангэрэл',
      role: 'Product Manager',
      rating: 4,
      date: '2024-12-20',
      title: 'Хөгжлийн боломжтой',
      pros: 'Мэргэжлийн хөгжлийн маш их боломж. Менежмент сайн.',
      cons: 'Процесс заримдаа удаан байдаг.',
      helpful: 8
    }
  ],
  'tiger-finance': [
    {
      id: '1',
      author: 'Д.Мөнхбат',
      role: 'Financial Analyst',
      rating: 4,
      date: '2025-01-10',
      title: 'Мэргэжлийн баг',
      pros: 'Мэргэжлийн боловсон хүчин. Сайн сургалт, хөгжил.',
      cons: 'Ажлын даралт заримдаа их.',
      helpful: 6
    }
  ],
  'tavan-bogd': [
    {
      id: '1',
      author: 'Ц.Оюунаа',
      role: 'HR Specialist',
      rating: 4,
      date: '2024-12-28',
      title: 'Тогтвортой компани',
      pros: 'Тогтвортой, урт хугацааны ажлын байр. Олон давуу тал.',
      cons: 'Шинэчлэл удаан.',
      helpful: 10
    }
  ],
  'and-systems': [
    {
      id: '1',
      author: 'Г.Батбаяр',
      role: 'Frontend Developer',
      rating: 5,
      date: '2025-01-08',
      title: 'IT-д сайн компани',
      pros: 'Шинэ технологи, суралцах боломж их. Уян хатан цагийн хуваарь.',
      cons: 'Ажлын орон зай жижиг.',
      helpful: 15
    }
  ],
  'g-mobile': [
    {
      id: '1',
      author: 'П.Ганзориг',
      role: 'Customer Service',
      rating: 4,
      date: '2024-12-15',
      title: 'Том компанийн туршлага',
      pros: 'Том компанийн найдвартай орчин. Давуу тал их.',
      cons: 'Хурдан өсөх боломж багатай.',
      helpful: 7
    }
  ]
};

export default function CompanyProfile() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();

  const company = companies[companyId?.toLowerCase().replace(/\s/g, '-') || ''];
  const companyReviews = reviews[companyId?.toLowerCase().replace(/\s/g, '-') || ''] || [];
  const companyJobs = jobs.filter(job => 
    job.company.toLowerCase().replace(/\s/g, '-') === companyId?.toLowerCase().replace(/\s/g, '-')
  );

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Компани олдсонгүй</h2>
          <Button onClick={() => navigate('/jobs')}>Буцах</Button>
        </div>
      </div>
    );
  }

  const ratingDistribution = [
    { stars: 5, count: Math.floor(company.totalReviews * 0.4), percentage: 40 },
    { stars: 4, count: Math.floor(company.totalReviews * 0.35), percentage: 35 },
    { stars: 3, count: Math.floor(company.totalReviews * 0.15), percentage: 15 },
    { stars: 2, count: Math.floor(company.totalReviews * 0.07), percentage: 7 },
    { stars: 1, count: Math.floor(company.totalReviews * 0.03), percentage: 3 },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← Буцах
        </Button>

        {/* Company Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24 rounded-lg">
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground rounded-lg">
                  {company.logo}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-semibold">{company.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({company.totalReviews} үнэлгээ)
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {company.industry}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Үүсгэн байгуулагдсан: {company.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">Танилцуулга</TabsTrigger>
            <TabsTrigger value="reviews">Үнэлгээ ({company.totalReviews})</TabsTrigger>
            <TabsTrigger value="jobs">Ажлын зар ({companyJobs.length})</TabsTrigger>
            <TabsTrigger value="benefits">Давуу тал</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Компанийн тухай</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ажлын соёл</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.culture}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Үнэлгээний хураангуй</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-bold mb-2">{company.rating}</div>
                    <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(company.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{company.totalReviews} үнэлгээ</div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {ratingDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm">{dist.stars}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress value={dist.percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {dist.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {companyReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-sm text-muted-foreground">• {review.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('mn-MN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{review.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-semibold text-green-600">Давуу тал: </span>
                    <span className="text-muted-foreground">{review.pros}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-600">Сул тал: </span>
                    <span className="text-muted-foreground">{review.cons}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <Button variant="ghost" size="sm">
                      👍 Тустай ({review.helpful})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            {companyJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Одоогоор нээлттэй ажлын зар байхгүй байна</p>
                </CardContent>
              </Card>
            ) : (
              companyJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/jobs/${job.id}`)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.experience}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{job.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-accent">{job.salary}</span>
                      <Button variant="outline">Дэлгэрэнгүй</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Ажилтны давуу тал</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary">✓</span>
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
