
Given /^I drag the paragraph tool icon from the toolbox$/ do
  @dragged_item = page.find('#guide-toolbox-list li.paragraph')
end

When /^I drop it onto the guide area$/ do
  drop_area = page.find('#guide-content-list')
  @dragged_item.drag_to(drop_area);
end

Then /^I should see an empty rich text editor appear$/ do
  page.should have_selector('#guide-content-list li.paragraph .cleditorMain')
end