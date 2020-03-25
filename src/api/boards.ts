import {Board, CreateBoardRequest} from '../store/boards/types';
import {fetchWithToken} from './util';

export const fetchBoards = (): Promise<Board[]> => {
  return fetchWithToken('/api/boards')
    .then(res => res.json());
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

export const updateBoard = (board: Board): Promise<Board> => {
  return fetchWithToken(`/api/boards/${board.id}`, {
    method: 'PUT',
    body: JSON.stringify(board),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.json());
};
