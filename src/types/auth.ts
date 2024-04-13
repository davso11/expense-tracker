import { User } from '.';

export type AuthedUser = Omit<User, 'password' | 'expenses'>;

export type NewUser = Pick<User, 'id' | 'email' | 'emailVerified'> & {
  createdAt: string;
};

export type AuthData = {
  accessToken: string;
} | null;
