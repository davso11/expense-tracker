import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUrlQueries(
  url: string,
  queries: Record<string, string | undefined>,
): Promise<string> {
  return new Promise((resolve) => {
    const list: Array<string> = [];
    const entries = Object.entries(queries);

    for (const entry of entries) {
      const key = entry[0];
      const value = entry[1];

      if (value) {
        list.push(`${key}=${value}`);
      }
    }

    if (list.length === 0) {
      resolve(url);
    }

    resolve(`${url}?${list.join('&')}`);
  });
}

export function formatCurrency(
  amount: string,
  options?: Partial<{
    decimals: number;
    symbol: boolean;
  }>,
): string {
  const decimals = options?.decimals ?? 0;
  const symbol = options?.symbol ?? false;

  const parts = parseFloat(amount).toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add comma for thousands

  return `${parts.join(',')}${symbol ? ' FCFA' : ''}`;
}
