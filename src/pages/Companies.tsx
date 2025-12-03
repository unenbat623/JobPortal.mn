import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/contexts/JobContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Briefcase, Search } from 'lucide-react';

interface Company {
    name: string;
    logo: string;
    location: string;
    jobCount: number;
    categories: string[];
}

export default function Companies() {
    const { jobs } = useJobs();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique companies from jobs
    const companies = useMemo(() => {
        const companyMap = new Map<string, Company>();

        jobs.forEach((job) => {
            if (job.status !== 'approved') return;

            const existing = companyMap.get(job.company);
            if (existing) {
                existing.jobCount++;
                if (!existing.categories.includes(job.category)) {
                    existing.categories.push(job.category);
                }
            } else {
                companyMap.set(job.company, {
                    name: job.company,
                    logo: job.logo || `https://ui-avatars.com/api/?name=${job.company}&background=random&color=fff`,
                    location: job.location,
                    jobCount: 1,
                    categories: [job.category],
                });
            }
        });

        return Array.from(companyMap.values());
    }, [jobs]);

    // Filter companies based on search query
    const filteredCompanies = useMemo(() => {
        if (!searchQuery.trim()) return companies;

        const query = searchQuery.toLowerCase();
        return companies.filter((company) =>
            company.name.toLowerCase().includes(query) ||
            company.location.toLowerCase().includes(query) ||
            company.categories.some((cat) => cat.toLowerCase().includes(query))
        );
    }, [companies, searchQuery]);

    const handleCompanyClick = (companyName: string) => {
        // Navigate to jobs page with company filter
        navigate(`/jobs?company=${encodeURIComponent(companyName)}`);
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Компаниуд</h1>
                    <p className="text-muted-foreground text-lg">
                        {companies.length} компани {jobs.filter(j => j.status === 'approved').length} ажлын зар нийтэлсэн
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-xl">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Компани хайх..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Companies Grid */}
                {filteredCompanies.length === 0 ? (
                    <div className="text-center py-16">
                        <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">Компани олдсонгүй</h3>
                        <p className="text-muted-foreground">
                            Таны хайлтад тохирох компани олдсонгүй
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompanies.map((company) => (
                            <Card
                                key={company.name}
                                className="hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                                onClick={() => handleCompanyClick(company.name)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                            <img
                                                src={company.logo}
                                                alt={company.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg mb-1 truncate">
                                                {company.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{company.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-primary font-medium">
                                                <Briefcase className="h-4 w-4" />
                                                <span>{company.jobCount} ажлын зар</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="flex flex-wrap gap-2">
                                        {company.categories.slice(0, 3).map((category) => (
                                            <Badge key={category} variant="secondary" className="text-xs">
                                                {category}
                                            </Badge>
                                        ))}
                                        {company.categories.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{company.categories.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
