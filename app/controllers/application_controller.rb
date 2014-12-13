class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :get_nav

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "creekstone" && password == "Cr33kst0n3!"
    end
  end

  def get_nav
    @pages_nav = Page.all.order('order asc')
  end

end
