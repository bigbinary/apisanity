import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ApiRequestForm from './apiForm/index';
import EditApiRequest from './apiForm/edit';
import ApiResponse from './api_response/index';
import App from './app';

export default (
  <Route path="/" component={App}>
    <Route path="/api_responses/:token" component={ApiResponse} />
    <Route path="/api_responses/:token/edit" component={EditApiRequest} />
    <IndexRoute component={ApiRequestForm} />
  </Route>
);
