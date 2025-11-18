import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/contexts/JobContext';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, DollarSign, Briefcase, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface JobDetailsProps {
  onAuthClick: () => void;
}

export default function JobDetails({ onAuthClick }: JobDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, applyToJob } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);

  const job = getJobById(id || '');

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ажлын зар олдсонгүй</h2>
          <Button onClick={() => navigate('/jobs')}>Буцах</Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      onAuthClick();
      return;
    }

    if (user?.role !== 'candidate') {
      toast.error('Зөвхөн ажил хайгч анкет илгээх боломжтой');
      return;
    }

    applyToJob(job.id, user.id);
    setHasApplied(true);
    toast.success('Анкет амжилттай илгээгдлээ!');
  };

  const isApplied = hasApplied || (user && job.applicants.includes(user.id));

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="outline" onClick={() => navigate('/jobs')} className="mb-6">
          ← Буцах
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                <div 
                  className="flex items-center gap-2 text-xl text-primary font-semibold mb-4 cursor-pointer hover:underline"
                  onClick={() => navigate(`/company/${job.company.toLowerCase().replace(/\s/g, '-')}`)}
                >
                  <Building2 className="h-5 w-5" />
                  {job.company}
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {job.category}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg font-semibold text-accent">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{job.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{new Date(job.postedDate).toLocaleDateString('mn-MN')}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Тайлбар</h3>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">Шаардлага</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">Гүйцэтгэх үүрэг</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              {isApplied ? (
                <Button size="lg" className="w-full" disabled>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Анкет илгээгдсэн
                </Button>
              ) : (
                <Button size="lg" className="w-full" onClick={handleApply}>
                  Анкет илгээх
                </Button>
              )}
              {!isAuthenticated && (
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Анкет илгээхийн тулд нэвтэрнэ үү
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
