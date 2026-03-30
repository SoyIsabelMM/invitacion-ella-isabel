import { Router, Request } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';
import { validateRsvpBody, type RsvpBody } from '../middleware/validate.js';

const router = Router();
const COLLECTION = 'rsvps';

router.post('/', validateRsvpBody, async (req: Request<object, object, RsvpBody>, res) => {
  try {
    const { guestName, guardianEmail, guardianPhone, status } = req.body;
    const db = getDb();
    const existing = await db.collection(COLLECTION).findOne({ guestName, guardianEmail });
    if (existing) {
      res.status(409).json({ error: 'Ya existe una confirmación con este nombre y correo. Si ya enviaste tu RSVP, no es necesario volver a confirmar.' });
      return;
    }
    const result = await db.collection(COLLECTION).insertOne({
      guestName,
      guardianEmail,
      guardianPhone,
      status,
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
