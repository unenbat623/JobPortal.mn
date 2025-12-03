import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
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

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface JobContextType {
  jobs: Job[];
  pricingPlans: PricingPlan[];
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'applicants' | 'status'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  applyToJob: (jobId: string, userId: string) => void;
  getJobById: (id: string) => Job | undefined;
  approveJob: (id: string) => void;
  rejectJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Үнэгүй',
    price: '0₮',
    period: 'сард',
    description: 'Жижиг компаниудад',
    features: [
      '1 ажлын зар',
      '30 хоног идэвхтэй',
      'Энгийн жагсаалтад гарах',
      'Өргөдлүүдийг харах',
    ],
  },
  {
    name: 'Стандарт',
    price: '150,000₮',
    period: 'сард',
    description: 'Дунд компаниудад',
    features: [
      '10 ажлын зар',
      '60 хоног идэвхтэй',
      'Жагсаалтын дээд хэсэгт гарах',
      'Өргөдлүүдийг харах',
      'Компанийн профайл холбоос',
      'И-мэйл дэмжлэг',
    ],
    popular: true,
  },
  {
    name: 'Boost',
    price: '300,000₮',
    period: 'сард',
    description: 'Том компаниудад',
    features: [
      'Хязгааргүй ажлын зар',
      '90 хоног идэвхтэй',
      'Голд badge',
      'Нүүр хуудсанд онцлох',
      'Өргөдлүүдийг нэн даруй харах',
      'Олон компанийн профайл',
      'Приоритет дэмжлэг',
      'Статистик тайлан',
    ],
  },
];

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Ахлах Backend хөгжүүлэгч',
    company: 'LendMN',
    logo: 'https://ui-avatars.com/api/?name=LendMN&background=0D8ABC&color=fff',
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
    logo: 'https://ui-avatars.com/api/?name=Tiger+Finance&background=FF9800&color=fff',
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
    logo: 'https://ui-avatars.com/api/?name=Tavan+Bogd&background=4CAF50&color=fff',
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
    logo: 'https://ui-avatars.com/api/?name=AND+Systems&background=2196F3&color=fff',
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
    logo: 'https://ui-avatars.com/api/?name=G-Mobile&background=E91E63&color=fff',
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
    logo: 'https://ui-avatars.com/api/?name=LendMN&background=0D8ABC&color=fff',
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
    logo: 'https://ui-avatars.com/api/?name=AND+Systems&background=2196F3&color=fff',
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
  {
    id: '8',
    title: 'Network Engineer',
    company: 'Unitel',
    logo: 'https://ui-avatars.com/api/?name=Unitel&background=8BC34A&color=fff',
    location: 'Улаанбаатар',
    category: 'IT',
    salary: '3,000,000-5,000,000₮',
    salaryMin: 3000000,
    salaryMax: 5000000,
    experience: 'Дунд түвшин',
    description: 'Unitel Group сүлжээний инженер хайж байна.',
    requirements: ['CCNA/CCNP сертификаттай', 'Network security мэдлэгтэй', '3+ жил туршлага', 'Англи хэлний дунд түвшин'],
    responsibilities: ['Сүлжээний найдвартай ажиллагааг хангах', 'Тоног төхөөрөмжийн тохиргоо хийх', 'Гэмтэл саатал оношлох', 'Мониторинг хийх'],
    postedDate: '2025-01-16',
    employerId: 'emp6',
    status: 'approved',
    applicants: [],
  },
  {
    id: '9',
    title: 'Зээлийн эдийн засагч',
    company: 'Khan Bank',
    logo: 'https://ui-avatars.com/api/?name=Khan+Bank&background=009688&color=fff',
    location: 'Улаанбаатар',
    category: 'Санхүү',
    salary: '2,500,000-4,000,000₮',
    salaryMin: 2500000,
    salaryMax: 4000000,
    experience: 'Дунд түвшин',
    description: 'Хаан Банк бизнес зээлийн эдийн засагч ажилд авна.',
    requirements: ['Банк, санхүүгийн мэргэжилтэй', 'Санхүүгийн шинжилгээ хийх чадвартай', 'Харилцааны өндөр соёлтой', 'Багаар ажиллах чадвартай'],
    responsibilities: ['Зээлийн судалгаа хийх', 'Харилцагчид зөвлөгөө өгөх', 'Зээлийн багц удирдах', 'Эрсдэлийн үнэлгээ хийх'],
    postedDate: '2025-01-17',
    employerId: 'emp7',
    status: 'approved',
    applicants: [],
  },
  {
    id: '10',
    title: 'Борлуулалтын менежер',
    company: 'MCS Coca-Cola',
    logo: 'https://ui-avatars.com/api/?name=MCS+Coca-Cola&background=F44336&color=fff',
    location: 'Улаанбаатар',
    category: 'Маркетинг',
    salary: '2,000,000-3,500,000₮',
    salaryMin: 2000000,
    salaryMax: 3500000,
    experience: 'Шинэ төгсөгч',
    description: 'MCS Coca-Cola компани борлуулалтын менежер хайж байна.',
    requirements: ['Борлуулалтын чиглэлээр ажиллах сонирхолтой', 'Жолооны үнэмлэхтэй', 'Хувийн зохион байгуулалт сайтай', 'Идэвх санаачилгатай'],
    responsibilities: ['Харилцагчидтай уулзалт хийх', 'Захиалга авах', 'Шинэ харилцагч нээх', 'Борлуулалтын төлөвлөгөө биелүүлэх'],
    postedDate: '2025-01-18',
    employerId: 'emp8',
    status: 'approved',
    applicants: [],
  },
  {
    id: '11',
    title: 'E-commerce Manager',
    company: 'Shoppy.mn',
    logo: 'https://ui-avatars.com/api/?name=Shoppy.mn&background=9C27B0&color=fff',
    location: 'Улаанбаатар',
    category: 'IT',
    salary: '3,500,000-6,000,000₮',
    salaryMin: 3500000,
    salaryMax: 6000000,
    experience: 'Ахлах',
    description: 'Shoppy.mn цахим худалдааны платформ хариуцсан менежер хайж байна.',
    requirements: ['E-commerce туршлагатай', 'Digital marketing мэдлэгтэй', 'Төсөл удирдах чадвартай', 'Анализ хийх чадвартай'],
    responsibilities: ['Платформын хөгжүүлэлт удирдах', 'Борлуулалт өсгөх стратеги гаргах', 'Маркетинг багтай хамтрах', 'Хэрэглэгчийн туршлага сайжруулах'],
    postedDate: '2025-01-19',
    employerId: 'emp9',
    status: 'approved',
    applicants: [],
  },
  {
    id: '12',
    title: 'Уулын инженер',
    company: 'Oyu Tolgoi',
    logo: 'https://ui-avatars.com/api/?name=Oyu+Tolgoi&background=FF5722&color=fff',
    location: 'Өмнөговь',
    category: 'Инженер',
    salary: '5,000,000-8,000,000₮',
    salaryMin: 5000000,
    salaryMax: 8000000,
    experience: 'Ахлах',
    description: 'Оюу Толгой ХХК гүний уурхайн инженер ажилд авна.',
    requirements: ['Уулын инженерийн бакалавр', 'Англи хэлний ахисан түвшин', 'Уурхайн программ хангамж эзэмшсэн', 'Аюулгүй ажиллагааны мэдлэгтэй'],
    responsibilities: ['Уулын ажлын төлөвлөлт хийх', 'Өрөмдлөг тэсэлгээний паспорт боловсруулах', 'Бүтээмж тооцох', 'Тайлан гаргах'],
    postedDate: '2025-01-20',
    employerId: 'emp10',
    status: 'approved',
    applicants: [],
  },
  {
    id: '13',
    title: 'Хөрөнгө оруулалтын шинжээч',
    company: 'Golomt Bank',
    logo: 'https://ui-avatars.com/api/?name=Golomt+Bank&background=3F51B5&color=fff',
    location: 'Улаанбаатар',
    category: 'Санхүү',
    salary: '3,000,000-5,000,000₮',
    salaryMin: 3000000,
    salaryMax: 5000000,
    experience: 'Дунд түвшин',
    description: 'Голомт Банк хөрөнгө оруулалтын шинжээч хайж байна.',
    requirements: ['CFA зэрэгтэй бол давуу тал', 'Санхүүгийн загварчлал хийх чадвартай', 'Англи хэлний өндөр мэдлэгтэй', 'Хөрөнгийн зах зээлийн мэдлэгтэй'],
    responsibilities: ['Хөрөнгө оруулалтын судалгаа хийх', 'Портфель удирдах', 'Харилцагчид зөвлөгөө өгөх', 'Зазах зээлийн мэдээлэл боловсруулах'],
    postedDate: '2025-01-21',
    employerId: 'emp11',
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
      logo: `https://ui-avatars.com/api/?name=${job.company}&background=random&color=fff`,
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
      pricingPlans,
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
