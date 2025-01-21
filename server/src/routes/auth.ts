import express from 'express';
import { User } from '../data-models.js';
import { createEvent } from '../utils.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const userData = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!userData) {
    return res.status(401).send({
      message: 'Login failed',
    });
  }
  const user = userData.toJSON();
  if (user.password !== password) {
    return res.status(401).send({
      message: 'Login failed',
    });
  }
  req.session.regenerate((err) => {
    if (err) {
      next(err);
    }
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      createEvent(user.username, 'Login');
      res.json({
        token: req.sessionID,
      });
    });
  });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const newUser = await User.create({
    username,
    password,
  });
  res.json(newUser);
});

router.get('/currentuser', async (req, res) => {
  res.json({ user: req.session.user });
});

router.get('/logout', (req, res, next) => {
  req.session.user = null;
  req.session.save((err) => {
    if (err) next(err);
    req.session.regenerate((err) => {
      if (err) next(err);
    });
  });
  res.json({
    message: 'User has logged out',
  });
});

export default router;
