import type { MenuOption } from 'naive-ui';
import type { RemovableRef } from '@vueuse/core';
import type { components } from '#/openapi';
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY, USER_INFO_KEY, PageEnum } from '@/settings';
import { defineStore } from 'pinia';
import { client } from '@/utils';
import { router } from '@/router';
import { flatMapDeep } from 'lodash-es';
import { transformersMenus } from './helper/user-helper';
import type { UserInfo } from '@/api/system/user';

export type MenuInfo = components['schemas']['MenuTreeEntity'];
interface UserState {
  /** Token */
  accessToken: RemovableRef<string | null>;
  refreshToken: RemovableRef<string | null>;
  /** 用户信息 */
  userInfo: RemovableRef<UserInfo>;
  /** 路由是否动态添加 */
  isDynamicAddedRoute: boolean;
  /** 后台返回的路由列表 */
  backendRouteList: MenuInfo[];
  /** 菜单列表 */
  menus: MenuOption[];
}
export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    accessToken: useStorage(ACCESS_TOKEN_KEY, null),
    refreshToken: useStorage(REFRESH_TOKEN_KEY, null),
    userInfo: useStorage(USER_INFO_KEY, {} as UserInfo),
    isDynamicAddedRoute: false,
    backendRouteList: [],
    menus: [],
  }),
  getters: {
    getAccessToken(): string | null {
      return this.accessToken;
    },
    getRefreshToken(): string | null {
      return this.refreshToken;
    },
    getUserInfo(): UserInfo {
      return this.userInfo;
    },
    getMenuList(): MenuOption[] {
      return transformersMenus(this.backendRouteList);
    },
  },
  actions: {
    setAccessToken(token: string | null = null): void {
      this.accessToken = token;
    },
    setRefreshToken(token: string | null = null): void {
      this.refreshToken = token;
    },
    setUserInfo(info?: UserInfo) {
      this.userInfo = info || ({} as UserInfo);
    },
    async login(body: components['schemas']['SignInDto']) {
      try {
        const { data } = await client.POST('/api/authentication/sign-in', { body });
        if (data) {
          this.setAccessToken(data.accessToken);
          this.setRefreshToken(data.refreshToken);
          await this.getUserInfoAction();
          const redirect = router.currentRoute.value.query.redirect;
          router.push(redirect ? (redirect as string) : PageEnum.BASE_HOME);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserInfoAction(): Promise<UserInfo | undefined> {
      if (!this.getAccessToken) return;
      const { data } = await client.GET('/api/system/user/info');
      this.setUserInfo(data);
      return data;
    },
    /** 获取路由 */
    async getRoutesAction() {
      const { data } = await client.GET('/api/system/menu');
      if (!data) return;
      const routes = router.getRoutes();
      // 把路由同步到 router 中
      flatMapDeep(data, (route) => [route, route.children]).forEach((route) => {
        routes.forEach((item) => {
          if (route?.path === item.path) {
            item.meta = {
              ...item.meta,
              title: route.name,
              icon: route.icon,
              hidden: route.hidden,
              parentId: route.parentId,
              sort: route.sort,
            };
          }
        });
      });
      // const route = router.currentRoute.value;
      // const tabStore = useTabStore();
      // tabStore.iniTabStore(route);

      this.setBackendRouteList(data);
      this.isDynamicAddedRoute = true;
      return data;
    },
    /** 设置路由 */
    setBackendRouteList(list: MenuInfo[]) {
      this.backendRouteList = list;
    },
    logout() {
      this.setAccessToken();
      this.setUserInfo();
      // 刷新页面
      location.reload();
    },
  },
});
