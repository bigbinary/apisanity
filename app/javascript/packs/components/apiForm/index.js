import React from 'react';
import uuid from 'uuid';
import update from 'immutability-helper';
import _ from 'lodash';
import { hashHistory } from 'react-router';
import Loader from 'react-loader';
import RequestDataBuildService from '../../services/requestDataBuildService';
import { SelectMethods, SendButton, UrlInput } from './formInputs';
import { Assertions } from './assertions';
import { Authentication } from './auth';
import { Params } from './params';
import { Headers } from './headers';
import { RequestBody } from './requestBody';
import Dropdown from './dropdown';
import { requestTypes } from '../../config';

const addDropdownList = [
  {onClick: "toggleAuth", value: "Basic Authentication"},
  {onClick: "addHeader", value: "Headers"},
  {onClick: "addParam", value: "Parameters"},
  {onClick: "addBody", value: "Request Body"},
  {onClick: "addAssertion", value: "Assertions"},
];

class ApiRequestForm extends React.Component {
  constructor(props) {
    super(props);

    const { url, method, username, password,
      request_body, request_headers, request_params, assertions,
      showRequestBody, showAuthentication, payloadType } = props;
    this.state = {
      url,
      method,
      username,
      password,
      request_body,
      request_params,
      assertions,
      showRequestBody,
      showAuthentication,
      payloadType,
      headers: request_headers,
      errors: {},
      loaded: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState(nextProps);
      this.setState({ showAuthentication: (!!nextProps.username || !!nextProps.password) });
      this.setState({ showRequestBody: !!nextProps.requestBody });
      return true;
    }
  }

  addParam(event) {
    event.preventDefault();
    const showRequestBody = false;
    this.setState({ request_params: this.state.request_params.concat({ id: uuid.v1(), key: '', value: '', type: 'text' }), showRequestBody });
  }

  addBody(event) {
    event.preventDefault();
    const showRequestBody = true;
    this.setState({ request_params: [], showRequestBody });
  }

  addHeader(event) {
    event.preventDefault();
    const headers = this.state.headers.concat({ id: uuid.v1(), key: '', value: '' });
    this.setState({ headers });
  }

  addAssertion(event) {
    event.preventDefault();
    const assertions = this.state.assertions.concat({ id: uuid.v1(), kind: 'Response JSON', key: '', comparison: 'equals', value: '' });
    this.setState({ assertions });
  }

  removeRequestBody(event) {
    event.preventDefault();
    this.setState({ request_body: null, showRequestBody: false });
  }

  removeParam(event, paramId) {
    event.preventDefault();
    this.setState({ request_params: this.state.request_params.filter(element => element.id !== paramId) });
  }

  removeHeader(event, headerId) {
    event.preventDefault();
    const headers = this.state.headers.filter(element => element.id !== headerId);
    this.setState({ headers });
  }

  removeAssertion(event, assertionId) {
    event.preventDefault();
    const assertions = this.state.assertions.filter(element => element.id !== assertionId);
    this.setState({ assertions });
  }

