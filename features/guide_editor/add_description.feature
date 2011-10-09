
@omniauth_test
Feature: Add description to guide
  
  In order to provide the reader with a two short summary of the guide
  As a guide writer
  I want to add a description to my guide
  
  Scenario: Guide writer creates new guide with description
    
		Given I am logged in and on the create guide page
    When I create a guide with a description
    Then I should see my guide with the description
  
  
