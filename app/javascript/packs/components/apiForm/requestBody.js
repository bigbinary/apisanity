import React from 'react';

export const RequestBody = ({ showRequestBody, handleChange, handlePayloadTypeChange, value, removeRequestBody, payloadType }) => {
  if (!showRequestBody) { return <div />; }
  return (
    <div className="form-input">
      <div className="form-group__label">
        Request Body
        <select className="api-req-form__request-body" value={payloadType} onChange={event => handlePayloadTypeChange(event)}>
          <option>Text</option>
          <option>JSON</option>
        </select>
        <a href="" className="devise-links" onClick={event => removeRequestBody(event)}>Remove Request Body</a>
      </div>
      <textarea name="request_body" placeholder="Enter Request Body" rows="8" cols="8" className="form-control api-req-form__textarea" onChange={event => handleChange(event)} value={value} />
    </div>
  );
};
