const passport = require('passport');
const { Strategy: GithubStrategy } = require('passport-github');
const { GITHUB_CONFIG } = require('../config');

module.exports = () => {
  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) =>
    cb(null, profile);

  // Adding each OAuth provider's strategy to passport

  passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
};
