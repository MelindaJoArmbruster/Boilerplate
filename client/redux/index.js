import { combineReducers } from 'redux';
//replace the reducers below as needed
import defaultReducer1 from './defaultReducer1';
import defaultReducer2 from './defaultReducer2';

const appReducer = combineReducers({
  default1: defaultReducer1,
  default2: defaultReducer2,
  //replace reducers above and add other reducers as needed
});

export default appReducer;
