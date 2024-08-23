import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type AnalysisTaskInfo = components['schemas']['AnalysisTaskEntity'];
export type SearchParams = operations['AnalysisTaskController_findAll']['parameters']['query'];

// 获取分析任务列表
export const getAnalysisTaskList = (query?: SearchParams) =>
  client.GET('/api/project/analysis-task', { params: { query } });
// 创建分析任务
export const createAnalysisTask = (body: components['schemas']['CreateAnalysisTaskDto']) =>
  client.POST('/api/project/analysis-task', { body });
// 获取单个分析任务信息
export const getAnalysisTaskDetail = (id: number) =>
  client.GET('/api/project/analysis-task/{id}', { params: { path: { id } } });
// 更新分析任务
export const updateAnalysisTask = (body: components['schemas']['UpdateAnalysisTaskDto']) =>
  client.PATCH('/api/project/analysis-task/{id}', { body, params: { path: { id: body.id } } });
// 删除分析任务
export const deleteAnalysisTask = (id: number) =>
  client.DELETE('/api/project/analysis-task/{id}', { params: { path: { id } } });

// 上传分析任务pdf
export const uploadAnalysisTaskPdf = (body: any) =>
  client.POST('/api/project/analysis-task/uploadPdf', { body });
// 执行分析任务
export const executeAnalysisTask = (id: number) =>
  client.POST('/api/project/analysis-task/execute/{id}', { params: { path: { id } } });
// // 获取执行状态
// export const getExecuteStatus = (id: number) =>
//   client.GET('/api/project/analysis-task/executeStatus/{id}', { params: { path: { id } } });
// 获取分析任务结果
export const getAnalysisTaskResult = (id: number) =>
  client.GET('/api/project/analysis-task/result/{id}', { params: { path: { id } } });
