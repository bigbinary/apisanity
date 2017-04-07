import React from 'react';

export default (props) => (
  <button type="submit" className="btn btn-primary" {...props}>
    <span className="glyphicon glyphicon-send glyphicon-align-left" /> SEND
  </button>
);
