import {User} from '../store/users/types';
import {fetchWithToken} from './util';

export const login = (username: string, password: string): Promise<string | null> => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.ok ? res.headers.get('Authorization') : null);
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

export const myself = async (): Promise<User | null> => {
  const res = await fetchWithToken('/api/users/myself');
  return await res.json();
};

export const setIsAdmin = (user: User, isAdmin: boolean): Promise<boolean> => {
  return fetchWithToken(`/api/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify({...user, admin: isAdmin}),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.ok);
};

export const fetchUsers = (): Promise<User[]> => {
  return fetchWithToken('/api/users').then(res => res.json());
};
