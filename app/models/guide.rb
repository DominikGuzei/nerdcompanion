class Guide
  include Mongoid::Document
  include Mongoid::Slug
  
  field :title, :type => String
  slug :title
  
  field :description, :type => String
  
  embeds_many :blocks
  
  attr_accessible :title, :description, :blocks
  validates_presence_of :title, :description
end