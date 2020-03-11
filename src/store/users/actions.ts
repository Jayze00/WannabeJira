import {
  FETCH_MYSELF,
  FetchMyselfAction,
  LOGIN,
  LoginAction,
  REGISTER,
  RegisterAction,
  SET_MAIL,
  SET_MYSELF,
  SET_PASSWORD,
  SET_TOKEN,
  SET_USERNAME,
  SET_USERS,
  SetMailAction,
  SetMyselfAction,
  SetPasswordAction,
  SetTokenAction,
  SetUsernameAction,
  SetUsersAction,
  User
} from './types';

export function setUsername(username: string): SetUsernameAction {
  return {
    type: SET_USERNAME,
    username
  };
}

export function setPassword(password: string): SetPasswordAction {
  return {
    type: SET_PASSWORD,
    password
  };
}

export function setMail(mail: string): SetMailAction {
  return {
    type: SET_MAIL,
    mail
  };
}

export function setToken(token: string): SetTokenAction {
  return {
    type: SET_TOKEN,
    token
  };
}

export function setMyself(myself: User): SetMyselfAction {
  return {
    type: SET_MYSELF,
    myself
  };
}

export function setUsers(users: User[]): SetUsersAction {
  return {
    type: SET_USERS,
    users
  };
}

export function login(): LoginAction {
  return {
    type: LOGIN
  };
}

export function register(): RegisterAction {
  return {
    type: REGISTER
  };
}

export function fetchMyself(): FetchMyselfAction {
  return {
    type: FETCH_MYSELF
  };
}
