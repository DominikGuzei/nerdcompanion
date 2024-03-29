class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  helper_method :user_signed_in?
  helper_method :correct_user?
  helper_method :current_user_is_guide_owner?
  helper_method :is_admin?
  
  private
    def current_user
      begin
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
      rescue Mongoid::Errors::DocumentNotFound
        nil
      end
    end

    def user_signed_in?
      return true if current_user
    end

    def correct_user?
      @user = User.find_by_slug(params[:id])
      unless current_user == @user
        redirect_to home_path, :alert => "Access denied."
      end
    end

    def authenticate_user!
      if !current_user
        redirect_to home_path, :alert => 'You need to sign in for access to this page.'
      end
    end
    
    def current_user_is_guide_owner?(guide)
      (current_user && current_user.is_admin?) || current_user == guide.user
    end
    
    def is_admin?
      current_user && current_user.is_admin?
    end

end
