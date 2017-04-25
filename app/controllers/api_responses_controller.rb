class ApiResponsesController < ApplicationController

  before_action :get_api_response, only: :show
  before_action :load_response_for_update, only: :update
  before_action :authenticate_user!, only: [:index, :create, :update]
  before_action :load_api_responses, only: :index
  before_action :filter_by_favourite, if: -> { params[:favourite] == 'true' }
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  def index
    @router_removal_required = true
  end

  def show
    render json: api_response
  end

  def create
    request_service = RequestService.new(params[:url], params[:method], options)
    request_service.process
    if request_service.errors.present?
      render json: request_service, status: 422
    else
      render json: request_service.api_response, status: 200
    end
  end

  def update
    if @api_response.update(permitted_params_for_update)
      render json: { notice: t('.success'), favourite: @api_response.favourite }, status: :ok
    else
      render json: { alert: @api_response.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def get_api_response
    unless @api_response = ApiResponse.find_by({token: params[:id]})
      render json: {error: "Invalid Page"}, status: 404
    end
  end

  def load_response_for_update
    unless @api_response = current_user.api_responses.find_by({token: params[:id]})
      render json: {error: "Invalid Page"}, status: 404
    end
  end

  def api_response
    {
      token: @api_response.token,
      favourite: @api_response.favourite,
      url: @api_response.url,
      httpMethod: @api_response.method,
      requestParams: @api_response.request_params,
      requestHeaders: @api_response.request_headers,
      requestBody: @api_response.request_body,
      username: @api_response.username,
      password: @api_response.password,
      assertions: @api_response.assertions,
      response: {
        response_headers: @api_response.response_headers.sort.to_h,
        response_body: @api_response.response['body'],
        response_code: @api_response.status_code
      }
    }
  end

  def options
    api_request_parser_service = ApiRequestParserService.new(params)
    request_headers = api_request_parser_service.process_headers
    request_parameters = api_request_parser_service.process_parameters
    params.merge(request_params: request_parameters).merge(request_headers: request_headers, user_id: current_user.id).permit!.to_h
  end

  def load_api_responses
    @api_responses = current_user.api_responses.select(:id, :token, :favourite, :url, :method, :created_at).order(created_at: :desc)
  end

  def permitted_params_for_update
    params.require(:api_response).permit(:favourite)
  end

  def filter_by_favourite
    @api_responses = @api_responses.where(favourite: true)
  end
end
