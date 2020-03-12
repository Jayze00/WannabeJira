import {BoardState, SET_BOARD_NAME, STORE_BOARDS} from './types';
import {createReducer} from '../utility/reducer';
import {Action} from 'redux';

const initialState: BoardState = {
  boardCollection: [],
  boardName: ''
};

const boardReducer = createReducer<BoardState, Action>(initialState, {
  [STORE_BOARDS]: (state, action): BoardState => ({
    ...state,
    boardCollection: action.boardCollection
  }),
  [SET_BOARD_NAME]: (state, action): BoardState => ({...state, boardName: action.boardName})
});

export default boardReducer;
