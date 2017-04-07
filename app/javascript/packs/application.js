import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './components/routes';


render((
  <Router history={hashHistory}>
    {routes}
  </Router>
), document.getElementById('app-mount'));
