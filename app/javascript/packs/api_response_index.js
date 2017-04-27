import React from 'react';
import { render } from 'react-dom';
import List from './components/api_response/list'

const headers = ['Favourite', 'HTTP Method', 'Url', 'Hit Time', '']

render(
  <List apiResponses={JSON.parse(document.getElementById('elements').value)} headers={headers} />,
  document.getElementById('response-list')
)
