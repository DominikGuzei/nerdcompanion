require 'rbconfig'
source 'http://rubygems.org'

gem 'rails', '3.1.0'
gem 'thin'
gem "heroku"

group :assets do
  gem 'sass-rails', "  ~> 3.1.0"
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

gem 'jquery-rails'

gem "bson_ext", ">= 1.3.1"
gem "mongoid", ">= 2.2.0"
gem "omniauth", ">= 0.3.0.rc3"
gem "frontend-helpers"

group :development, :test do
  gem "launchy", ">= 2.0.5", :group => :test
  gem "guard", ">= 0.6.2", :group => :development
  gem "guard-bundler", ">= 0.1.3", :group => :development
  gem "guard-rails", ">= 0.0.3", :group => :development
  gem "guard-livereload", ">= 0.3.0", :group => :development
  gem "guard-rspec", ">= 0.4.3", :group => :development
  gem "guard-cucumber", ">= 0.6.1", :group => :development
end

group :test do
  gem "rspec-rails", ">= 2.6.1", :group => [:development, :test]
  gem "database_cleaner", ">= 0.6.7", :group => :test
  gem "mongoid-rspec", ">= 1.4.4", :group => :test
  gem "factory_girl_rails", ">= 1.2.0", :group => :test
  gem "cucumber-rails", ">= 1.0.2", :group => :test
  gem "capybara", ">= 1.1.1", :group => :test
end
