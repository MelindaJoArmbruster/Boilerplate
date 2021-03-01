const router = require('express').Router();
const { User } = require('../db');
module.exports = router;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

// This is the route that users hit when they click Sign In With Google
router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/', //what to put here????
    failureRedirect: '/login', //what to put here????
  })
);

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(
  googleConfig,
  function (token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOne({ where: { googleId: googleId } })
      .then(function (user) {
        if (!user) {
          return User.create({ name, email, googleId }).then(function (user) {
            done(null, user);
          });
        } else {
          done(null, user);
        }
      })
      .catch(done);
  }
);

// register our strategy with passport
passport.use(strategy);
