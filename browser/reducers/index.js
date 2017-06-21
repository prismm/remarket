import { combineReducers } from 'redux';

import listing from './listing';
import user from './user';
import network from './network';

export default combineReducers({ listing, user, network });