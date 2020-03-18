import {User} from '../store/users/types';
import {fetchWithToken} from './util';
import {user1, user2, user3, user4} from './mockdata';

export const login = (username: string, password: string): Promise<string | null> => {
  fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.ok ? res.json() : null);
  return Promise.resolve('token');
};

export const register = (username: string, password: string, mail: string): Promise<boolean> => {
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({username, password, mail}),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.ok);
};

export const myself = (): Promise<User | null> => {
  fetchWithToken('/api/users/myself')
    .then(res => res.ok ? res.json() : null);
  return Promise.resolve(localStorage.getItem('authorization') ? user1 : null);
};

export const setIsAdmin = (user: User, isAdmin: boolean): Promise<User> => {
  return fetchWithToken(`/api/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify({...user, isAdmin}),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.json());
};

export const fetchUsers = (): Promise<User[]> => {
  fetchWithToken('/api/users').then(res => res.json());
  return Promise.resolve([
    user1,
    user2,
    user3,
    user4
  ]);
};
