import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type PostInfo = components['schemas']['PostEntity'];
export type SearchParams = operations['PostController_findAll']['parameters']['query'];

// 获取岗位列表
export const getPostList = (query?: SearchParams) =>
  client.GET('/api/system/post', { params: { query } });
// 创建岗位
export const createPost = (body: components['schemas']['CreatePostDto']) =>
  client.POST('/api/system/post', { body });
// 获取单个岗位详情
export const getPostDetail = (id: number) =>
  client.GET('/api/system/post/{id}', { params: { path: { id } } });
// 更新岗位
export const updatePost = (body: components['schemas']['UpdatePostDto']) =>
  client.PATCH('/api/system/post/{id}', { body, params: { path: { id: body.id } } });
// 删除岗位
export const deletePost = (id: number) =>
  client.DELETE('/api/system/post/{id}', { params: { path: { id } } });
