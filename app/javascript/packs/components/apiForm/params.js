import React from 'react';
import { KeyInput, ValueInput, TypeInput } from './inputs';
import CloseMark from '../closeMark';

export const AddParamLink = ({ addParam }) => {
  return <a href="" onClick={event => addParam(event)} className="devise-links"> Add Parameter </a>;
};

export const Params = ({ params, addParam, handleParamChange, removeParam, handleTypeChange }) => {
  if (!params || !params.length) {
    return <span />;
  }
  return (
    <div className="form-group">
      <div className="form-group__label">
        Request Params
        <AddParamLink addParam={addParam} />
      </div>
      {
        params.map((param) => {
          return (
            <RequestParameterInput key={param.id}
                                   removeParam={event => removeParam(event, param.id)}
                                   handleParamChange={event => handleParamChange(event, param.id)}
                                   handleTypeChange={event => handleTypeChange(event, param.id)}
                                   param={param} />
          );
        })
      }
    </div>
  );
};

const RequestParameterInput = ({ removeParam, handleParamChange, handleTypeChange, param }) => {
  return (
    <div className="api-req-form__form-inline form-inline">
      <KeyInput name="request_parameters[][key]" onChange={handleParamChange} value={param.key} />
      <ValueInput name="request_parameters[][value]" onChange={handleParamChange} value={param.value} type={param.type} />
      <TypeInput name="request_parameters[][type]" onChange={handleTypeChange} value={param.type} />
      <CloseMark onClick={removeParam} />
    </div>
  );
};
