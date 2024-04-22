import { AlertTriangle, Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
import { useTotalExpenses } from '@/hooks/expenses';
import { formatCurrency } from '@/lib/utils';
import { SeeAll } from './see-all';

export function TotalMonthlyExpenseCard() {
  const { monthlyTotalQuery } = useTotalExpenses('monthly');
  const navigate = useNavigate();

  return (
    <section className="container">
      <div className="center-flex relative min-h-72 overflow-hidden rounded-xl bg-secondary">
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
            <SeeAll
              to="/monthly-expenses"
              className="mt-1"
              button={{
                variant: 'default',
              }}
            />
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

        <Button
          pill
          size="icon"
          className="absolute bottom-4 right-4"
          onClick={() => navigate('/expenses/new')}
          tooltip="Nouvelle dépense"
        >
          <Plus size={18} />
        </Button>
      </div>
    </section>
  );
}
