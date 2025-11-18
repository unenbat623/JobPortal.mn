import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/contexts/JobContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Eye, Users, Briefcase, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const { jobs, approveJob, rejectJob, deleteJob } = useJobs();

  const pendingJobs = jobs.filter(job => job.status === 'pending');
  const approvedJobs = jobs.filter(job => job.status === 'approved');
  const rejectedJobs = jobs.filter(job => job.status === 'rejected');

  const handleApprove = (jobId: string) => {
    approveJob(jobId);
    toast.success('Ажлын зар батлагдлаа!');
  };

  const handleReject = (jobId: string) => {
    rejectJob(jobId);
    toast.success('Ажлын зар татгалзлаа!');
  };

  const handleDelete = (jobId: string) => {
    if (confirm('Та энэ ажлын зарыг устгахдаа итгэлтэй байна уу?')) {
      deleteJob(jobId);
      toast.success('Ажлын зар устгагдлаа');
    }
  };

  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants.length, 0);
  const topViewedJob = jobs.reduce((max, job) => 
    job.applicants.length > (max?.applicants.length || 0) ? job : max, 
    jobs[0]
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Админ самбар</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Нийт зар</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Батлагдсан</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedJobs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Хүлээгдэж буй</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingJobs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Нийт өргөдөл</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplicants}</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Job */}
        {topViewedJob && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Хамгийн их өргөдөлтэй зар
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{topViewedJob.title}</h3>
                  <p className="text-muted-foreground">{topViewedJob.company}</p>
                </div>
                <Badge className="text-lg px-4 py-2">
                  {topViewedJob.applicants.length} өргөдөл
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Jobs Management */}
        <Card>
          <CardHeader>
            <CardTitle>Ажлын зарууд</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Хүлээгдэж буй ({pendingJobs.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Батлагдсан ({approvedJobs.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Татгалзсан ({rejectedJobs.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingJobs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Хүлээгдэж буй зар байхгүй
                  </p>
                ) : (
                  pendingJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location} • {job.category}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Цалин: {job.salary}
                          </p>
                        </div>
                        <Badge variant="secondary">Хүлээгдэж буй</Badge>
                      </div>
                      <p className="text-sm mb-4">{job.description}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(job.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Батлах
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(job.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Татгалзах
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(job.id)}
                        >
                          Устгах
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                {approvedJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <Badge className="bg-success">Батлагдсан</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.applicants.length} өргөдөл
                    </p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4">
                {rejectedJobs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Татгалзсан зар байхгүй
                  </p>
                ) : (
                  rejectedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </p>
                        </div>
                        <Badge variant="destructive">Татгалзсан</Badge>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
