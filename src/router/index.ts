import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { setupRouterGuard } from './permissionGuard';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
}
