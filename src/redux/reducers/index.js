import { combineReducers } from 'redux';

import planet from './planet';
import resident from './resident';

export default combineReducers({
  planet,
  resident
});
