
Feature: Create Guide
  
  In order to share my knowledge about a certain topic or technology
  As a logged-in user
  I want to create a new guide

	@omniauth_test
  Scenario: Logged in user creates guide
  
    Given I am logged in and on the create guide page
    When I insert "My First Guide" as title
    And click on the save button
    Then I should see my guide with the title as headline