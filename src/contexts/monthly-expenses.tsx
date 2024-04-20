import { createContext, useCallback, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type TMonthlyExpensesCtx = {
  query: string | null;
  updateQuery: (value: string | null) => void;
};

const ctx = createContext<TMonthlyExpensesCtx>({} as TMonthlyExpensesCtx);

const useMonthlyExpensesCtx = () => {
  if (!ctx) throw new Error('MonthlyExpensesProvider not found');
  return useContext(ctx);
};

const MonthlyExpensesProvider = (
  props: Readonly<{
    children: React.ReactNode;
  }>,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string | null>(
    searchParams.get('category'),
  );

  const updateQuery = useCallback(async (value: string | null) => {
    setSearchParams(value ? { category: value } : {});
    setQuery(value);
  }, []);

  return (
    <ctx.Provider
      value={{ query, updateQuery }}
      {...props}
    />
  );
};

export { MonthlyExpensesProvider, useMonthlyExpensesCtx };
