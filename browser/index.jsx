/* eslint-disable camelcase */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store.jsx';

import { me_dispatch } from './actions/user';
import { fetchAllListings_dispatch, fetchSingleListing_dispatch } from './actions/listing';
import { fetchAllNetworks_dispatch } from './actions/network';

import { Login, Signup } from './containers/Auth.jsx'
import Main from './containers/Main.jsx'
import ListingsContainer from './containers/ListingsContainer.jsx';
import ListingDetailContainer from './containers/ListingDetailContainer.jsx'
import CreateListing from './containers/CreateListing.jsx';
import AccountContainer from './containers/Account.jsx';
import AddNetwork from './containers/AddNetwork.jsx'

const whoAmI = store.dispatch(me_dispatch());
const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));

const getCurrentListing = (nextRouterState) => {
  store.dispatch(fetchSingleListing_dispatch(nextRouterState.params.listingId));
}

const loadEverything = () => {
  store.dispatch(fetchAllListings_dispatch());
  store.dispatch(fetchAllNetworks_dispatch())
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={loadEverything}>
        <IndexRoute component={ListingsContainer} />
        <Route path="login" component={Login} />
        <Route path="home" component={ListingsContainer} />
        <Route path="signup" component={Signup} />
        <Route path="listings/post" component={CreateListing} onEnter={requireLogin} />
        <Route path="listings/:listingId" component={ListingDetailContainer} onEnter={getCurrentListing} />
        <Route path="addnetwork" component={AddNetwork} onEnter={loadEverything} />
        <Route path="myaccount" component={AccountContainer} />
      </Route>
      <Route path="listings" component={ListingsContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
