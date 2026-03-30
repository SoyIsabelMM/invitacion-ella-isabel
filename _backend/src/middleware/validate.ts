import { Request, Response, NextFunction } from 'express';

const GUEST_NAME_MAX = 200;
const EMAIL_MAX = 254;
const PHONE_MAX = 30;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits and common phone formatting (confirmed RSVPs). */
const PHONE_CONFIRMED_REGEX = /^[\d\s\-+().]+$/;

export type RsvpStatus = 'confirmed' | 'declined';

export interface RsvpBody {
  guestName: string;
  guardianEmail: string;
  guardianPhone: string;
  status: RsvpStatus;
}

type RawBody = Record<string, unknown>;

export function validateRsvpBody(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const body = req.body as RawBody;
  const errors: string[] = [];
  const reqBody = req as Request & { body: RsvpBody };

  if (typeof body.guestName !== 'string') {
    errors.push('guestName is required and must be a string');
  } else {
    const name = body.guestName.trim();
    if (name.length === 0) errors.push('guestName cannot be empty');
    else if (name.length > GUEST_NAME_MAX)
      errors.push(`guestName must be at most ${GUEST_NAME_MAX} characters`);
    else reqBody.body.guestName = name;
  }

  if (typeof body.guardianEmail !== 'string') {
    errors.push('guardianEmail is required and must be a string');
  } else {
    const email = body.guardianEmail.trim().toLowerCase();
    if (email.length === 0) errors.push('guardianEmail cannot be empty');
    else if (email.length > EMAIL_MAX)
      errors.push(`guardianEmail must be at most ${EMAIL_MAX} characters`);
    else if (!EMAIL_REGEX.test(email))
      errors.push('guardianEmail must be a valid email address');
    else reqBody.body.guardianEmail = email;
  }

  let status: RsvpStatus = 'confirmed';
  if (body.status !== undefined && body.status !== null && body.status !== '') {
    if (typeof body.status !== 'string') {
      errors.push('status must be a string when provided');
    } else {
      const s = body.status.trim().toLowerCase();
      if (s === 'declined') status = 'declined';
      else if (s === 'confirmed' || s === '') {
        status = 'confirmed';
      } else {
        errors.push('status must be confirmed or declined');
      }
    }
  }

  let guardianPhone = '';
  if (body.guardianPhone === undefined || body.guardianPhone === null) {
    if (status === 'confirmed') {
      errors.push('guardianPhone is required for confirmed RSVP');
    }
  } else if (typeof body.guardianPhone !== 'string') {
    errors.push('guardianPhone must be a string');
  } else {
    guardianPhone = body.guardianPhone.trim();
    if (status === 'confirmed') {
      if (guardianPhone.length === 0)
        errors.push('guardianPhone is required for confirmed RSVP');
      else if (guardianPhone.length > PHONE_MAX)
        errors.push(`guardianPhone must be at most ${PHONE_MAX} characters`);
      else if (!PHONE_CONFIRMED_REGEX.test(guardianPhone))
        errors.push(
          'guardianPhone must contain only digits and common phone symbols'
        );
    } else {
      if (guardianPhone.length > PHONE_MAX)
        errors.push(`guardianPhone must be at most ${PHONE_MAX} characters`);
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  reqBody.body.guardianPhone = guardianPhone;
  reqBody.body.status = status;
  next();
}
