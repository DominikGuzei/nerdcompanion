
When /^I click on create guide/ do
  click_link 'create-guide'
end

When /^I insert "([^"]*)" as title$/ do |title|
  @guide_title = title
  fill_in 'guide-title', :with => @guide_title
end

When /^I insert "([^"]*)" as description/ do |description|
  @guide_description = description
  fill_in 'guide-description', :with => @guide_description
end

When /^click on the save button/ do
  click_button('guide-submit')
end

When /^I fill in all mandatory fields$/ do
  When 'I insert "Guide with description" as title'
  When 'I insert "The guide description" as description'
end

Then /I should see the guide editor/ do
  page.should have_selector('#guide-submit')
end

Then /^I should see my created guide$/ do
  find('h2#guide-title').should have_content(@guide_title)
  find('#feature p').should have_content(@guide_description)
end