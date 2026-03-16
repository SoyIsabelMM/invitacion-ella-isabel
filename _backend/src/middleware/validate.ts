import { Request, Response, NextFunction } from 'express';

const GUEST_NAME_MAX = 200;
const EMAIL_MAX = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface RsvpBody {
  guestName: string;
  guardianEmail: string;
}

export function validateRsvpBody(
  req: Request<object, object, RsvpBody>,
  res: Response,
  next: NextFunction
): void {
  const body = req.body;
  const errors: string[] = [];

  if (typeof body?.guestName !== 'string') {
    errors.push('guestName is required and must be a string');
  } else {
    const name = body.guestName.trim();
    if (name.length === 0) errors.push('guestName cannot be empty');
    else if (name.length > GUEST_NAME_MAX)
      errors.push(`guestName must be at most ${GUEST_NAME_MAX} characters`);
    else (req as Request & { body: RsvpBody }).body.guestName = name;
  }

  if (typeof body?.guardianEmail !== 'string') {
    errors.push('guardianEmail is required and must be a string');
  } else {
    const email = body.guardianEmail.trim().toLowerCase();
    if (email.length === 0) errors.push('guardianEmail cannot be empty');
    else if (email.length > EMAIL_MAX)
      errors.push(`guardianEmail must be at most ${EMAIL_MAX} characters`);
    else if (!EMAIL_REGEX.test(email))
      errors.push('guardianEmail must be a valid email address');
    else (req as Request & { body: RsvpBody }).body.guardianEmail = email;
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  next();
}
