import {Action} from 'redux';

export interface Board {
  id: number;
  name: string;
  open: boolean;
}

export interface BoardState {
  boardCollection: Board[];
  boardName: string;
}

export interface CreateBoardRequest {
  name: string;
}

export const STORE_BOARDS = 'STORE_BOARDS';
export const SET_BOARD_NAME = 'SET_BOARD_NAME';
export const FETCH_BOARDS = 'FETCH_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';
export const CLOSE_BOARD = 'CLOSE_BOARD';

export type FetchBoardsAction = Action<typeof FETCH_BOARDS>;

export interface CreateBoardAction {
  type: typeof CREATE_BOARD;
  board: CreateBoardRequest;
}

export interface StoreBoardsAction {
  type: typeof STORE_BOARDS;
  boardCollection: Board[];
}

export interface SetBoardNameAction {
  type: typeof SET_BOARD_NAME;
  boardName: string;
}

export interface CloseBoardAction {
  type: typeof CLOSE_BOARD;
  board: Board;
}
