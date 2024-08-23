import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type ContractInfo = components['schemas']['ContractEntity'];
export type SearchParams = operations['ContractController_findAll']['parameters']['query'];

// 获取合同列表
export const getContractList = (query?: SearchParams) =>
  client.GET('/api/project/contract', { params: { query } });
// 创建合同
export const createContract = (body: components['schemas']['CreateContractDto']) =>
  client.POST('/api/project/contract', { body });
// 获取单个合同信息
export const getContractDetail = (id: number) =>
  client.GET('/api/project/contract/{id}', { params: { path: { id } } });
// 更新合同
export const updateContract = (body: components['schemas']['UpdateContractDto']) =>
  client.PATCH('/api/project/contract/{id}', { body, params: { path: { id: body.id } } });
// 删除合同
export const deleteContract = (id: number) =>
  client.DELETE('/api/project/contract/{id}', { params: { path: { id } } });
