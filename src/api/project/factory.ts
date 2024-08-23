import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type FactoryInfo = components['schemas']['FactoryEntity'];
export type SearchParams = operations['FactoryController_findAll']['parameters']['query'];

// 获取工厂列表
export const getFactoryList = (query?: SearchParams) =>
  client.GET('/api/project/factory', { params: { query } });
// 创建工厂
export const createFactory = (body: components['schemas']['CreateFactoryDto']) =>
  client.POST('/api/project/factory', { body });
// 获取单个工厂信息
export const getFactoryDetail = (id: number) =>
  client.GET('/api/project/factory/{id}', { params: { path: { id } } });
// 更新工厂
export const updateFactory = (body: components['schemas']['UpdateFactoryDto']) =>
  client.PATCH('/api/project/factory/{id}', { body, params: { path: { id: body.id } } });
// 删除工厂
export const deleteFactory = (id: number) =>
  client.DELETE('/api/project/factory/{id}', { params: { path: { id } } });
