import React from 'react';
import { KeyInput, ValueInput } from './inputs';
import { assertionComparisonOptions, disabledAssertionValueOptions, disabledAssertionKeyOptions } from '../constants';
import CloseMark from '../closeMark';

export const AddAssertionLink = ({ addAssertion }) => {
  return <a href="" onClick={event => addAssertion(event)} className="devise-links"> Add Assertion </a>;
};

export const Assertions = ({ assertions, addAssertion, handleAssertionChange, removeAssertion }) => {
  if (!assertions || !assertions.length) {
    return <span />;
  }
  return (
    <div className="form-group">
      <div className="form-group__label">
        Assertions
        <AddAssertionLink addAssertion={addAssertion} />
      </div>
      {
        assertions.map((assertion) => {
          return <RequestAssertionInput key={assertion.id} removeAssertion={event => removeAssertion(event, assertion.id)} handleAssertionChange={event => handleAssertionChange(event, assertion.id)} assertion={assertion} />;
        })
      }
    </div>
  );
};

const RequestAssertionInput = ({ removeAssertion, handleAssertionChange, assertion }) => {
  const shouldNotAllowAssertionKey = disabledAssertionKeyOptions.includes(assertion.kind);
  const shouldNotAllowAssertionValue = disabledAssertionValueOptions.includes(assertion.comparison);
  return (
    <div className="api-req-form__form-inline form-inline">
      <AssertionKindInput inputKeyName="request_assertions[][kind]" handleKindChange={handleAssertionChange} value={assertion.kind} />
      <KeyInput name="request_assertions[][key]" onChange={handleAssertionChange} value={shouldNotAllowAssertionKey ? '--' : assertion.key} disabled={shouldNotAllowAssertionKey} />
      <AssertionComparisonInput name="request_assertions[][comparison]" handleComparisonChange={handleAssertionChange} value={assertion.comparison} assertionKind={assertion.kind} />
      <ValueInput name="request_assertions[][value]" onChange={handleAssertionChange} value={shouldNotAllowAssertionValue ? '--' : assertion.value} disabled={shouldNotAllowAssertionValue} />
      <CloseMark onClick={removeAssertion} />
    </div>
  );
};

const AssertionKindInput = ({ inputKindName, handleKindChange, value }) => {
  return (
    <select name={inputKindName} className="api-req-form__assertion-select form-control required" value={value} onChange={handleKindChange} data-type="kind">
      <option>Response JSON</option>
      <option>Status Code</option>
    </select>
  );
};

const AssertionComparisonInput = ({ inputComparisonName, handleComparisonChange, value, assertionKind }) => {
  const options = assertionComparisonOptions[assertionKind].map((optionValue, index) => {
    return <option key={index}>{optionValue}</option>;
  });
  return (
    <select name={inputComparisonName} className="api-req-form__assertion-select form-control required" value={value} onChange={handleComparisonChange} data-type="comparison">
      {options}
    </select>
  );
};
