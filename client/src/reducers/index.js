import { combineReducers } from 'redux';
import headlinesReducer from './headlines_reducer';

const appReducer = combineReducers({
  headlinesReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;