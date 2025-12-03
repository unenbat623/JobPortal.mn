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
          <div className="flex gap-4">
            {job.logo && (
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-lg object-cover shadow-sm"
              />
            )}
            <div>
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <p
                className="text-lg font-semibold text-primary hover:underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/company/${job.company.toLowerCase().replace(/\s/g, '-')}`);
                }}
              >
                {job.company}
              </p>
            </div>
          </div>
          <Badge variant="secondary">{job.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{job.experience}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
          <Button className="w-full mt-2" onClick={(e) => {
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
