import express from 'express';
import auth from './auth.js';
import users from './users.js';
import tickets from './tickets.js';
import audit from './audit.js';

const router = express.Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/tickets', tickets);
router.use('/audit', audit);

export default router;
