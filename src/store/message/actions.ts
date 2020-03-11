import {MessageType, SET_IS_OPEN, SET_MESSAGE, SetIsOpenAction, SetMessageAction} from './types';

export function setIsOpen(isOpen: boolean): SetIsOpenAction {
  return {
    type: SET_IS_OPEN,
    isOpen
  };
}

export function setMessage(text: string, type: MessageType): SetMessageAction {
  return {
    type: SET_MESSAGE,
    message: {
      isOpen: true,
      text,
      type
    }
  };
}
