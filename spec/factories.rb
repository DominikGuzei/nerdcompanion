
require 'factory_girl'

# FACTORIES

Factory.define :user do |u|
  u.name {Factory.next(:user_name)}
  u.email {Factory.next(:email)}
  u.uid {Factory.next(:user_uid)}
  u.provider :twitter
end

# SEQUENCES

Factory.sequence :email do |n|
  "person#{n}@example.com" 
end

Factory.sequence :user_name do |n|
  "user#{n}" 
end

Factory.sequence :user_uid do |n|
  n
end