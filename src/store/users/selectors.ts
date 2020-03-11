import {AppState} from '../index';

export const getUsername = ({users}: AppState): string => {
  return users.username;
};
export const getPassword = ({users}: AppState): string => {
  return users.password;
};
export const getMail = ({users}: AppState): string => {
  return users.mail;
};
