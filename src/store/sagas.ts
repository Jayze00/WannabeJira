import {all, call} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import userSaga from './users/sagas';


export default function* rootSagas(): SagaIterator {
    yield all([
       call(userSaga)
    ]);
}
