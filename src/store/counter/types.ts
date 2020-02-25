import {Action} from 'redux';

export type CounterState = number;

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

export type IncrementAction = Action<typeof INCREMENT>;
export type DecrementAction = Action<typeof DECREMENT>;
export type IncrementAsyncAction = Action<typeof INCREMENT_ASYNC>;
export type DecrementAsyncAction = Action<typeof DECREMENT_ASYNC>;
