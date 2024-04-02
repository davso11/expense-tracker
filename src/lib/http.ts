import ky from 'ky';

export const http = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  retry: {
    limit: 0,
  },
});
