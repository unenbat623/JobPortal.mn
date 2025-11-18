import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Pricing() {
  const handlePurchase = (plan: string) => {
    toast.success(`${plan} пакет худалдан авах үйл явц эхэллээ!`);
  };

  const plans = [
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
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
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
      </div>
    </div>
  );
}
