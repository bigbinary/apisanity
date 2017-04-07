import React from 'react';

export default ({onComponentRef, ...props}) => (
  <div className="api-req-form__url-control">
    <input type="text" className="input form-control" ref={onComponentRef} {...props} />
  </div>
);
