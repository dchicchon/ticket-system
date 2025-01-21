import { Event } from './data-models.js';

export const createEvent = async (user: string, description: string) => {
  const newEvent = {
    user: user || 'unknown',
    description,
    timestamp: new Date(),
  };
  const result = await Event.create(newEvent);
};
