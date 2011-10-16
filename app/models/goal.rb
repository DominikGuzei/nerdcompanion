class Goal
  include Mongoid::Document
  
  field :content, type: String
  
  embedded_in :guide
  
end