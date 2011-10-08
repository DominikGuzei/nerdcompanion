
When /^I click on create guide/ do
  click_link 'create-guide'
end

When /^give the guide a title before I save it$/ do
  @guide_title = "Test Guide"
  fill_in 'guide-title', :with => @guide_title
  click_button('guide-submit')
end

Then /^I should be on the created guide page$/ do
  find('#guide-title').should have_content(@guide_title)
end