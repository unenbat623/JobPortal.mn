import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs } from '@/contexts/JobContext';
import { Plus, Edit, Trash2, Users, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function Employer() {
  const { user } = useAuth();
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isEditJobOpen, setIsEditJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);

  const [companyProfile, setCompanyProfile] = useState({
    name: user?.companyName || 'Миний Компани',
    description: '',
    website: '',
    employees: '50-100',
  });

  const [newJob, setNewJob] = useState({
    title: '',
    location: 'Улаанбаатар',
    category: 'IT',
    salaryMin: 1000000,
    salaryMax: 2000000,
    experience: 'Дунд түвшин',
    description: '',
    requirements: '',
    responsibilities: '',
  });

  const myJobs = jobs.filter(job => job.employerId === user?.id || job.company === user?.companyName);

  const handleAddJob = () => {
    if (!newJob.title || !newJob.description) {
      toast.error('Ажлын нэр болон тайлбар заавал бөглөнө үү');
      return;
    }

    addJob({
      title: newJob.title,
      company: companyProfile.name,
      location: newJob.location,
      category: newJob.category,
      salary: `${(newJob.salaryMin / 1000000).toFixed(1)}-${(newJob.salaryMax / 1000000).toFixed(1)}М₮`,
      salaryMin: newJob.salaryMin,
      salaryMax: newJob.salaryMax,
      experience: newJob.experience,
      description: newJob.description,
      requirements: newJob.requirements.split('\n').filter(r => r.trim()),
      responsibilities: newJob.responsibilities.split('\n').filter(r => r.trim()),
      employerId: user?.id || 'unknown',
    });

    toast.success('Ажлын зар амжилттай нэмэгдлээ! Админ батлах хүлээгдэж байна.');
    setIsAddJobOpen(false);
    setNewJob({
      title: '',
      location: 'Улаанбаатар',
      category: 'IT',
      salaryMin: 1000000,
      salaryMax: 2000000,
      experience: 'Дунд түвшин',
      description: '',
      requirements: '',
      responsibilities: '',
    });
  };

  const handleEditJob = () => {
    if (!editingJob) return;

    updateJob(editingJob.id, {
      title: editingJob.title,
      location: editingJob.location,
      category: editingJob.category,
      salary: `${(editingJob.salaryMin / 1000000).toFixed(1)}-${(editingJob.salaryMax / 1000000).toFixed(1)}М₮`,
      salaryMin: editingJob.salaryMin,
      salaryMax: editingJob.salaryMax,
      experience: editingJob.experience,
      description: editingJob.description,
      requirements: editingJob.requirements,
      responsibilities: editingJob.responsibilities,
    });

    toast.success('Ажлын зар шинэчлэгдлээ!');
    setIsEditJobOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Та энэ ажлын зарыг устгахдаа итгэлтэй байна уу?')) {
      deleteJob(jobId);
      toast.success('Ажлын зар устгагдлаа');
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'approved') return <Badge className="bg-success">Батлагдсан</Badge>;
    if (status === 'rejected') return <Badge variant="destructive">Татгалзсан</Badge>;
    return <Badge variant="secondary">Хүлээгдэж буй</Badge>;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Ажил олгогчийн самбар</h1>
          <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ажлын зар нэмэх
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Шинэ ажлын зар</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Ажлын нэр *</Label>
                  <Input
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="Backend Developer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Байршил</Label>
                    <Select value={newJob.location} onValueChange={(value) => setNewJob({ ...newJob, location: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Улаанбаатар">Улаанбаатар</SelectItem>
                        <SelectItem value="Дархан">Дархан</SelectItem>
                        <SelectItem value="Эрдэнэт">Эрдэнэт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ангилал</Label>
                    <Select value={newJob.category} onValueChange={(value) => setNewJob({ ...newJob, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Санхүү">Санхүү</SelectItem>
                        <SelectItem value="Үйлчилгээ">Үйлчилгээ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Цалин (доод)</Label>
                    <Input
                      type="number"
                      value={newJob.salaryMin}
                      onChange={(e) => setNewJob({ ...newJob, salaryMin: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Цалин (дээд)</Label>
                    <Input
                      type="number"
                      value={newJob.salaryMax}
                      onChange={(e) => setNewJob({ ...newJob, salaryMax: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Туршлага</Label>
                  <Select value={newJob.experience} onValueChange={(value) => setNewJob({ ...newJob, experience: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Интерн">Интерн</SelectItem>
                      <SelectItem value="Шинэ төгсөгч">Шинэ төгсөгч</SelectItem>
                      <SelectItem value="Дунд түвшин">Дунд түвшин</SelectItem>
                      <SelectItem value="Ахлах">Ахлах</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Тайлбар *</Label>
                  <Textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Шаардлага (мөр бүр нэг шаардлага)</Label>
                  <Textarea
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    placeholder="React 3+ жил&#10;TypeScript мэддэг"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Гүйцэтгэх үүрэг (мөр бүр нэг үүрэг)</Label>
                  <Textarea
                    value={newJob.responsibilities}
                    onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                    placeholder="Frontend хөгжүүлэх&#10;Код review хийх"
                    rows={4}
                  />
                </div>

                <Button onClick={handleAddJob} className="w-full">
                  Зар нэмэх
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Company Profile */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Компанийн профайл</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Компанийн нэр</Label>
                <Input
                  value={companyProfile.name}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Вэбсайт</Label>
                <Input
                  value={companyProfile.website}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, website: e.target.value })}
                  placeholder="https://company.mn"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Танилцуулга</Label>
              <Textarea
                value={companyProfile.description}
                onChange={(e) => setCompanyProfile({ ...companyProfile, description: e.target.value })}
                rows={3}
              />
            </div>
            <Button onClick={() => toast.success('Профайл хадгалагдлаа!')}>Хадгалах</Button>
          </CardContent>
        </Card>

        {/* My Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Миний ажлын зарууд ({myJobs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {myJobs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Та одоогоор ажлын зар нэмээгүй байна
              </p>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.location} • {job.category}</p>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.applicants.length} өргөдөл
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {job.postedDate}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingJob(job);
                          setIsEditJobOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Засах
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Устгах
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ажлын зар засах</DialogTitle>
            </DialogHeader>
            {editingJob && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Ажлын нэр</Label>
                  <Input
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Тайлбар</Label>
                  <Textarea
                    value={editingJob.description}
                    onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button onClick={handleEditJob} className="w-full">
                  Хадгалах
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
