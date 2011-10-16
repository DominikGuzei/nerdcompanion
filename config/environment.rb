# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
NerdCompanion::Application.initialize!

Time::DATE_FORMATS[:list] = "%A, %B %d, %Y"