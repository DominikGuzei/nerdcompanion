class Guide
  include Mongoid::Document
  include Mongoid::Slug
  
  field :title, :type => String
  slug :title
  
  field :description, :type => String
  
  attr_accessible :title, :description
  validates_presence_of :title, :description
end