import {
  SET_MAIL,
  SET_MYSELF,
  SET_PASSWORD,
  SET_TOKEN,
  SET_USERNAME,
  SET_USERS,
  UserState
} from './types';
import {createReducer} from '../utility/reducer';
import {Action} from 'redux';

const initialState: UserState = {
  username: '',
  password: '',
  mail: '',
  token: null,
  users: [],
  myself: null
};

const userReducer = createReducer<UserState, Action>(initialState, {
  [SET_USERNAME]: (state, action): UserState => ({...state, username: action.username}),
  [SET_PASSWORD]: (state, action): UserState => ({...state, password: action.password}),
  [SET_MAIL]: (state, action): UserState => ({...state, mail: action.mail}),
  [SET_TOKEN]: (state, action): UserState => ({...state, token: action.token}),
  [SET_USERS]: (state, action): UserState => ({...state, users: action.users}),
  [SET_MYSELF]: (state, action): UserState => ({...state, myself: action.myself})
});

export default userReducer;
