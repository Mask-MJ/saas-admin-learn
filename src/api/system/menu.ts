import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type MenuInfo = components['schemas']['MenuEntity'];
export type SearchParams = operations['MenuController_findAll']['parameters']['query'];

// 获取菜单列表
export const getMenuList = (query?: SearchParams) =>
  client.GET('/api/system/menu', { params: { query } });
// 创建菜单
export const createMenu = (body: components['schemas']['CreateMenuDto']) =>
  client.POST('/api/system/menu', { body });
// 获取单个菜单信息
export const getMenuDetail = (id: number) =>
  client.GET('/api/system/menu/{id}', { params: { path: { id } } });
// 更新菜单
export const updateMenu = (body: components['schemas']['UpdateMenuDto']) =>
  client.PATCH('/api/system/menu/{id}', { body, params: { path: { id: body.id } } });
// 删除菜单
export const deleteMenu = (id: number) =>
  client.DELETE('/api/system/menu/{id}', { params: { path: { id } } });
