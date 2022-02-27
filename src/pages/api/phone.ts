import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

import { db } from '@/lib/database/Database/Database';

export default async function phone(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.phoneNum || !validate(req.body.phoneNum)) {
    res.status(403).send({ error: true, msg: 'phone number is invalid' });
    return;
  }
  const t = twilio(process.env.TWILIO_ACCOUNT, process.env.TWILIO_AUTH);
  const m = await t.messages.create({
    body: `You are now reciving updates from Crowd. Reply with STOP to cancel.`,
    messagingServiceSid: process.env.TWILIO_ID,
    to: req.body.phoneNum,
  });
  if (m.status !== 'accepted') {
    res.status(403).send({ error: true, msg: 'phone number is invalid' });
    return;
  }
  db.phones.register(req.body.phoneNum, req.body.id);
  res.status(200).send({ error: false, msg: 'success' });
}

const validate = (phoneNumber: string) => {
  const re =
    /^\+{0,2}([\\-\\. ])?(\(?\d{0,3}\))?([\\-\\. ])?\(?\d{0,3}\)?([\\-\\. ])?\d{3}([\\-\\. ])?\d{4}/;
  return re.test(phoneNumber);
};
