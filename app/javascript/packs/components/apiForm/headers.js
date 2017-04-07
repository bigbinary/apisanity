import React from 'react';
import { KeyInput, ValueInput } from './inputs';
import CloseMark from '../closeMark';

export const AddHeaderLink = ({ addHeader }) => {
  return <a href="" onClick={event => addHeader(event)} className="devise-links"> Add Header </a>;
};

export const Headers = ({ headers, addHeader, handleHeaderChange, removeHeader }) => {
  if (!headers || !headers.length) {
    return <span />;
  }
  return (
    <div className="form-group">
      <div className="form-group__label">
        Headers
        <AddHeaderLink addHeader={addHeader} />
      </div>
      {
        headers.map((header) => {
          return <RequestHeaderInput key={header.id} removeHeader={event => removeHeader(event, header.id)} handleHeaderChange={event => handleHeaderChange(event, header.id)} header={header} />;
        })
      }
    </div>
  );
};

const RequestHeaderInput = ({ removeHeader, handleHeaderChange, header }) => {
  return (
    <div className="api-req-form__form-inline form-inline">
      <KeyInput name="request_headers[][key]" onChange={handleHeaderChange} value={header.key} />
      <ValueInput name="request_headers[][value]" onChange={handleHeaderChange} value={header.value} />
      <CloseMark onClick={removeHeader} />
    </div>
  );
};

