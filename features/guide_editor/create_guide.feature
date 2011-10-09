
@guide
Feature: Create Guide
  
  In order to share my knowledge about a certain topic or technology
  As a logged in user
  I want to create a new guide

	@omniauth_test
  Scenario: Logged in user navigates to guide editor
  
    Given I am logged in
    And I am on the home page
    When I click on create guide
    Then I should see the guide editor
    
  @omniauth_test @javascript
  Scenario: Logged in user creates guide
    Given I am logged in
    And I am on the create guide page
    When I fill in all mandatory fields
    And click on the save button
    Then I should see my created guide