import {call, put, select, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import {FETCH_MYSELF, LOGIN, REGISTER, SET_TOKEN, SetTokenAction} from './types';
import * as api from '../../api/users';
import {getMail, getPassword, getUsername} from './selectors';
import {setMessage} from '../message/actions';
import {MESSAGE_TYPE_ERROR} from '../message/types';
import {setMyself, setToken} from './actions';

export function* fetchMyself(): SagaIterator {
  const res = yield call(api.myself);
  yield put(setMyself(res));
}

export function* login(): SagaIterator {
  const username = yield select(getUsername);
  const password = yield select(getPassword);
  const token = yield call(api.login, username, password);
  if (token) {
    yield put(setToken(token));
    yield call(fetchMyself);
  } else {
    yield put(setMessage('Wrong credentials.', MESSAGE_TYPE_ERROR));
  }
}

export function* register(): SagaIterator {
  const username = yield select(getUsername);
  const password = yield select(getPassword);
  const mail = yield select(getMail);
  const success = yield call(api.register, username, password, mail);
  if (success) {
    yield call(login);
  } else {
    yield put(setMessage('The username is already taken.', MESSAGE_TYPE_ERROR));
  }
}

export function saveTokenToLocalStorage(action: SetTokenAction): void {
  localStorage.setItem('authorization', action.token);
  localStorage.setItem('auth-timestamp', new Date().getTime().toString());
}

export default function* userSaga(): SagaIterator {
  yield takeEvery(LOGIN, login);
  yield takeEvery(REGISTER, register);
  yield takeEvery(SET_TOKEN, saveTokenToLocalStorage);
  yield takeEvery(FETCH_MYSELF, fetchMyself);
}
