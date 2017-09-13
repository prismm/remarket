/* eslint-disable camelcase */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store.jsx';

import { me_dispatch, viewUser_dispatch, viewUserListings_dispatch, setDestination_action } from './actions/user';
import { fetchAllListings_dispatch, fetchSingleListing_dispatch, fetchListingsByUser_dispatch } from './actions/listing';
import { fetchAllNetworks_dispatch } from './actions/network';

import LoginOrSignup from './components/LoginOrSignup.jsx';
import Success from './components/Success.jsx';
import Main from './containers/Main.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import ListingsContainer from './containers/ListingsContainer.jsx';
import ListingDetail from './components/ListingDetail.jsx'
import CreateListing from './containers/CreateListing.jsx';
import AccountContainer from './containers/Account.jsx';
import AddNetwork from './containers/AddNetwork.jsx';
import Profile from './containers/Profile.jsx';
import MyListings from './components/MyListings.jsx';
import MyOffers from './components/MyOffers.jsx';
import MySavedListings from './components/MySavedListings.jsx';
import ForSaleListingsList from './components/ForSaleListingsList.jsx';
import HousingListingsList from './components/HousingListingsList.jsx';
import CommunityListingsList from './components/CommunityListingsList.jsx'
import PublicProfile from './components/PublicProfile.jsx'

const recordPageView = (pageName, id) => window.analytics.page(pageName, id);

const whoAmI = store.dispatch(me_dispatch());

const requireLogin = (nextRouterState, replace, next) => {
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) {
        store.dispatch(setDestination_action(nextRouterState.location.pathname)); //captures destination for post-login route
        replace('/login');
      }
      recordPageView('Create Listing', user.id)
      next();
    })
    .catch(console.error)
  }

const getCurrentListing = (nextRouterState) => {
  store.dispatch(fetchSingleListing_dispatch(nextRouterState.params.listingId));
  recordPageView();
}

const getMyListings = (nextRouterState, replace, next) => {
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) {
        store.dispatch(setDestination_action(nextRouterState.location.pathname));  //captures destination for post-login route
        replace('/login')
      }
      store.dispatch(fetchListingsByUser_dispatch(user.id));
      recordPageView('Account', user.id);
      next();
    })
    .catch(console.error)
}

const viewUser = (nextRouterState, replace, next) => {
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) {
        store.dispatch(setDestination_action(nextRouterState.location.pathname));  //captures destination for post-login route
        replace('/login')
      }
      store.dispatch(viewUser_dispatch(nextRouterState.params.userId));
      store.dispatch(viewUserListings_dispatch(nextRouterState.params.userId));
      recordPageView();
      next();
    })
    .catch(console.error)
}

const loadEverything = () => {
  store.dispatch(fetchAllListings_dispatch());
  store.dispatch(fetchAllNetworks_dispatch());
  recordPageView();
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={loadEverything}>
        <IndexRoute component={ListingsContainer} />
        <Route path="account-created" redirectTo="/login" redirectToName="login" component={Success} onEnter={recordPageView} />
        <Route path="network-added" redirectTo="/account/managenetworks" redirectToName="your account" component={Success} onEnter={recordPageView} />
        <Route path="login" method="login" component={LoginOrSignup} onEnter={recordPageView} />
        <Route path="signup" method="signup" component={LoginOrSignup} onEnter={recordPageView} />
        <Route path="home" component={ListingsContainer} onEnter={loadEverything} />
        <Route path="about" component={About} onEnter={recordPageView} />
        <Route path="contact" component={Contact} onEnter={recordPageView} />
        <Route path="for-sale" component={ForSaleListingsList} onEnter={recordPageView} />
          <Route path="for-sale/books" component={ForSaleListingsList} subcategory="books" onEnter={recordPageView} />
          <Route path="for-sale/furniture" component={ForSaleListingsList} subcategory="furniture" onEnter={recordPageView} />
          <Route path="for-sale/electronics" component={ForSaleListingsList} subcategory="electronics" onEnter={recordPageView} />
          <Route path="for-sale/free" component={ForSaleListingsList} subcategory="free" onEnter={recordPageView} />
          <Route path="for-sale/other" component={ForSaleListingsList} subcategory="other" onEnter={recordPageView} />
        <Route path="housing" component={HousingListingsList} onEnter={recordPageView}  />
            <Route path="housing/seeking" component={HousingListingsList} subcategory="seeking" onEnter={recordPageView}  />
            <Route path="housing/available" component={HousingListingsList} subcategory="available" onEnter={recordPageView}  />
            <Route path="housing/other" component={HousingListingsList} subcategory="other" onEnter={recordPageView} />
        <Route path="community" component={CommunityListingsList} onEnter={recordPageView} />
            <Route path="community/jobs" component={CommunityListingsList} subcategory="jobs" onEnter={recordPageView} />
            <Route path="community/events" component={CommunityListingsList} subcategory="events" onEnter={recordPageView} />
            <Route path="community/other" component={CommunityListingsList} subcategory="other" onEnter={recordPageView} />
        <Route path="user/:userId" component={PublicProfile} onEnter={viewUser} />
        <Route path="listings/post" component={CreateListing} onEnter={requireLogin} />
        <Route path="listings/:listingId" component={ListingDetail} onEnter={getCurrentListing} />
        <Route path="account" component={AccountContainer} onEnter={getMyListings} >
          <IndexRoute component={Profile} />
          <Route path="/account/managenetworks" component={AddNetwork} onEnter={recordPageView} />
          <Route path="/account/managelistings" component={MyListings} onEnter={recordPageView} />
          <Route path="/account/manageoffers" component={MyOffers} onEnter={recordPageView} />
          <Route path="/account/savedlistings" component={MySavedListings} onEnter={recordPageView} />
        </Route>
      </Route>
      <Route path="listings" component={ListingsContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
