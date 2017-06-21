import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store.jsx';
import { Login, Signup, UserHome } from './components/index.jsx';
import { Main } from './containers/Main.jsx'
import { me } from './reducers/user';

const whoAmI = store.dispatch(me());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route onEnter={requireLogin}>
          <Route path="home" component={UserHome} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
