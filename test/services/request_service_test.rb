require 'test_helper'

class RequestServiceTest < ActiveSupport::TestCase

  def test_calls_rest_client_execute
    service = RequestService.new(url, 'get', {username: "username", password: "password", request_params: {}, request_headers: {}})
    response = mock('Excon::Response')
    response.expects(:body).returns('Response')
    response.expects(:headers).returns({})
    response.expects(:status).returns(200)
    Excon::Connection.any_instance.stubs(:request).with(method: 'get', verify_ssl: false, user: "username", password: "password", :headers => {}, :body => URI.encode_www_form({})).returns(response)
    service.process

    api_response = ApiResponse.last
    assert_equal '200', api_response.status_code
    assert_equal({"body"=>"Response"}, api_response.response)
    assert_equal({}, api_response.response_headers)
  end

  def test_calls_rest_client_execute_with_assertions
    service = RequestService.new(url, 'get', {username: "username", password: "password", request_params: {}, request_headers: {}, assertions: api_assertions})
    response = mock('Excon::Response')
    response.expects(:body).returns('Response')
    response.expects(:headers).returns({})
    response.expects(:status).returns(200)
    Excon::Connection.any_instance.stubs(:request).with(method: 'get', verify_ssl: false, user: "username", password: "password", :headers => {}, :body => URI.encode_www_form({})).returns(response)
    service.process

    api_response = ApiResponse.last
    api_assertion = api_response.assertions.first

    assert_equal 'id', api_assertion.key
    assert_equal 'some_value', api_assertion.value
  end

  def test_calls_rest_client_execute_with_post_and_request_params
    request_params = {"post[title]" => "My new post", "post[user_id]" => "18"}
    service = RequestService.new(url, 'post', {username: "username", password: "password", request_params: request_params, request_headers: {}})
    response = mock('Excon::Response')
    response.expects(:body).returns('Response')
    response.expects(:headers).returns({})
    response.expects(:status).returns(200)
    Excon::Connection.any_instance.stubs(:request).with(method: 'post', verify_ssl: false, user: "username", password: "password", :headers => {}, :body => URI.encode_www_form(request_params)).returns(response)
    service.process

    api_response = ApiResponse.last
    assert_equal '200', api_response.status_code
    assert_equal({"body"=>"Response"}, api_response.response)
    assert_equal(request_params, api_response.request_params)
  end

  def test_calls_rest_client_execute_with_post_and_request_body
    request_params = {"post": {"title": "My new title"}}
    service = RequestService.new(url, 'post', {username: "username", password: "password", request_params: request_params, request_headers: {"Content_Type" => "application/json"}})
    response = mock('Excon::Response')
    response.expects(:body).returns('Response')
    response.expects(:headers).returns({})
    response.expects(:status).returns(200)
    Excon::Connection.any_instance.stubs(:request).with(method: 'post', verify_ssl: false, user: "username", password: "password", :headers => {"Content_Type" => "application/json"}, :body => URI.encode_www_form(request_params)).returns(response)
    service.process

    api_response = ApiResponse.last
    assert_equal '200', api_response.status_code
    assert_equal({"body"=>"Response"}, api_response.response)
    assert_equal({"Content_Type" => "application/json"}, api_response.request_headers)
    assert_equal({"post"=>"{:title=>\"My new title\"}"}, api_response.request_params)
  end

  def test_calls_rest_client_execute_with_put_and_request_params
    request_params = {"post[title]" => "My updated post", "post[user_id]" => "18"}
    service = RequestService.new(url, 'put', {username: "username", password: "password", request_params: request_params, request_headers: {"Content_Type" => "application/json"}})
    response = mock('Excon::Response')
    response.expects(:body).returns('Response')
    response.expects(:headers).returns({})
    response.expects(:status).returns(200)
    Excon::Connection.any_instance.stubs(:request).with(method: 'put', verify_ssl: false, user: "username", password: "password", :headers => {"Content_Type" => "application/json"}, :body => URI.encode_www_form(request_params)).returns(response)
    service.process

    api_response = ApiResponse.last
    assert_equal '200', api_response.status_code
    assert_equal({"body"=>"Response"}, api_response.response)
    assert_equal({"Content_Type" => "application/json"}, api_response.request_headers)
    assert_equal(request_params, api_response.request_params)
  end

  def test_calls_rest_client_response_not_success
    request_params = {"post[title]" => "My updated post", "post[user_id]" => "18"}
    service = RequestService.new(url, 'put', {username: "username", password: "password", request_params: request_params, request_headers: {"Content_Type" => "application/json"}})
    response = mock('Excon::Response')
    response.expects(:body).returns('Response')
    response.expects(:headers).returns({})
    response.expects(:status).returns(400)
    Excon::Connection.any_instance.stubs(:request).with(method: 'put', verify_ssl: false, user: "username", password: "password", :headers => {"Content_Type" => "application/json"}, :body => URI.encode_www_form(request_params)).returns(response)
    service.process

    api_response = ApiResponse.last
    assert_equal '400', api_response.status_code
    assert_equal({"body"=>"Response"}, api_response.response)
  end

  private

  def api_assertions
    { "0" => {key: "id", value: 'some_value', comparison: 'equal', kind: 'responseJSON'} }
  end

  def url
    "http://www.example.com"
  end
end
