import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.jsx';

ReactDOM.render(
  <div>Hello world from React!</div>,
  <Provider store={store}>
    {/* rest of your app goes here! */}
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
