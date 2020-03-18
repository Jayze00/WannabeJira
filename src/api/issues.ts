import {fetchWithToken} from './util';
import {Board} from '../store/boards/types';
import {Issue, IssueCollection, NewIssue} from '../store/issues/types';
import {getMockIssueCollection} from './mockdata';

export const fetchIssues = (board: Board): Promise<IssueCollection> => {
  fetchWithToken(`/api/boards/${board.id}/issues`)
    .then(res => res.json());
  return Promise.resolve(getMockIssueCollection(board));
};

export const createIssue = (board: Board, issue: NewIssue): Promise<Issue> => {
  return fetchWithToken(`/api/boards/${board.id}/issues`, {
    method: 'POST',
    body: JSON.stringify(issue),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.json());
};

export const updateIssue = (issue: Issue): Promise<Issue> => {
  return fetchWithToken(`/api/boards/${issue.board.id}/issues/${issue.id}`, {
    method: 'PUT',
    body: JSON.stringify(issue),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.json());
};

export const deleteIssue = (issue: Issue): Promise<number> => {
  return fetchWithToken(`/api/boards/${issue.board.id}/issues/${issue.id}`, {
    method: 'DELETE'
  }).then(res => res.status);
};
