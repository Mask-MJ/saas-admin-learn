import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type DeviceInfo = components['schemas']['DeviceEntity'];
export type SearchParams = operations['DeviceController_findAll']['parameters']['query'];

// 获取装置列表
export const getDeviceList = (query?: SearchParams) =>
  client.GET('/api/project/device', { params: { query } });
// 创建装置
export const createDevice = (body: components['schemas']['CreateDeviceDto']) =>
  client.POST('/api/project/device', { body });
// 获取单个装置信息
export const getDeviceDetail = (id: number) =>
  client.GET('/api/project/device/{id}', { params: { path: { id } } });
// 更新装置
export const updateDevice = (body: components['schemas']['UpdateDeviceDto']) =>
  client.PATCH('/api/project/device/{id}', { body, params: { path: { id: body.id } } });
// 删除装置
export const deleteDevice = (id: number) =>
  client.DELETE('/api/project/device/{id}', { params: { path: { id } } });
