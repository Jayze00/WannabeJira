import {
  CREATE_ISSUE,
  CreateIssueAction,
  DELETE_ISSUE,
  DeleteIssueAction,
  FETCH_ISSUES,
  FetchIssuesAction,
  Issue,
  IssueCollection,
  NewIssue,
  SET_NEW_ISSUE,
  SET_SELECTED_BOARD,
  SetNewIssueAction,
  SetSelectedBoardAction,
  STORE_ISSUES,
  StoreIssuesAction,
  UPDATE_ISSUE,
  UpdateIssueAction
} from './types';
import {Board} from '../boards/types';

export function storeIssues(issueCollection: IssueCollection): StoreIssuesAction {
  return {
    type: STORE_ISSUES,
    issueCollection
  };
}

export function setSelectedBoard(selectedBoard: Board): SetSelectedBoardAction {
  return {
    type: SET_SELECTED_BOARD,
    selectedBoard
  };
}

export function setNewIssue(newIssue: NewIssue): SetNewIssueAction {
  return {
    type: SET_NEW_ISSUE,
    newIssue
  };
}

export function fetchIssues(board: Board): FetchIssuesAction {
  return {
    type: FETCH_ISSUES,
    board
  };
}

export function createIssue(board: Board, issue: NewIssue): CreateIssueAction {
  return {
    type: CREATE_ISSUE,
    issue,
    board
  };
}

export function updateIssue(issue: Issue): UpdateIssueAction {
  return {
    type: UPDATE_ISSUE,
    issue
  };
}

export function deleteIssue(issue: Issue): DeleteIssueAction {
  return {
    type: DELETE_ISSUE,
    issue
  };
}
