import { http } from '@/lib/http';
import { formatUrlQueries } from '@/lib/utils';
import { ExpenseInput, UpdateExpenseInput } from '@/schemas/expenses';
import { APIResponse, Expense } from '@/types';

const BASE_PATH = 'expenses';

export async function post(data: ExpenseInput) {
  const res = await http
    .post(BASE_PATH, { json: data })
    .json<APIResponse<Expense>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function fetchMany(
  queries?: Partial<{
    date: string;
    limit: string;
    q: string;
  }>,
) {
  let URL = BASE_PATH;

  if (queries) {
    URL = await formatUrlQueries(URL, queries);
  }

  const res = await http.get(URL).json<
    APIResponse<
      | Expense[]
      | {
          expenses: Expense[];
          total: string;
        }
    >
  >();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function getDailyTotal(date?: string) {
  let URL = `${BASE_PATH}/daily-total`;

  if (date) {
    URL += `?date=${date}`;
  }

  const res = await http.get(URL).json<APIResponse<{ total: string }>>();
  if (!res.ok) throw Error(res.error);
  return res.data;
}

export async function getMonthlyTotal(
  queries?: Partial<{
    month: string;
    year: string;
  }>,
) {
  let URL = `${BASE_PATH}/monthly-total`;

  if (queries) {
    URL = await formatUrlQueries(URL, queries);
  }

  const res = await http.get(URL).json<APIResponse<{ total: string }>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function fetchOne(id: string, queries?: Partial<{ q: string }>) {
  let URL = `${BASE_PATH}/${id}`;

  if (queries) {
    URL = await formatUrlQueries(URL, queries);
  }

  const res = await http.get(URL).json<APIResponse<Expense>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function update(data: UpdateExpenseInput) {
  const res = await http
    .put(`${BASE_PATH}/${data.id}`, { json: data })
    .json<APIResponse<Expense>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function remove(id: string) {
  const res = await http
    .delete(`${BASE_PATH}/${id}`)
    .json<APIResponse<'done'>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}
