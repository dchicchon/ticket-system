import express from 'express';
import { User } from '../data-models.js';
import { createEvent } from '../utils.js';

const router = express.Router();

const getUser = async (id) => {
  const userData = await User.findOne({ where: { id } });
  if (!userData) {
    throw new Error('User not found');
  }
  return userData.toJSON();
};

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  delete user.password;
  res.json(user);
});

router.post('/', async (req, res) => {
  const { username, role } = req.body;
  if (!username) {
    return res.status(400).json({
      message: 'Username cannot be empty',
    });
  }

  const tempPassword = 'test';

  const user = await User.create({
    username,
    password: tempPassword,
    role,
  });

  createEvent(req.session.user.username, 'User Created');
  res.json({
    message: 'Successfully Created User',
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await getUser(id);
  if (user.role === 'admin') {
    return new Error('Cannot delete admin');
  }
  const result = await User.destroy({
    where: {
      id,
    },
  });
  res.json({
    message: 'User Deleted',
    result,
  });
});

export default router;
