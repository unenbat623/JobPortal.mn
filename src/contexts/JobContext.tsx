import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  employerId: string;
  status: 'pending' | 'approved' | 'rejected';
  applicants: string[];
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'applicants' | 'status'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  applyToJob: (jobId: string, userId: string) => void;
  getJobById: (id: string) => Job | undefined;
  approveJob: (id: string) => void;
  rejectJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Ахлах Backend хөгжүүлэгч',
    company: 'LendMN',
    location: 'Улаанбаатар',
    category: 'IT',
    salary: '4,000,000-7,000,000₮',
    salaryMin: 4000000,
    salaryMax: 7000000,
    experience: 'Ахлах',
    description: 'LendMN нь санхүүгийн салбарт тэргүүлэгч компани бөгөөд бид ахлах backend хөгжүүлэгч хайж байна.',
    requirements: ['Python, Django 5+ жил', 'PostgreSQL, Redis', 'Microservices архитектур', 'Docker, Kubernetes'],
    responsibilities: ['Backend API хөгжүүлэх', 'Database design хийх', 'Баг удирдах', 'Code review хийх'],
    postedDate: '2025-01-10',
    employerId: 'emp1',
    status: 'approved',
    applicants: [],
  },
  {
    id: '2',
    title: 'Маркетинг мэргэжилтэн',
    company: 'Tiger Finance',
    location: 'Улаанбаатар',
    category: 'Маркетинг',
    salary: '1,800,000-2,500,000₮',
    salaryMin: 1800000,
    salaryMax: 2500000,
    experience: 'Дунд түвшин',
    description: 'Tiger Finance компани digital маркетингийн мэргэжилтэн авна.',
    requirements: ['Digital marketing 3+ жил', 'Social media management', 'Content creation', 'Analytics'],
    responsibilities: ['Маркетинг стратеги боловсруулах', 'Social media удирдах', 'Агуулга бэлтгэх', 'Кампанит ажил явуулах'],
    postedDate: '2025-01-12',
    employerId: 'emp2',
    status: 'approved',
    applicants: [],
  },
  {
    id: '3',
    title: 'HR Менежер',
    company: 'Таван Богд',
    location: 'Улаанбаатар',
    category: 'HR',
    salary: '2,000,000-3,500,000₮',
    salaryMin: 2000000,
    salaryMax: 3500000,
    experience: 'Дунд түвшин',
    description: 'Таван Богд групп HR менежер хайж байна.',
    requirements: ['HR менежмент 3-5 жил', 'Recruitment туршлага', 'Харилцааны ур чадвар', 'MS Office'],
    responsibilities: ['Сонгон шалгаруулалт явуулах', 'Ажилтнуудыг удирдах', 'Сургалт зохион байгуулах', 'Performance үнэлгээ хийх'],
    postedDate: '2025-01-08',
    employerId: 'emp3',
    status: 'approved',
    applicants: [],
  },
  {
    id: '4',
    title: 'Frontend Developer (React)',
    company: 'AND Systems',
    location: 'Улаанбаатар',
    category: 'IT',
    salary: '2,500,000-4,000,000₮',
    salaryMin: 2500000,
    salaryMax: 4000000,
    experience: 'Дунд түвшин',
    description: 'React ашиглан web application хөгжүүлэх ажилд урьж байна.',
    requirements: ['React, TypeScript 2-4 жил', 'Tailwind CSS', 'REST API', 'Git'],
    responsibilities: ['UI компонент хөгжүүлэх', 'Backend-тэй холбох', 'Responsive design', 'Код сайжруулах'],
    postedDate: '2025-01-15',
    employerId: 'emp4',
    status: 'approved',
    applicants: [],
  },
  {
    id: '5',
    title: 'Харилцагчийн үйлчилгээний ажилтан',
    company: 'G-Mobile',
    location: 'Улаанбаатар',
    category: 'Үйлчилгээ',
    salary: '1,000,000-1,500,000₮',
    salaryMin: 1000000,
    salaryMax: 1500000,
    experience: 'Шинэ төгсөгч',
    description: 'G-Mobile компанид харилцагчийн үйлчилгээний ажилтан шаардлагатай байна.',
    requirements: ['Харилцааны ур чадвар', 'Монгол, англи хэл', 'Computer ур чадвар', 'Тэвчээртэй'],
    responsibilities: ['Харилцагчдад үйлчлэх', 'Гомдол шийдвэрлэх', 'Борлуулалт хийх', 'Тайлан бэлтгэх'],
    postedDate: '2025-01-14',
    employerId: 'emp5',
    status: 'approved',
    applicants: [],
  },
  {
    id: '6',
    title: 'Санхүүгийн анализч',
    company: 'LendMN',
    location: 'Улаанбаатар',
    category: 'Санхүү',
    salary: '2,200,000-3,800,000₮',
    salaryMin: 2200000,
    salaryMax: 3800000,
    experience: 'Дунд түвшин',
    description: 'Санхүүгийн анализ, тайлан бэлтгэх ажил.',
    requirements: ['Санхүү, эдийн засаг боловсрол', 'Excel, PowerBI', '2-4 жил туршлага', 'Англи хэл'],
    responsibilities: ['Санхүүгийн анализ', 'Тайлан бэлтгэх', 'Budget төлөвлөх', 'Зөвлөгөө өгөх'],
    postedDate: '2025-01-11',
    employerId: 'emp1',
    status: 'approved',
    applicants: [],
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'AND Systems',
    location: 'Дархан',
    category: 'IT',
    salary: '3,500,000-5,500,000₮',
    salaryMin: 3500000,
    salaryMax: 5500000,
    experience: 'Ахлах',
    description: 'DevOps engineer CI/CD, cloud infrastructure удирдах.',
    requirements: ['Linux системд чөлөөтэй', 'Docker, Kubernetes', 'AWS/GCP', 'Terraform, Ansible'],
    responsibilities: ['Infrastructure удирдах', 'CI/CD pipeline', 'Monitoring хийх', 'Security хангах'],
    postedDate: '2025-01-09',
    employerId: 'emp4',
    status: 'approved',
    applicants: [],
  },
];

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobportal_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      setJobs(initialJobs);
      localStorage.setItem('jobportal_jobs', JSON.stringify(initialJobs));
    }
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem('jobportal_jobs', JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = (job: Omit<Job, 'id' | 'postedDate' | 'applicants' | 'status'>) => {
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      postedDate: new Date().toISOString().split('T')[0],
      applicants: [],
      status: 'pending',
    };
    setJobs([newJob, ...jobs]);
  };

  const updateJob = (id: string, updatedJob: Partial<Job>) => {
    setJobs(jobs.map(job => (job.id === id ? { ...job, ...updatedJob } : job)));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const applyToJob = (jobId: string, userId: string) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId && !job.applicants.includes(userId)) {
        return { ...job, applicants: [...job.applicants, userId] };
      }
      return job;
    }));
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const approveJob = (id: string) => {
    updateJob(id, { status: 'approved' });
  };

  const rejectJob = (id: string) => {
    updateJob(id, { status: 'rejected' });
  };

  return (
    <JobContext.Provider value={{ 
      jobs, 
      addJob, 
      updateJob, 
      deleteJob, 
      applyToJob, 
      getJobById,
      approveJob,
      rejectJob,
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
