
Feature: Create Guide
  
  In order to share my knowledge about a certain topic or technology
  As a logged-in user
  I want to create a new guide

	Background:
		Given I am on the home page

	@omniauth_test
  Scenario: Logged in user creates guide
    Given I am logged in
    When I click on create guide
    And give the guide a title before I save it
    Then I should be on the created guide page