class RequestDataBuildService {

  constructor(state) {
    this.formData = new FormData();
    this.state = state;
  }

  perform() {
    this.appendUrl();
    this.appendAuthInfo();
    this.appendHeaders();
    this.appendRequestParams();
    this.appendAssertions();
  }

  appendAuthInfo () {
    const { showAuthentication, username, password } = this.state;
    if (!showAuthentication) return ;
    this.formData.append('username', username);
    this.formData.append('password', password);
  }

  appendUrl(){
    const { url, method } = this.state;
    this.formData.append('url', url);
    this.formData.append('method', method);
  }

  appendHeaders() {
    this.state.headers.map(({key, value}, index) => {
      this.formData.append(`request_headers[${index}]key`, key);
      this.formData.append(`request_headers[${index}]value`, value);
    });
  }

  appendAssertions() {
    this.state.assertions.map(({key, value, comparison, kind}, index) => {
      this.formData.append(`assertions[${index}]key`, key);
      this.formData.append(`assertions[${index}]value`, value);
      this.formData.append(`assertions[${index}]kind`, kind);
      this.formData.append(`assertions[${index}]comparison`, comparison);
    });
  }

  appendBody() {
    const { request_body, payloadType } = this.state;
    if (payloadType === 'JSON') {
      try {
        this.formData.append('request_body', JSON.stringify(JSON.parse(request_body), null, '\t'));
      } catch (e) {
        this.errors = { base: 'Invalid JSON : \n' + e.message };
      }
    }
  }

  appendRequestParams() {
    if (this.state.showRequestBody) {
      this.appendBody();
    } else {
      this.state.request_params.map(({ key, value, type }, index) => {
        this.formData.append(`request_parameters[${index}]key`, key);
        this.formData.append(`request_parameters[${index}]value`, value);
        this.formData.append(`request_parameters[${index}]type`, type);
      });
    }
  }
}

export default RequestDataBuildService;
