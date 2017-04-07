require 'test_helper'

class ApiAssertionTest < ActiveSupport::TestCase

  def test_create_set_results_with_equal_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":1}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: '1', comparison: 'equals', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal '1', api_assertion.api_value
  end

  def test_create_set_results_with_does_not_equal_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":2}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: '1', comparison: 'does not equal', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal '2', api_assertion.api_value
  end

  def test_create_set_results_with_is_empty_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":[]}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: nil, comparison: 'is empty', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal [], JSON.parse(api_assertion.api_value)
  end

  def test_create_set_results_with_is_not_empty_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":[\"test\"]}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: nil, comparison: 'is not empty', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal ["test"], JSON.parse(api_assertion.api_value)
  end

  def test_create_set_results_with_is_null_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":2}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'ids', value: nil, comparison: 'is NULL', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal nil, api_assertion.api_value
  end

  def test_create_set_results_with_type_error
    api_response = api_responses(:one)
    api_response.response = {"body"=>{id: [{name: 'yes'}]}}.to_json
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id["name"]', value: nil, comparison: 'is NULL', kind: 'Response JSON')

    refute api_assertion.success
    assert_equal "Invalid key", api_assertion.comments
  end

  def test_create_set_results_with_contains_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":19}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: '1', comparison: 'contains', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal '19', api_assertion.api_value
  end

  def test_create_set_results_with_less_than_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":20}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: '100', comparison: 'lesser than', kind: 'Response JSON')

    assert api_assertion.success
    assert_equal '20', api_assertion.api_value
  end

  def test_create_set_results_with_greater_than_with_response
    api_response = api_responses(:one)
    api_response.response = {"body"=>"{\"id\":1}"}
    api_response.save!

    api_assertion = api_response.assertions.create(key: 'id', value: '1', comparison: 'greater than', kind: 'Response JSON')

    refute api_assertion.success
    assert_equal '1', api_assertion.api_value
  end

  def test_create_set_results_with_equal_status
    api_response = api_responses(:one)

    api_assertion = api_response.assertions.create(key: '', value: '200', comparison: 'equals', kind: 'Status Code')

    assert api_assertion.success
    assert_equal '200', api_assertion.api_value
  end

  def test_create_set_results_with_equal_contains
    api_response = api_responses(:one)

    api_assertion = api_response.assertions.create(key: '', value: '2', comparison: 'contains', kind: 'Status Code')

    assert api_assertion.success
    assert_equal '200', api_assertion.api_value
  end
end
