import React from 'react';
import { render } from 'react-dom';
import List from './components/api_response/list'

render(
  <List elements={JSON.parse(document.getElementById('elements').value)} />,
  document.getElementById('response-list')
)
