import {all, call} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import userSaga from './users/sagas';
import boardSaga from './boards/sagas';
import issueSaga from './issues/sagas';


export default function* rootSagas(): SagaIterator {
    yield all([
       call(userSaga),
       call(boardSaga),
       call(issueSaga)
    ]);
}
