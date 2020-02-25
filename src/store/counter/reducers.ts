import {CounterState, DECREMENT, INCREMENT} from './types';
import {createReducer} from '../utility/reducer';
import {Action} from 'redux';

const initialState: CounterState = 0;

const counterReducer = createReducer<CounterState, Action>(initialState, {
  [INCREMENT]: (state): CounterState => state + 1,
  [DECREMENT]: (state): CounterState => state - 1
});

export default counterReducer;
