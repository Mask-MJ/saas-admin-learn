import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type RuleInfo = components['schemas']['RuleEntity'];
export type SearchParams = operations['RuleController_findAll']['parameters']['query'];

// 获取规则列表
export const getRuleList = (query?: SearchParams) =>
  client.GET('/api/system/rule', { params: { query } });
// 创建规则
export const createRule = (body: components['schemas']['CreateRuleDto']) =>
  client.POST('/api/system/rule', { body });
// 获取单个规则详情
export const getRuleDetail = (id: number) =>
  client.GET('/api/system/rule/{id}', { params: { path: { id } } });
// 更新规则
export const updateRule = (body: components['schemas']['UpdateRuleDto']) =>
  client.PATCH('/api/system/rule/{id}', { body, params: { path: { id: body.id } } });
// 删除规则
export const deleteRule = (id: number) =>
  client.DELETE('/api/system/rule/{id}', { params: { path: { id } } });

// 上传规则文件
export const uploadRuleFile = (body: any) => {
  // console.log(body);
  return client.POST('/api/system/rule/upload', { body });
};
