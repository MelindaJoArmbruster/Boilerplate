import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import TopComponent from './components/TopComponent';
import '../public/index.css';

ReactDOM.render(
  <Provider store={store}>
    <TopComponent />
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
