import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs } from '@/contexts/JobContext';
import { User, Mail, Phone, MapPin, Upload, Plus, X, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Candidate() {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+976',
    location: 'Улаанбаатар',
    bio: '',
  });

  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const [education, setEducation] = useState([
    { school: 'МУИС', degree: 'Бакалавр', field: 'Мэдээлэл технологи', year: '2020-2024' },
  ]);

  const [experience, setExperience] = useState([
    { company: 'Tech Company', position: 'Junior Developer', period: '2023-2024', description: 'Web хөгжүүлэлт' },
  ]);

  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);

  const [newEducation, setNewEducation] = useState({ school: '', degree: '', field: '', year: '' });
  const [newExperience, setNewExperience] = useState({ company: '', position: '', period: '', description: '' });

  const handleAddEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation({ school: '', degree: '', field: '', year: '' });
    setIsAddEducationOpen(false);
  };

  const handleAddExperience = () => {
    setExperience([...experience, newExperience]);
    setNewExperience({ company: '', position: '', period: '', description: '' });
    setIsAddExperienceOpen(false);
  };

  const handleSaveProfile = () => {
    toast.success('Профайл амжилттай шинэчлэгдлээ!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const appliedJobs = jobs.filter(job => user && job.applicants.includes(user.id));

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Миний самбар</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Хувийн мэдээлэл</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Нэр</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>И-мэйл</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Утас</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Байршил</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Танилцуулга</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Өөрийнхөө тухай товч мэдээлэл..."
                    rows={4}
                  />
                </div>

                <Button onClick={handleSaveProfile}>Хадгалах</Button>
              </CardContent>
            </Card>

            {/* CV Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Анкет / CV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">CV файл upload хийх</p>
                  <p className="text-xs text-muted-foreground">PDF файл (максимум 5MB)</p>
                  <Button variant="outline" className="mt-4">Файл сонгох</Button>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Ур чадвар</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                      <X
                        className="ml-2 h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveSkill(index)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ур чадвар нэмэх..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Боловсрол</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setIsAddEducationOpen(true)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">{edu.degree} - {edu.field}</h4>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setIsAddEducationOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Боловсрол нэмэх
                </Button>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Туршлага</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setIsAddExperienceOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Туршлага нэмэх
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Applications Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Илгээсэн анкетууд</CardTitle>
              </CardHeader>
              <CardContent>
                {appliedJobs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Та одоогоор анкет илгээгээгүй байна
                  </p>
                ) : (
                  <div className="space-y-4">
                    {appliedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold text-sm">{job.title}</h4>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Хүлээгдэж буй
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Education Dialog */}
        <Dialog open={isAddEducationOpen} onOpenChange={setIsAddEducationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Боловсрол нэмэх</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Сургууль</Label>
                <Input
                  value={newEducation.school}
                  onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                  placeholder="МУИС"
                />
              </div>
              <div className="space-y-2">
                <Label>Зэрэг</Label>
                <Input
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="Бакалавр"
                />
              </div>
              <div className="space-y-2">
                <Label>Мэргэжил</Label>
                <Input
                  value={newEducation.field}
                  onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                  placeholder="Програм хангамж"
                />
              </div>
              <div className="space-y-2">
                <Label>Он</Label>
                <Input
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                  placeholder="2020-2024"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEducationOpen(false)}>Болих</Button>
              <Button onClick={handleAddEducation}>Нэмэх</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Experience Dialog */}
        <Dialog open={isAddExperienceOpen} onOpenChange={setIsAddExperienceOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Туршлага нэмэх</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Компани</Label>
                <Input
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Tech Company"
                />
              </div>
              <div className="space-y-2">
                <Label>Албан тушаал</Label>
                <Input
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Хугацаа</Label>
                <Input
                  value={newExperience.period}
                  onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                  placeholder="2022-2024"
                />
              </div>
              <div className="space-y-2">
                <Label>Тайлбар</Label>
                <Textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  placeholder="Ажлын товч тайлбар..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddExperienceOpen(false)}>Болих</Button>
              <Button onClick={handleAddExperience}>Нэмэх</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
