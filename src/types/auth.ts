import { User } from '.';

export type AuthedUser = Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;

export type NewUser = Pick<User, 'id' | 'email'> & {
  createdAt: string;
};

export type AuthData = {
  accessToken: string;
} | null;
