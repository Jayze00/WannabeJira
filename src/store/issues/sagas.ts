import {call, put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import {
  CREATE_ISSUE,
  CreateIssueAction,
  DELETE_ISSUE,
  DeleteIssueAction,
  FETCH_ISSUES,
  FetchIssuesAction,
  UPDATE_ISSUE,
  UpdateIssueAction
} from './types';
import * as api from '../../api/issues';
import * as actions from './actions';

export function* fetchIssues(action: FetchIssuesAction): SagaIterator {
  const issues = yield call(api.fetchIssues, action.board);
  yield put(actions.storeIssues(issues));
}

export function* createIssue(action: CreateIssueAction): SagaIterator {
  yield call(api.createIssue, action.board, action.issue);
  yield put(actions.fetchIssues(action.board));
}

export function* updateIssue(action: UpdateIssueAction): SagaIterator {
  yield call(api.updateIssue, action.issue);
  yield put(actions.fetchIssues(action.issue.board));
}

export function* deleteIssue(action: DeleteIssueAction): SagaIterator {
  yield call(api.deleteIssue, action.issue);
  yield put(actions.fetchIssues(action.issue.board));
}

export default function* issueSaga(): SagaIterator {
  yield takeEvery(FETCH_ISSUES, fetchIssues);
  yield takeEvery(CREATE_ISSUE, createIssue);
  yield takeEvery(UPDATE_ISSUE, updateIssue);
  yield takeEvery(DELETE_ISSUE, deleteIssue);
}
