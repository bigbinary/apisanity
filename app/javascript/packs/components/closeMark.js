import React from 'react';

export default (props) => (
  <button type="button" className="btn btn-default btn-sm" {...props}>
    <span className="glyphicon glyphicon-remove-circle"></span> remove
  </button>
);
