import React from 'react';
import CloseMark from '../closeMark';

export const Authentication = ({ showAuthentication, handleChange, username, password, removeAuth }) => {
  if (showAuthentication) {
    return (
      <div className="form-group">
        <div className="form-group__label">
          Basic Authentication
        </div>
        <div className="api-req-form__form-inline form-inline">
          <input type="text" value={username} className="api-req-form__input input form-control" name="username" placeholder="Enter username" onChange={handleChange} />
          <input type="text" value={password} className="api-req-form__input input form-control" name="password" placeholder="Enter password" onChange={handleChange} />
          <CloseMark onClick={event => removeAuth(event, false)} />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};
