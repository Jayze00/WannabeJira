import {all, call} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import counterSaga from './counter/sagas';


export default function* rootSagas(): SagaIterator {
    yield all([
       call(counterSaga)
    ]);
}
