import { http } from '@/lib/http';
import { formatUrlQueries } from '@/lib/utils';
import { APIResponse, ExpenseCategory } from '@/types';

const BASE_PATH = 'expense-categories';

export async function fetchMany(
  queries?: Partial<{
    q: string;
  }>,
) {
  let URL = BASE_PATH;

  if (queries) {
    URL = await formatUrlQueries(URL, queries);
  }

  const res = await http.get(URL).json<APIResponse<ExpenseCategory[]>>();
  if (!res.ok) throw Error(res.error);
  return res.data;
}

export async function fetchOne(id: string, queries?: Partial<{ q: string }>) {
  let URL = `${BASE_PATH}/${id}`;

  if (queries) {
    URL = await formatUrlQueries(URL, queries);
  }

  const res = await http.get(URL).json<APIResponse<ExpenseCategory>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}
