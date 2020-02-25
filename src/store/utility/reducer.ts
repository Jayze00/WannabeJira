import {Action, AnyAction, Reducer} from 'redux';

interface ReducerObject {
  [actionKey: string]: Reducer;
}

export function createReducer<S, A extends Action = AnyAction>(initialState: S, reducerObject: ReducerObject): Reducer<S, A> {
  return (state = initialState, action): S => {
    if (Object.prototype.hasOwnProperty.call(reducerObject, action.type)) {
      return reducerObject[action.type](state, action);
    }
    return state;
  };
}
