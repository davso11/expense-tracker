import { http } from '@/lib/http';
import { formatUrlQueries } from '@/lib/utils';
import { APIResponse, ExpenseCategory } from '@/types';
import * as schemas from '@/schemas/expenses';

const BASE_PATH = 'expense-categories';

export async function post(data: schemas.ExpenseCategoryInput) {
  const res = await http
    .post(BASE_PATH, { json: data })
    .json<APIResponse<ExpenseCategory>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function fetchMany(
  queries?: Partial<{
    q: string;
    limit: string;
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

export async function update(data: schemas.UpdateExpenseCategoryInput) {
  const res = await http
    .put(`${BASE_PATH}/${data.id}`, { json: data })
    .json<APIResponse<ExpenseCategory>>();

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
