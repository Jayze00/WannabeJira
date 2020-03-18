import {
  Issue,
  ISSUE_STATUS_DONE,
  ISSUE_STATUS_IN_PROGRESS,
  ISSUE_STATUS_TO_DO, IssueCollection
} from '../store/issues/types';
import {User} from '../store/users/types';
import {Board} from '../store/boards/types';

export const user1: User = {
  id: 1,
  username: 'nbenz',
  isAdmin: true
};

export const user2: User = {
  id: 2,
  username: 'theimgartner',
  isAdmin: false
};

export const user3: User = {
  id: 3,
  username: 'bhiestand',
  isAdmin: true
};
export const user4: User = {
  id: 4,
  username: 'jkobel',
  isAdmin: true
};

export const board1: Board = {
  id: 1,
  name: 'board 1',
  isOpen: true
};

export const board2: Board = {
  id: 2,
  name: 'board 2',
  isOpen: true
};

export const board3: Board = {
  id: 3,
  name: 'board 3',
  isOpen: false
};

export const issue1: Issue = {
  id: 1,
  name: 'issue 1',
  description: 'this is the issue 1 description',
  user: user1,
  status: ISSUE_STATUS_TO_DO,
  board: board1
};

export const issue2: Issue = {
  id: 2,
  name: 'issue 2',
  description: 'this is the issue 2 description',
  user: user1,
  status: ISSUE_STATUS_TO_DO,
  board: board1
};

export const issue3: Issue = {
  id: 3,
  name: 'issue 3',
  description: 'this is the issue 3 description',
  user: user2,
  status: ISSUE_STATUS_DONE,
  board: board1
};

export const issue4: Issue = {
  id: 4,
  name: 'issue 4',
  description: 'this is the issue 4 description',
  user: user2,
  status: ISSUE_STATUS_IN_PROGRESS,
  board: board1
};

export const issue5: Issue = {
  id: 5,
  name: 'issue 5',
  description: 'this is the issue 5 description',
  user: user1,
  status: ISSUE_STATUS_TO_DO,
  board: board2
};

export const issue6: Issue = {
  id: 6,
  name: 'issue 6',
  description: 'this is the issue 6 description',
  user: user1,
  status: ISSUE_STATUS_DONE,
  board: board2
};

export const issue7: Issue = {
  id: 7,
  name: 'issue 7',
  description: 'this is the issue 7 description',
  user: user1,
  status: ISSUE_STATUS_DONE,
  board: board3
};

export const getMockIssueCollection = (board: Board): IssueCollection => {
  if(board.id === 1) {
    return {
      toDo: [
        issue1,
        issue2
      ],
      inProgress: [
        issue4
      ],
      done: [
        issue3
      ]
    };
  }
  if(board.id === 2) {
    return {
      toDo: [
        issue5
      ],
      inProgress: [],
      done: [
        issue6
      ]
    };
  }
  return {
    toDo: [
    ],
    inProgress: [],
    done: [
      issue7
    ]
  };
};
