import ky from 'ky';
import * as authLib from '@/lib/auth';
import { refreshToken } from '@/api/auth';
import { APIResponse } from '@/types';

export const http = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (req) => {
        const token = authLib.getAccessToken();
        if (token) req.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    afterResponse: [
      async (req, _options, res) => {
        if (res.status === 403) {
          const json = (await res.json()) as APIResponse<any>;
          if (!json.ok && json.error === 'TokenExpiredError') {
            try {
              const { accessToken } = await refreshToken();
              authLib.setAccessToken(accessToken);
              req.headers.set('Authorization', `Bearer ${accessToken}`);
              return ky(req);
            } catch (e) {
              return res;
            }
          }
        }
      },
    ],
  },
  retry: {
    limit: 0,
  },
});
