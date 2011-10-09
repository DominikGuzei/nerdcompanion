
Given /^I drag the paragraph tool icon from the toolbox$/ do
  @dragged_item = find('#guide-toolbox-list .paragraph')
end

When /^I drop it onto the guide area$/ do
  drop_area = find('#guide-content-list')
end

Then /^I should see an empty rich text editor appear$/ do
  page.should have_selector('#guide-content-list textarea.rich-text-editor')
end