class Block
  include Mongoid::Document
  
  field :type, type: String
  field :content, type: String
  embedded_in :guide
  
end