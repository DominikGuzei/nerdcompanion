require 'rbconfig'
source 'http://rubygems.org'

# rack 1.3.4 causes: already initialized constant WFKV_
# and prevents asset precompilation on heroku
gem 'rack', '1.3.3'
gem 'rails', '3.1.0'
gem 'thin'
gem "heroku"

group :assets do
  gem 'sass-rails', "  ~> 3.1.0"
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

gem 'jquery-rails'

gem "bson_ext"
gem "mongoid"
gem 'mongoid_slug'
gem "omniauth"
gem "frontend-helpers"

group :development do
  gem "thor"
  gem "guard"
  gem "guard-bundler"
  gem "guard-rails"
  gem "guard-livereload"
  gem "guard-rspec"
  gem "guard-cucumber"
  gem "rspec-rails"
end

group :test do
  gem "launchy"
  gem "database_cleaner"
  gem "mongoid-rspec"
  gem "factory_girl_rails"
  gem "cucumber-rails"
  gem "capybara"
  gem "rb-fsevent"
  gem "growl_notify"
end
