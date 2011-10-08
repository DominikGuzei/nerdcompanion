require 'spec_helper'

describe Guide do
  
  it { should validate_presence_of(:title) }
  
end