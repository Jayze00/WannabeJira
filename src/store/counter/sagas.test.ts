import {delay, put} from 'redux-saga/effects';
import * as sagas from './sagas';
import {decrement, increment} from './actions';

describe('versions sagas', (): void => {

  it('increment async', (): void => {
    const generator = sagas.incrementAsync();

    expect(generator.next().value).toEqual(delay(1000));
    expect(generator.next().value).toEqual(put(increment()));
    expect(generator.next().done).toBeTruthy();
  });

  it('decrement async', (): void => {
    const generator = sagas.decrementAsync();

    expect(generator.next().value).toEqual(delay(1000));
    expect(generator.next().value).toEqual(put(decrement()));
    expect(generator.next().done).toBeTruthy();
  });

});
