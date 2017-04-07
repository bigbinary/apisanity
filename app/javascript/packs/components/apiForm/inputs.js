import React from 'react';

export const KeyInput = (props) => {
  return (
    <input
      type="text"
      className="input form-control api-req-form__input"
      placeholder="Enter Name"
      data-type="key"
      {...props}
    />
  );
};

export const ValueInput = ({ value, ...props }) => {
  if (props.type === 'file') {
    return <FileInput {...props} />;
  } else {
    return <TextInput {...props} value={value} />;
  }
};

const TextInput = (props) => {
  return (
    <input
      {...props}
      className="input form-control api-req-form__input"
      placeholder="Enter Value"
      data-type="value"
    />
  );
};

const FileInput = (props) => {
  return (
    <input
      {...props}
      className="input form-control api-req-form__input"
      placeholder="Enter Value"
      data-type="value"
    />
  );
};

export const TypeInput = (props) => {
  return (
    <select
      {...props}
      className="input form-control api-req-form__input"
    >
      <option value="text">Text</option>
      <option value="file">File</option>
    </select>
  );
};
