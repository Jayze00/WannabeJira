import {User} from '../store/users/types';
import {fetchWithToken} from './util';

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
  return Promise.resolve(localStorage.getItem('authorization') ? {
    username: 'nbenz',
    id: 1,
    isAdmin: true
  } : null);
};
