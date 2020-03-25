import {IssueState, SET_NEW_ISSUE, SET_SELECTED_BOARD, STORE_ISSUES} from './types';
import {createReducer} from '../utility/reducer';
import {Action} from 'redux';

const initialState: IssueState = {
  issueCollection: {
    toDo: [],
    inProgress: [],
    done: []
  },
  newIssue: {
    title: '',
    description: '',
    user: null
  },
  selectedBoard: null
};

const issueReducer = createReducer<IssueState, Action>(initialState, {
  [STORE_ISSUES]: (state, action): IssueState => ({
    ...state,
    issueCollection: action.issueCollection
  }),
  [SET_SELECTED_BOARD]: (state, action): IssueState => ({...state, selectedBoard: action.selectedBoard}),
  [SET_NEW_ISSUE]: (state, action): IssueState => ({...state, newIssue: action.newIssue})
});

export default issueReducer;
