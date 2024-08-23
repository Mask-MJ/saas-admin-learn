import type { Router, RouteRecordRaw } from 'vue-router/auto';
import { PageEnum } from '@/settings';
import { flatMapDeep } from 'lodash-es';

const WHITE_LIST: string[] = [PageEnum.BASE_LOGIN];
function createPageGuard(router: Router) {
  const controller = new AbortController();

  router.beforeEach(async () => {
    window.$loadingBar?.start();
    controller.abort();
    return true;
  });
  router.afterEach(() => {
    window.$loadingBar?.finish();
  });
}

function createPermissionGuard(router: Router) {
  const userStore = useUserStore();

  router.beforeEach(async (to) => {
    const token = userStore.getAccessToken;
    const routes = router.getRoutes();
    // 没有token
    if (!token) {
      if (WHITE_LIST.includes(to.path)) return true;
      return { path: PageEnum.BASE_LOGIN, query: { ...to.query, redirect: to.path } };
    }

    // 有token
    // 判断是否有用户信息和路由
    if (Object.keys(userStore.getUserInfo).length === 0) {
      await userStore.getUserInfoAction();
    }
    if (!userStore.isDynamicAddedRoute) {
      await userStore.getRoutesAction();
      const tabStore = useTabStore();
      const currentRoute = routes.find((route) => {
        return route.path === to.path;
      });
      tabStore.initHomeTab(PageEnum.BASE_HOME, router);
      tabStore.iniTabStore({
        ...to,
        name: to.name as any,
        meta: { ...to.meta, ...currentRoute?.meta },
      });
    }
    if (to.path === PageEnum.BASE_HOME) return true;

    if (to.path === PageEnum.BASE_LOGIN) return { path: PageEnum.BASE_HOME };

    if (to.path === '/') return { path: PageEnum.BASE_HOME };

    if (WHITE_LIST.includes(to.path)) return true;

    // 判断是否有权限
    const flatBackendRouteList = flatMapDeep(
      userStore.backendRouteList,
      (route) => [route, route.children] as unknown as RouteRecordRaw[],
    );
    if (routes.some((route) => route.path === to.path)) {
      if (flatBackendRouteList.some((route) => route.path === to.path)) {
        return true;
      } else {
        window.$message.error('没有权限, 重定向到首页');
        return { path: PageEnum.BASE_HOME };
      }
    }
  });
}

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPermissionGuard(router);
}
