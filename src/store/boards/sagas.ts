import {call, takeEvery, put} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import {
  CLOSE_BOARD,
  CloseBoardAction,
  CREATE_BOARD,
  CreateBoardAction,
  FETCH_BOARDS
} from './types';
import * as api from '../../api/boards';
import {storeBoards} from './actions';

export function* fetchBoards(): SagaIterator {
  const boards = yield call(api.fetchBoards);
  yield put(storeBoards(boards));
}

export function* createBoard(action: CreateBoardAction): SagaIterator {
  yield call(api.createBoard, action.board);
  yield call(fetchBoards);
}

export function* closeBoard(action: CloseBoardAction): SagaIterator {
  yield call(api.updateBoard, {...action.board, open: false});
  yield call(fetchBoards);
}

export default function* boardSaga(): SagaIterator {
  yield takeEvery(FETCH_BOARDS, fetchBoards);
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(CLOSE_BOARD, closeBoard);
}
