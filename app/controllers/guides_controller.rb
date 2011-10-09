class GuidesController < ApplicationController
  
  before_filter :require_login, :only => ['new', 'create']
  
  def index
  end
  
  def show
    @guide = Guide.find_by_slug(params['id'])
    
    if not @guide
      redirect_to home_path
    end
  end
  
  def new
    @guide = Guide.new
  end
  
  def create
    @guide = Guide.new(params[:guide])
    
    if @guide.save
      respond_to do |format|
        format.json { render :json => @guide.to_json }
      end
    end
  end
 
  private
 
  def require_login
    unless user_signed_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to home_path # halts request cycle
    end
  end
  
end