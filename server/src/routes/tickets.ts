import express from 'express';
import { Ticket } from '../data-models.js';
import { createEvent } from '../utils.js';

const router = express.Router();

const getTicket = async (id) => {
  const ticketData = await Ticket.findOne({
    where: {
      id,
    },
  });
  if (!ticketData) {
    throw new Error('Ticket not found');
  }
  const ticket = ticketData.toJSON();
};
router.get('/', async (req, res) => {
  const tickets = await Ticket.findAll();
  res.json({ list: tickets });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Ticket.findOne({
    where: {
      id,
    },
  });
  res.json(result);
});

router.post('/', async (req, res) => {
  const user = req.session.user;
  try {
    const result = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      status: 'todo',
      createdBy: user.username,
    });
    createEvent(user.username, 'Ticket created');
    return res.status(200).send({ message: 'Ticket created' });
  } catch (err) {
    return res.status(400).send({ message: 'Unable to create ticket' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Ticket.update(
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return res.json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Ticket.destroy({
    where: {
      id: id,
    },
  });
  return res.json(result);
});

export default router;
