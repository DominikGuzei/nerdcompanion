class GuidesController < ApplicationController
  
  before_filter :require_login, :only => ['new', 'create', 'edit', 'update', 'delete']
  
  def index
    @guides = Guide.order_by(:created_at.desc).page(params['page'] || 1)
  end
  
  def show
    @guide = Guide.find_by_permalink(params['id'])
    
    if not @guide
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
    @guide = Guide.find_by_permalink(params['id'])
    
    if not @guide
      redirect_to home_path
    end
  end
  
  def update
    @guide = Guide.find_by_permalink(params['id'])
    
    if not @guide
      redirect_to home_path
    end
    
    if @guide.update_attributes(params[:guide])
      respond_to do |format|
        format.json { render :json => @guide.to_json }
      end
    end
    
  end
 
  def destroy
    @guide = Guide.find_by_permalink(params['id'])
    
    if @guide
      @guide.destroy
    end
    
    redirect_to user_path( current_user )
  end
 
  private
 
  def require_login
    unless user_signed_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to home_path # halts request cycle
    end
  end
  
end