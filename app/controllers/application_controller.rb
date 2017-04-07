class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_layout_carrier

  force_ssl if: :ssl_configured?

  private

  def ensure_current_user_is_superadmin!
    authenticate_user!

    unless current_user.super_admin?
      redirect_to root_path, status: :forbidden, alert: "Unauthorized Access!"
    end
  end

  def ssl_configured?
    !(Rails.env.development? || Rails.env.test?)
  end

  def set_layout_carrier
    @layout_carrier = LayoutCarrier.new
  end
end
