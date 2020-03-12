import {Board, CreateBoardRequest} from '../store/boards/types';
import {fetchWithToken} from './util';

export const fetchBoards = (): Promise<Board[]> => {
  fetchWithToken('/api/boards')
    .then(res => res.json());

  return Promise.resolve([
    {
      id: 1,
      name: 'board 1',
      isOpen: true
    },
    {
      id: 2,
      name: 'board 2',
      isOpen: true
    },
    {
      id: 3,
      name: 'board 3',
      isOpen: false
    },
    {
      id: 4,
      name: 'board 4',
      isOpen: true
    }
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
