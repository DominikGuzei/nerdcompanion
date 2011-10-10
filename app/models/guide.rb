class Guide
  include Mongoid::Document
  include Mongoid::Slug
  include Mongoid::Timestamps
  
  field :title, :type => String
  slug :title, :as => :permalink
  
  field :description, :type => String
  
  embeds_many :blocks
  belongs_to :user
  
  attr_accessible :title, :description, :blocks
  validates_presence_of :title, :description
end