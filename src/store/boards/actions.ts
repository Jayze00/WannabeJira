import {
  Board,
  CREATE_BOARD,
  CreateBoardAction,
  FETCH_BOARDS,
  FetchBoardsAction,
  SET_BOARD_NAME,
  SetBoardNameAction,
  STORE_BOARDS,
  StoreBoardsAction
} from './types';

export function storeBoards(boardCollection: Board[]): StoreBoardsAction {
  return {
    type: STORE_BOARDS,
    boardCollection
  };
}

export function setBoardName(boardName: string): SetBoardNameAction {
  return {
    type: SET_BOARD_NAME,
    boardName
  };
}

export function fetchBoards(): FetchBoardsAction {
  return {
    type: FETCH_BOARDS
  };
}

export function createBoard(name: string): CreateBoardAction {
  return {
    type: CREATE_BOARD,
    board: {name}
  };
}
