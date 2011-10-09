
Given /^I am logged in and on the create guide page/ do
  Given "I am logged in"
  And "I am on the create guide page"
end

When /^I click on create guide/ do
  click_link 'create-guide'
end

When /^I insert "([^"]*)" as title$/ do |title|
  @guide_title = title
  fill_in 'guide-title', :with => @guide_title
end

When /^click on the save button/ do
  click_button('guide-submit')
end

When /^I create a guide with a description$/ do
  When 'I insert "Guide with description" as title'
  
  @description = "This is the guide description"
  fill_in 'guide-description', :with => @description
end

Then /^I should see my guide with the title as headline$/ do
  find('h2#guide-title').should have_content(@guide_title)
end

Then /^I should see my guide with the description$/ do
  find('#feature p').should have_content(@description)
end