import {Board, CreateBoardRequest} from '../store/boards/types';
import {fetchWithToken} from './util';
import {board1, board2, board3} from './mockdata';

export const fetchBoards = (): Promise<Board[]> => {
  fetchWithToken('/api/boards')
    .then(res => res.json());

  return Promise.resolve([
    board1,
    board2,
    board3
  ]);
};

export const createBoard = (board: CreateBoardRequest): Promise<Board[]> => {
  return fetchWithToken('/api/boards', {
    method: 'POST',
    body: JSON.stringify(board),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.json());
};
