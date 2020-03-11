import {MESSAGE_TYPE_INFO, MessageState, SET_IS_OPEN, SET_MESSAGE} from './types';
import {createReducer} from '../utility/reducer';
import {Action} from 'redux';

const initialState: MessageState = {
  isOpen: false,
  text: '',
  type: MESSAGE_TYPE_INFO
};

const messageReducer = createReducer<MessageState, Action>(initialState, {
  [SET_IS_OPEN]: (state, action): MessageState => ({...state, isOpen: action.isOpen}),
  [SET_MESSAGE]: (state, action): MessageState => ({...action.message})
});

export default messageReducer;
