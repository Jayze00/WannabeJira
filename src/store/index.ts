import {combineReducers} from 'redux';
import userReducer from './users/reducers';
import messageReducer from './message/reducers';

const rootReducer = combineReducers({
  users: userReducer,
  message: messageReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
