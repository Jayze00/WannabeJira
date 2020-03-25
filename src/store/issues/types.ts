import {User} from '../users/types';
import {Board} from '../boards/types';

export const ISSUE_STATUS_TO_DO = 'toDo';
export const ISSUE_STATUS_IN_PROGRESS = 'inProgress';
export const ISSUE_STATUS_DONE = 'done';
export type IssueStatus = typeof ISSUE_STATUS_TO_DO | typeof ISSUE_STATUS_IN_PROGRESS | typeof ISSUE_STATUS_DONE;

export interface Issue {
  id: number;
  title: string;
  description: string;
  user: User;
  status: IssueStatus;
  board: Board;
}

export interface IssueCollection {
  [toDo: string]: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

export interface NewIssue {
  title: string;
  description: string;
  user: User | null;
}

export interface IssueState {
  selectedBoard: Board | null;
  issueCollection: IssueCollection;
  newIssue: NewIssue;
}

export const STORE_ISSUES = 'STORE_ISSUES';
export const SET_SELECTED_BOARD = 'SET_SELECTED_BOARD';
export const SET_NEW_ISSUE = 'SET_NEW_ISSUE';
export const FETCH_ISSUES = 'FETCH_ISSUES';
export const CREATE_ISSUE = 'CREATE_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';

export interface StoreIssuesAction {
  type: typeof STORE_ISSUES;
  issueCollection: IssueCollection;
}

export interface SetSelectedBoardAction {
  type: typeof SET_SELECTED_BOARD;
  selectedBoard: Board;
}

export interface SetNewIssueAction {
  type: typeof SET_NEW_ISSUE;
  newIssue: NewIssue;
}

export interface FetchIssuesAction {
  type: typeof FETCH_ISSUES;
  board: Board;
}

export interface CreateIssueAction {
  type: typeof CREATE_ISSUE;
  board: Board;
  issue: NewIssue;
}

export interface UpdateIssueAction {
  type: typeof UPDATE_ISSUE;
  issue: Issue;
}

export interface DeleteIssueAction {
  type: typeof DELETE_ISSUE;
  issue: Issue;
}
