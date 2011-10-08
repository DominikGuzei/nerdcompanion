
Feature: Create Guide
  In order to share my knowledge about a certain topic or technology
  As a logged-in user
  I want to create a new guide

  Scenario: Logged in user creates guide
    Given I am logged in
    When I click the create guide button
    Then the guide editor appears
    And the title field is focused
  