import { MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/contexts/JobContext';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Badge variant="secondary">{job.category}</Badge>
        </div>
        <p 
          className="text-lg font-semibold text-primary hover:underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/company/${job.company.toLowerCase().replace(/\s/g, '-')}`);
          }}
        >
          {job.company}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            {job.salary}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            {job.experience}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
          <Button className="w-full mt-4" onClick={(e) => {
            e.stopPropagation();
            navigate(`/jobs/${job.id}`);
          }}>
            Дэлгэрэнгүй үзэх
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
