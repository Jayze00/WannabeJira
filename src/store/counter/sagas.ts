import {delay, put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import {decrement, increment} from './actions';
import {DECREMENT_ASYNC, INCREMENT_ASYNC} from './types';

export function* incrementAsync(): SagaIterator {
  yield delay(1000);
  yield put(increment());
}

export function* decrementAsync(): SagaIterator {
  yield delay(1000);
  yield put(decrement());
}

export default function* counterSaga(): SagaIterator {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync);
  yield takeEvery(DECREMENT_ASYNC, decrementAsync);
}
