import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '#/openapi'; // 由openapi-typescript生成
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/settings/localStorageEnum';
import type { HttpMethod } from 'openapi-typescript-helpers';

// const { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, logout } = useUserStore();
const accessToken = useStorage(ACCESS_TOKEN_KEY, '');
const refreshToken = useStorage(REFRESH_TOKEN_KEY, '');
const UNPROTECTED_ROUTES = ['/api/authentication/refresh-token', '/api/authentication/sign-in'];
const authMiddleware: Middleware = {
  async onRequest({ request, schemaPath }) {
    if (UNPROTECTED_ROUTES.some((pathname) => schemaPath.startsWith(pathname))) {
      return undefined; // 不要修改某些路径的请求
    }
    request.headers.set('Authorization', `Bearer ${accessToken.value}`);
    return request;
  },
  async onResponse({ request, response }) {
    const data = await response.clone().json();
    if (data.error) {
      const { statusCode, message } = data;
      if (statusCode === 401 && !response.url.includes('/api/authentication/refresh-token')) {
        const { data } = await client.POST('/api/authentication/refresh-token', {
          body: { refreshToken: refreshToken.value },
        });
        if (data) {
          accessToken.value = data.accessToken;
          refreshToken.value = data.refreshToken;
          return (client as any)[request.method as Uppercase<HttpMethod>](response.url, request);
        } else {
          const userStore = useUserStore();
          userStore.logout();
          window.$message.error('登录已过期，请重新登录');
        }
      }
      window.$message.error(`${statusCode}: ${message}`);
    }
  },
};

export const client = createClient<paths>();
client.use(authMiddleware);
