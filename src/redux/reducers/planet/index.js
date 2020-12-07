import { combineReducers } from 'redux';

import planetList from './planetList';
import planetShow from './planetShow';

export default combineReducers({
  list: planetList,
  show: planetShow,
});
