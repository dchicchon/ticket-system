import express from 'express';
import cors from 'cors';
import session from 'express-session';

import { sequelize, seed } from './data-models.js';
import { auditMiddleware } from './middleware/audit-middleware.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import router from './routes/index.js';

// TODO: Each API endpoint will have their own versions?
const API_VERSION = 1;
const app = express();
const PORT = 4000;

async function start() {
  sequelize.sync();
  await seed();

  app.use(
    session({
      secret: 'tacocat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        samesite: 'lax',
      },
    })
  );

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(authMiddleware);
  // app.use(auditMiddleware);
  app.use(`/api/v${API_VERSION}`, router);

  app.get('/', (req, res) => {
    res.json('Root route');
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();
