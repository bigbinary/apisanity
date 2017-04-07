import React from 'react';
import { requestTypes } from '../../../config';

export default (props) => (
  <div>
    <select className="form-control required" {...props}>
      {requestTypes.map(requestType => <option value={requestType}>{requestType}</option>)}
    </select>
  </div>
);
