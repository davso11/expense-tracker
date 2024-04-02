import { AlertTriangle, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useTotalExpenses } from '@/hooks/expenses';

export function TotalMonthlyExpenseCard() {
  const { monthlyTotalQuery } = useTotalExpenses('monthly');

  return (
    <section className="container">
      <div className="center-flex relative min-h-72 overflow-hidden rounded-xl bg-slate-100/50">
        {monthlyTotalQuery.status === 'success' && (
          <div className="center-flex flex-col">
            <span className="text-6xl font-bold">
              {formatCurrency(monthlyTotalQuery.data.total)}
            </span>
            <span className="mt-1 font-medium">
              {parseFloat(monthlyTotalQuery.data.total) > 1
                ? 'Dépensés ce mois'
                : 'Aucune dépense ce mois'}
            </span>
          </div>
        )}

        {monthlyTotalQuery.status === 'pending' && (
          <Loader2
            size={32}
            strokeWidth={3}
            className="animate-spin-fast"
          />
        )}

        {monthlyTotalQuery.status === 'error' && (
          <div className="center-flex flex-col text-destructive">
            <AlertTriangle size={28} />
            <span className="mt-1 font-medium">Erreur survenue</span>
          </div>
        )}
        <span className="absolute right-0 top-0 rounded-es-xl bg-emerald-200/75 px-4 py-1.5 font-semibold text-emerald-700">
          FCFA
        </span>
      </div>
    </section>
  );
}
