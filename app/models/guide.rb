class Guide
  include Mongoid::Document
  include Mongoid::Slug
  include Mongoid::Timestamps
  
  field :title, :type => String
  slug :title, :as => :permalink
  
  field :description, :type => String
  field :is_draft, :type => Boolean, :default => true
  
  embeds_many :goals
  embeds_many :blocks
  
  belongs_to :user
  
  attr_accessible :title, :description, :blocks, :goals, :is_draft
  validates_presence_of :title, :description
  
  paginates_per 5
  
  def self.published
    Guide.where(:is_draft => false)
  end
end