import express from 'express';
import { Event } from '../data-models.js';

const router = express.Router();

router.get('/', async (req, res) => {
  // we should use the userid to find all relative
  // users to the event
  const events = await Event.findAll();
  res.json({ list: events, count: events.length });
});
export default router;
