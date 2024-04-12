import { User } from '.';

export type AuthedUser = Omit<User, 'password' | 'expenses'>;

export type NewUser = Pick<User, 'id' | 'email'> & {
  createdAt: string;
};

export type AuthData = {
  accessToken: string;
} | null;
