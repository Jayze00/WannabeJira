import {decrement, increment} from './actions';
import counterReducer from './reducers';

describe('versions reducers', (): void => {

  it('increment', (): void => {
    const action = increment();
    const mutatedState = counterReducer(0, action);

    expect(mutatedState).toEqual(1);
  });

  it('decrement', (): void => {
    const action = decrement();
    const mutatedState = counterReducer(3, action);

    expect(mutatedState).toEqual(2);
  });
});
