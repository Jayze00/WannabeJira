import {Action} from 'redux';

export interface User {
  id: number;
  username: string;
  admin: boolean;
}

export interface UserState {
  myself: User | null;
  users: User[];
  username: string;
  password: string;
  mail: string;
  token: string | null;
}

export const SET_MYSELF = 'SET_MYSELF';
export const SET_USERS = 'SET_USERS';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_MAIL = 'SET_MAIL';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SET_TOKEN = 'SET_TOKEN';
export const FETCH_MYSELF = 'FETCH_MYSELF';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';
export const FETCH_USERS = 'FETCH_USERS';

export type LoginAction = Action<typeof LOGIN>;
export type RegisterAction = Action<typeof REGISTER>;
export type FetchMyselfAction = Action<typeof FETCH_MYSELF>;
export type FetchUsersAction = Action<typeof FETCH_USERS>;

export interface SetMyselfAction {
  type: typeof SET_MYSELF;
  myself: User | null;
}

export interface SetUsersAction {
  type: typeof SET_USERS;
  users: User[];
}

export interface SetUsernameAction {
  type: typeof SET_USERNAME;
  username: string;
}

export interface SetPasswordAction {
  type: typeof SET_PASSWORD;
  password: string;
}

export interface SetMailAction {
  type: typeof SET_MAIL;
  mail: string;
}

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  token: string;
}

export interface SetIsAdminAction {
  type: typeof SET_IS_ADMIN;
  user: User;
  isAdmin: boolean;
}
