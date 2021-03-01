const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const session = require('express-session');
const passport = require('passport');

const app = express();
const { db } = require('./db');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
// sync so that our session table gets created
dbStore.sync();

// logging middleware
// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === 'test';
app.use(volleyball.custom({ debug }));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// plug the store into our session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

//We need to initialize passport so that it will consume our req.session object, and attach the user to the request object.
app.use(passport.initialize());
app.use(passport.session());

// after we find or create a user, we 'serialize' our user on the session
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

// If we've serialized the user on our session with an id, we look it up here
// and attach it as 'req.user'.
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', require('./apiRoutes')); // include our routes!

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
