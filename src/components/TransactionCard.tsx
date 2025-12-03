import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
    type: 'income' | 'expense';
    amount: string;
    date: string;
    description: string;
    status: 'completed' | 'pending' | 'failed';
}

export const TransactionCard = ({ type, amount, date, description, status }: TransactionCardProps) => {
    return (
        <Card className="group relative overflow-hidden backdrop-blur-md bg-white/10 border-white/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="p-6 relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
                        type === 'income' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                        {type === 'income' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{description}</h3>
                        <p className="text-sm text-muted-foreground">{date}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className={cn(
                            "text-lg font-bold tracking-tight",
                            type === 'income' ? "text-emerald-500" : "text-rose-500"
                        )}>
                            {type === 'income' ? '+' : '-'}{amount}
                        </p>
                        <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full border",
                            status === 'completed' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
                            status === 'pending' && "bg-amber-500/10 border-amber-500/20 text-amber-500",
                            status === 'failed' && "bg-rose-500/10 border-rose-500/20 text-rose-500",
                        )}>
                            {status === 'completed' ? 'Амжилттай' : status === 'pending' ? 'Хүлээгдэж буй' : 'Амжилтгүй'}
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rotate-12"
                    >
                        <Receipt className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
