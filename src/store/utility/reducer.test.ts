import {createReducer} from './reducer';

describe('reducer utility', (): void => {

  const _ = undefined;

  const ACTION_TYPE = 'ACTION_TYPE';
  const UNKNOWN_ACTION_TYPE = 'UNKNOWN_ACTION_TYPE';

  it('created reducer calls function by action type', (): void => {
    const handlers = {ACTION_TYPE: jest.fn()};
    const action = {type: ACTION_TYPE};

    const reducer = createReducer(_, handlers);
    reducer(_, action);

    expect(handlers[ACTION_TYPE]).toHaveBeenCalledTimes(1);
  });

  it('created reducer calls no function for unknown action type', (): void => {
    const handlers = {ACTION_TYPE: jest.fn()};
    const action = {type: UNKNOWN_ACTION_TYPE};

    const reducer = createReducer(_, handlers);
    reducer(_, action);

    expect(handlers[ACTION_TYPE]).not.toHaveBeenCalled();
  });

  it('created reducer return unmutated state for unknown action type', (): void => {
    const handlers = {};
    const state = 0;
    const reducer = createReducer(state, handlers);
    const action = {type: UNKNOWN_ACTION_TYPE};

    const mutatedState = reducer(state, action);

    expect(mutatedState).toBe(state);
  });

});
