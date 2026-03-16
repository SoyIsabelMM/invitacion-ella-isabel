import { Router, Request } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';
import { validateRsvpBody, type RsvpBody } from '../middleware/validate.js';

const router = Router();
const COLLECTION = 'rsvps';

router.post('/', validateRsvpBody, async (req: Request<object, object, RsvpBody>, res) => {
  try {
    const { guestName, guardianEmail } = req.body;
    const db = getDb();
    const result = await db.collection(COLLECTION).insertOne({
      guestName,
      guardianEmail,
      createdAt: new Date(),
    });

    const id = (result.insertedId as ObjectId).toString();
    res.status(201).json({ id, message: 'RSVP registrado correctamente' });
  } catch (err) {
    console.error('RSVP insert error:', err);
    res.status(500).json({ error: 'Error al guardar la confirmación' });
  }
});

export default router;
