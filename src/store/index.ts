import {combineReducers} from 'redux';
import counterReducer from './counter/reducers';

const rootReducer = combineReducers({
   counter: counterReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
