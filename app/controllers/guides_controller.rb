class GuidesController < ApplicationController
  
  before_filter :require_login, :only => ['create', 'edit', 'update', 'destroy']
  before_filter :ensure_guide_exists, :only => ['show', 'edit', 'update', 'destroy']
  before_filter :authorise_as_owner, :only =>['edit', 'update', 'destroy']
  
  def index
    @guides = Guide.published.order_by(:created_at.desc).page(params['page'] || 1)
  end
  
  def show
    if @guide.is_draft && !current_user_is_guide_owner?(@guide)
      redirect_to home_path
    end
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
    # once guide was published keep it published
    unless @guide.is_draft
      params[:guide][:is_draft] = false
    end
    
    if @guide.update_attributes(params[:guide])
      respond_to do |format|
        format.json { render :json => @guide.to_json }
      end
    end
  end
 
  def destroy
    @guide.destroy
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