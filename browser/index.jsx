/* eslint-disable camelcase */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store.jsx';
import { Login, Signup, UserHome } from './components/index.jsx';
import Main from './containers/Main.jsx'
import { me_dispatch } from './actions/user';
import { fetchAllListings_dispatch, fetchSingleListing_dispatch } from './actions/listing';
import ListingsContainer from './containers/ListingsContainer.jsx';
import ListingDetailContainer from './containers/ListingDetailContainer.jsx'

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={ () => store.dispatch(fetchAllListings_dispatch()) }>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="listings" component={ListingsContainer} />
        <Route path="listings/:listingId" component={ListingDetailContainer} onEnter={getCurrentListing} />
        <Route path="home" component={UserHome} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
