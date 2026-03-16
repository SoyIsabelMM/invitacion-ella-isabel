import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDb } from './db.js';
import rsvpRouter from './routes/rsvp.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';

app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

const rsvpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Demasiadas solicitudes. Intenta más tarde.' },
});
app.use('/api/rsvp', rsvpLimiter);
app.use('/api/rsvp', rsvpRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`RSVP API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
