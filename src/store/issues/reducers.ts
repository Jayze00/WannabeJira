import {IssueState, SET_SELECTED_BOARD, STORE_ISSUES} from './types';
import {createReducer} from '../utility/reducer';
import {Action} from 'redux';

const initialState: IssueState = {
  issueCollection: {
    toDo: [],
    inProgress: [],
    done: []
  },
  newIssue: {
    name: '',
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
  [SET_SELECTED_BOARD]: (state, action): IssueState => ({...state, selectedBoard: action.selectedBoard})
});

export default issueReducer;
