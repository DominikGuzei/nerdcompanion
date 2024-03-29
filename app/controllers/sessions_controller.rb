class SessionsController < ApplicationController

  def new
    redirect_to '/auth/twitter'
  end

  def create
    auth = request.env["omniauth.auth"]
    user = User.where(:provider => auth['provider'], 
                      :uid => auth['uid']).first || User.create_with_omniauth(auth)
    session[:user_id] = user.id
    redirect_to home_path, :notice => 'Signed in!'
  end

  def destroy
    session[:user_id] = nil
    redirect_to home_path, :notice => 'Signed out!'
  end

  def failure
    redirect_to home_path, :alert => "Authentication error: #{params[:message].humanize}"
  end

end
