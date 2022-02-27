// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/database/Database/Database';

export default async function packet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rr = await db.locations.get(req.headers.authorization as string, [
    'data',
  ]);
  if (!rr[0]) {
    res.status(403).send({ error: true, msg: 'unauthorized' });
  }

  const d = JSON.parse(rr[0].data);
  d.push(req.body.unique);
  if (d.length > 730) d.shift();
  await db.locations.update(
    req.headers.authorization as string,
    ['data'] as const,
    [JSON.stringify(d)]
  );
  res.status(200).send({ error: false, msg: 'success' });
}
