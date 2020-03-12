import {combineReducers} from 'redux';
import userReducer from './users/reducers';
import messageReducer from './message/reducers';
import boardReducer from './boards/reducers';

const rootReducer = combineReducers({
  users: userReducer,
  message: messageReducer,
  boards: boardReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
