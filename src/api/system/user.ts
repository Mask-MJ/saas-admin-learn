import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type UserInfo = components['schemas']['UserEntity'];
export type SearchParams = operations['UserController_findAll']['parameters']['query'];

// 注册
export const register = (body: components['schemas']['SignUpDto']) =>
  client.POST('/api/authentication/sign-up', { body });
// 登录
export const login = (body: components['schemas']['SignInDto']) =>
  client.POST('/api/authentication/sign-in', { body });
// 获取自身用户信息
export const getSelfInfo = () => client.GET('/api/system/user/info');

// 获取用户列表
export const getUserList = (query?: SearchParams) =>
  client.GET('/api/system/user', { params: { query } });
// 创建用户
export const createUser = (body: components['schemas']['CreateUserDto']) =>
  client.POST('/api/system/user', { body });
// 获取用户详情
export const getUserDetail = (id: number) =>
  client.GET('/api/system/user/{id}', { params: { path: { id } } });
// 修改密码
export const changePassword = (body: components['schemas']['ChangePasswordDto']) =>
  client.PATCH('/api/system/user/changePassword', { body });
// 修改用户信息
export const updateUser = (body: components['schemas']['UpdateUserDto']) =>
  client.PATCH('/api/system/user/{id}', { body, params: { path: { id: body.id } } });
// 删除用户
export const deleteUser = (id: number) =>
  client.DELETE('/api/system/user/{id}', { params: { path: { id } } });