  toggleAuth(event, showAuthentication = true) {
    event.preventDefault();
    if (!showAuthentication) {
      this.setState({ username: '', password: '' });
    }
    this.setState({ showAuthentication });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleMethodChange(event) {
    this.handleChange(event);
    this.urlInput.focus();
  }

  handleTypeChange({ target }, id) {
    const { request_params } = this.state;
    const requestParam = _.find(request_params, element => element.id === id);
    requestParam.value = '';
    requestParam.type = target.value;
    this.updateAndSet(request_params, requestParam, 'request_params');
  }

  handleParamChange(event, id) {
    const requestParams = _.find(this.state.request_params, element => element.id === id);
    if (requestParams.type === 'file') {
      if (event.target.dataset.type === 'value') {
        requestParams[event.target.dataset.type] = event.target.files[0];
      } else {
        requestParams[event.target.dataset.type] = event.target.value;
      }

    } else {
      requestParams[event.target.dataset.type] = event.target.value;
    }

    this.updateAndSet(this.state.request_params, requestParams, 'request_params');
  }

  handleHeaderChange(event, id) {
    const header = _.find(this.state.headers, element => element.id === id);
    header[event.target.dataset.type] = event.target.value;
    this.updateAndSet(this.state.headers, header, 'headers');
  }

  handleAssertionChange(event, id) {
    const assertion = _.find(this.state.assertions, element => element.id === id);
    assertion[event.target.dataset.type] = event.target.value;
    this.updateAndSet(this.state.assertions, assertion, 'assertions');
  }

  handlePayloadTypeChange(event) {
    this.setState({ payloadType: event.target.value });
  }

  updateAndSet(list, element, stateName) {
    const change = {};
    change[stateName] = update(list, { $merge: element });
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    const service = new RequestDataBuildService(this.state);
    service.perform();
    if (service.errors)
      this.setState({ errors: service.errors });
    /*eslint-disable */
    $.ajax({
      url: this.props.formURL,
      context: this,
      dataType: 'json',
      type: 'POST',
      data: service.formData,
      processData: false,
      contentType:false,
      beforeSend: this.setState({loaded: false})
    }).done(data => {
      const token = data.token;
      hashHistory.push(`/api_responses/${token}`);
    }).fail(data => {
      const response = data.responseJSON;
      this.setState({errors: response.errors})
      this.urlInput.focus();
    }).complete(() => {
      this.setState({loaded: true});
    });
    /*eslint-enable */
  }

  render() {
    return (
      <div className="container api-req-form__container">
        <div className="row form-controls text-center">
          <form onSubmit={event => this.handleSubmit(event)} className="bootstrap-center-form api-req-form__form">

            <div className="api-req-form__url-group">
              <SelectMethods name="method" onChange={e => this.handleMethodChange(e)} value={this.state.method} />
              <UrlInput value={this.state.url} name="url" onChange={e => this.handleChange(e)} onComponentRef={i => this.urlInput = i} />
              <Error messages={this.state.errors.url} />
              <Dropdown label="Add">
                {addDropdownList.map(item => <Dropdown.Item onClick={e =>  this[item.onClick](e)}>{item.value}</Dropdown.Item>)}
              </Dropdown>
              <SendButton disabled={!this.state.loaded} />
            </div>

            <Authentication
              showAuthentication={this.state.showAuthentication}
              handleChange={this.handleChange.bind(this)}
              username={this.state.username}
              password={this.state.password}
              removeAuth={event => this.toggleAuth(event, false)}
            />
            <Headers
              headers={this.state.headers}
              addHeader={this.addHeader.bind(this)}
              handleHeaderChange={this.handleHeaderChange.bind(this)}
              removeHeader={this.removeHeader.bind(this)}
            />
            <Assertions
              assertions={this.state.assertions}
              addAssertion={this.addAssertion.bind(this)}
              handleAssertionChange={this.handleAssertionChange.bind(this)}
              removeAssertion={this.removeAssertion.bind(this)}
            />
            {
              !this.state.showRequestBody &&
              <Params params={this.state.request_params}
                      addParam={this.addParam.bind(this)}
                      handleParamChange={this.handleParamChange.bind(this)}
                      handleTypeChange={this.handleTypeChange.bind(this)}
                      removeParam={this.removeParam.bind(this)} />
            }
            <RequestBody
              showRequestBody={this.state.showRequestBody}
              handleChange={this.handleChange.bind(this)}
              handlePayloadTypeChange={this.handlePayloadTypeChange.bind(this)}
              value={this.state.request_body || ''}
              removeRequestBody={this.removeRequestBody.bind(this)}
              payloadType={this.state.payloadType} />
          </form>
          <Error messages={this.state.errors.base} />
        </div>
        {!this.state.loaded && <Loader loaded={this.state.loaded} zIndex={2e9} />}
      </div>
    );
  }
}

const Error = ({ messages }) => {
  if (messages) {
    return <span className="text-danger pull-left">{messages.join()}</span>;
  } else {
    return <span />;
  }
};

ApiRequestForm.defaultProps = {
  formURL: '/api_responses',
  url: '',
  method: requestTypes[0],
  username: '',
  password: '',
  request_body: '',
  request_params: [],
  request_headers: [],
  assertions: [],
  showRequestBody: false,
  showAuthentication: false,
  payloadType: 'Text',
};

export default ApiRequestForm;
