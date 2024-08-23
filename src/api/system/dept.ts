import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type DeptInfo = components['schemas']['DeptEntity'];
export type SearchParam = operations['DeptController_findAll']['parameters']['query'];

// 获取部门列表
export const getDeptList = (query?: SearchParam) =>
  client.GET('/api/system/dept', { params: { query } });
// 创建部门
export const createDept = (body: components['schemas']['CreateDeptDto']) =>
  client.POST('/api/system/dept', { body });
// 获取单个部门详情
export const getDeptDetail = (id: number) =>
  client.GET('/api/system/dept/{id}', { params: { path: { id } } });
// 更新部门
export const updateDept = (body: components['schemas']['UpdateDeptDto']) =>
  client.PATCH('/api/system/dept/{id}', { body, params: { path: { id: body.id } } });
// 删除部门
export const deleteDept = (id: number) =>
  client.DELETE('/api/system/dept/{id}', { params: { path: { id } } });
