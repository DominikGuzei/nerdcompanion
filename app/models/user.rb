class User
  include Mongoid::Document
  include Mongoid::Slug
  include Mongoid::Timestamps
  
  field :provider, :type => String
  field :uid, :type => String
  field :name, :type => String
  field :is_admin?, :type => Boolean, :default => false
  
  slug :name, :as => :slug, :index => true
  has_many :guides
  
  attr_accessible :provider, :uid, :name

  def self.create_with_omniauth(auth)
    
    params = { 
      :provider => auth['provider'],
      :uid => auth['uid'],
      :name => auth['user_info']['name']
    }

    User.create(params)

  end
  
  def published_guides
    guides.where( :is_draft => false )
  end

  def draft_guides
    guides.where( :is_draft => true )
  end
  
end

