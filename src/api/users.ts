import { http } from '@/lib/http';
import { NewPassword, UserInfo } from '@/schemas/users';
import { APIResponse, User } from '@/types';

const BASE_PATH = 'users';

export async function updateInfo(data: UserInfo) {
  const res = await http
    .put(`${BASE_PATH}/update-info`, { json: data })
    .json<APIResponse<User>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function updatePassword(data: NewPassword) {
  const res = await http
    .put(`${BASE_PATH}/update-password`, { json: data })
    .json<APIResponse<'done'>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}
