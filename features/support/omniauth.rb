
Before('@omniauth_test') do
  OmniAuth.config.test_mode = true

  user = Factory(:user)
  
  # the symbol passed to mock_auth is the same as the name of the provider set up in the initializer
  OmniAuth.config.mock_auth[:twitter] = {
      "provider" => user.provider,
      "uid" => user.uid,
      "info" => {
        "name" => user.name,
        "email" => user.email
      }
  }
end

After('@omniauth_test') do
  OmniAuth.config.test_mode = false
end