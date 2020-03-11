export const MESSAGE_TYPE_ERROR = 'error';
export const MESSAGE_TYPE_WARNING = 'warning';
export const MESSAGE_TYPE_INFO = 'info';
export const MESSAGE_TYPE_SUCCESS = 'success';

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
