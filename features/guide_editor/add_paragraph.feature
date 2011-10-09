@omniauth_test
Feature: Add paragraphs

  In order to write about my topic and emphasize certain things
  As a guide writer
  I want to add a paragraph of rich text
  
  Background:
    Given I am logged in
    And am on the create guide page
  
  @javascript  
  Scenario: Drop paragraph block on empty guide
  
    Given I drag the paragraph tool icon from the toolbox
    When I drop it onto the guide area
    Then I should see an empty rich text editor appear