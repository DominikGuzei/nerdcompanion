
Given /^(?:|I )am on the (.+) page$/ do |page_name|
  visit path_to(page_name)
end