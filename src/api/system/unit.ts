import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type UnitInfo = components['schemas']['UnitEntity'];
export type SearchParams = operations['UnitController_findAll']['parameters']['query'];

// 获取单位列表
export const getUnitList = (query?: SearchParams) =>
  client.GET('/api/system/unit', { params: { query } });
// 创建单位
export const createUnit = (body: components['schemas']['CreateUnitDto']) =>
  client.POST('/api/system/unit', { body });
// 获取单个单位详情
export const getUnitDetail = (id: number) =>
  client.GET('/api/system/unit/{id}', { params: { path: { id } } });
// 更新单位
export const updateUnit = (body: components['schemas']['UpdateUnitDto']) =>
  client.PATCH('/api/system/unit/{id}', { body, params: { path: { id: body.id } } });
// 删除单位
export const deleteUnit = (id: number) =>
  client.DELETE('/api/system/unit/{id}', { params: { path: { id } } });
