import { http } from '@/lib/http';
import { AuthedUser, NewUser } from '@/types/auth';
import { LoginInput, RegisterInput } from '@/schemas/auth';
import { APIResponse } from '@/types';

const BASE_PATH = 'auth';

export async function signUp(data: RegisterInput) {
  const res = await http
    .post(`${BASE_PATH}/register`, { json: data })
    .json<APIResponse<NewUser>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function signIn(data: LoginInput) {
  const res = await http.post(`${BASE_PATH}/login`, { json: data }).json<
    APIResponse<
      | {
          accessToken: string;
          user: AuthedUser;
        }
      | 'done'
    >
  >();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function signOut() {
  const res = await http
    .post(`${BASE_PATH}/logout`)
    .json<APIResponse<'done'>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}

export async function fetchUser() {
  const res = await http.get(`${BASE_PATH}/me`).json<APIResponse<AuthedUser>>();
  if (!res.ok) throw Error(res.error);
  return res.data;
}

export async function refreshToken() {
  const res = await http
    .get(`${BASE_PATH}/refresh`)
    .json<APIResponse<{ accessToken: string }>>();
  if (!res.ok) throw Error(res.error);
  return res.data;
}

export async function confirmEmail(token: string) {
  const res = await http
    .post(`${BASE_PATH}/confirm-email`, { json: token })
    .json<APIResponse<NewUser>>();

  if (!res.ok) {
    throw Error(res.error);
  }

  return res.data;
}
