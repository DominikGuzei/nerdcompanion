class GuidesController < ApplicationController
  
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
      redirect_to @guide
    else
      render :action => "new"
    end
  end
  
end