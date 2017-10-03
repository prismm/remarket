import { combineReducers } from 'redux';

import listing from './listing';
import user from './user';
import network from './network';
import browse from './browse';
import action from './action';

export default combineReducers({ listing, user, network, browse, action });