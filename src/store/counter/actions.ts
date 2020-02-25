import {
  DECREMENT,
  DECREMENT_ASYNC,
  DecrementAction,
  DecrementAsyncAction,
  INCREMENT,
  INCREMENT_ASYNC,
  IncrementAction,
  IncrementAsyncAction
} from './types';

export function increment(): IncrementAction {
  return {
    type: INCREMENT
  };
}

export function decrement(): DecrementAction {
  return {
    type: DECREMENT
  };
}

export function incrementAsync(): IncrementAsyncAction {
  return {
    type: INCREMENT_ASYNC
  };
}

export function decrementAsync(): DecrementAsyncAction {
  return {
    type: DECREMENT_ASYNC
  };
}
