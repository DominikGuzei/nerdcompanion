class GuidesController < ApplicationController
  
  before_filter :require_login, :only => ['new', 'create', 'edit', 'update', 'delete']
  before_filter :ensure_guide_exists, :only => ['show', 'edit', 'update', 'delete']
  before_filter :authorise_as_owner, :only =>['edit', 'update', 'delete']
  
  def index
    @guides = Guide.order_by(:created_at.desc).page(params['page'] || 1)
  end
  
  def show
  end
  
  def new
    @guide = Guide.new
  end
  
  def create
    @guide = Guide.new(params[:guide])
    @guide.user = current_user
    
    if @guide.save
      respond_to do |format|
        format.json { render :json => @guide.to_json }
      end
    end
  end
 
  def edit
  end
  
  def update    
    if @guide.update_attributes(params[:guide])
      respond_to do |format|
        format.json { render :json => @guide.to_json }
      end
    end
  end
 
  def destroy
    redirect_to user_path( current_user )
  end
 
  private
 
  def require_login
    unless user_signed_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to home_path # halts request cycle
    end
  end
  
  def ensure_guide_exists
    @guide = Guide.find_by_permalink(params['id'])
    
    if not @guide
      redirect_to home_path
    end
  end
  
  def authorise_as_owner
    unless (current_user && current_user.is_admin?) || current_user == @guide.user
      redirect_to home_path
    end
  end
  
end