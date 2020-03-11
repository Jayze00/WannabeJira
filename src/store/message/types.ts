export const MESSAGE_TYPE_ERROR = 'MESSAGE_TYPE_ERROR';
export const MESSAGE_TYPE_WARNING = 'MESSAGE_TYPE_WARNING';
export const MESSAGE_TYPE_INFO = 'MESSAGE_TYPE_INFO';
export const MESSAGE_TYPE_SUCCESS = 'MESSAGE_TYPE_SUCCESS';

export type MessageType =
  typeof MESSAGE_TYPE_ERROR
  | typeof MESSAGE_TYPE_WARNING
  | typeof MESSAGE_TYPE_INFO
  | typeof MESSAGE_TYPE_SUCCESS;

export interface Message {
  isOpen: boolean;
  text: string;
  type: MessageType;
}

export type MessageState = Message;

export const SET_IS_OPEN = 'SET_IS_OPEN';
export const SET_MESSAGE = 'SET_MESSAGE';

export interface SetIsOpenAction {
  type: typeof SET_IS_OPEN;
  isOpen: boolean;
}

export interface SetMessageAction {
  type: typeof SET_MESSAGE;
  message: Message;
}
