const router = require('express').Router();
const { User } = require('../db');
module.exports = router;

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use('/google', require('./oauth'));

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      req.login(user, (err) => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) res.status(401).send('User not found');
      else if (!user.hasMatchingPassword(req.body.password))
        res.status(401).send('Incorrect password');
      else {
        req.login(user, (err) => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});
