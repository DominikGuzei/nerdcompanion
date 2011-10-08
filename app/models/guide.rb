class Guide
  include Mongoid::Document
  include Mongoid::Slug
  
  field :title, :type => String
  slug :title
  
  attr_accessible :title
  validates_presence_of :title
end