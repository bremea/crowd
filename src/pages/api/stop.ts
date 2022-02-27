import { NextApiRequest, NextApiResponse } from 'next';
import { twiml } from 'twilio';

import { db } from '@/lib/database/Database/Database';

export default async function stop(req: NextApiRequest, res: NextApiResponse) {
  const t = new twiml.MessagingResponse();

  t.message('You will no longer recive updates from Crowd.');
  db.phones.delete(req.body.from);

  res.status(200).setHeader('Content-Type', 'text/xml').send(twiml.toString());
}
