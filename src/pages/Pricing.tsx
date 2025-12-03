import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

import { useJobs } from '@/contexts/JobContext';

export default function Pricing() {
  const { pricingPlans } = useJobs();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePurchase = (planName: string) => {
    if (planName === 'Үнэгүй') {
      toast.success('Үнэгүй пакет идэвхжлээ! Та одоо ажлын зар нийтлэх боломжтой.');
    } else {
      setSelectedPlan(planName);
    }
  };

  const handleContactSubmit = () => {
    toast.success(`${selectedPlan} пакетын талаар манай баг тантай удахгүй холбогдох болно!`);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Үнийн санал</h1>
          <p className="text-xl text-muted-foreground">
            Таны бизнест тохирсон пакетыг сонгоорой
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular
                ? 'border-primary shadow-xl scale-105'
                : ''
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Алдартай
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="mb-4">{plan.description}</CardDescription>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePurchase(plan.name)}
                >
                  {plan.name === 'Үнэгүй' ? 'Эхлэх' : 'Худалдан авах'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Бүх пакетад багтдаг</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-success mt-0.5" />
                  <span>Хялбар зар нийтлэх систем</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-success mt-0.5" />
                  <span>Өргөдлийн удирдлага</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-success mt-0.5" />
                  <span>Компанийн профайл</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-success mt-0.5" />
                  <span>Mobile responsive</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-muted-foreground">
            Асуулт байвал <a href="mailto:support@jobportal.mn" className="text-primary hover:underline">support@jobportal.mn</a> хаягаар холбогдоно уу
          </p>
        </div>

        {/* Purchase Dialog */}
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPlan} пакет худалдан авах</DialogTitle>
              <DialogDescription>
                Та {selectedPlan} пакетыг сонгосон байна. Манай борлуулалтын баг тантай холбогдож, төлбөрийн мэдээлэл болон нэмэлт дэлгэрэнгүй мэдээлэл өгөх болно.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Холбогдох мэдээлэл:</h4>
                <p className="text-sm text-muted-foreground">
                  📧 И-мэйл: <a href="mailto:sales@jobportal.mn" className="text-primary hover:underline">sales@jobportal.mn</a>
                </p>
                <p className="text-sm text-muted-foreground">
                  📞 Утас: +976 7000-0000
                </p>
                <p className="text-sm text-muted-foreground">
                  ⏰ Ажлын цаг: Даваа-Баасан 09:00-18:00
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  Манай баг 24 цагийн дотор тантай холбогдож, төлбөрийн нэхэмжлэх болон бүртгэлийн мэдээллийг илгээх болно.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                Болих
              </Button>
              <Button onClick={handleContactSubmit}>
                Баталгаажуулах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
