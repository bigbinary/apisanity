import React from 'react';

const Item = (props) => (
  <li>
    <a href="#" className="devise-links" onClick={props.onClick}>{props.children}</a>
  </li>
);

const dropdown = (props) => (
  <div className="api-req-form__btn-group btn-group">
    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span className="api-req-form__more-text">{props.label}</span>
      <span className="caret" />
      <span className="sr-only">Toggle Dropdown</span>
    </button>
    <ul className="dropdown-menu">
      {props.children}
    </ul>
  </div>
);

dropdown.Item = Item;

export default dropdown;
