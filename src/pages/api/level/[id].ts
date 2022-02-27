import dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/database/Database/Database';
dotenv.config();

export default async function packet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pass = `${process.env.PASS}-${req.query.id}`;
  const rrf = (await db.locations.get(pass, ['data']))[0];
  if (!rrf) {
    res.status(403).send({ error: false, msg: 'id doesn\t exist' });
    return;
  }
  const rrd = JSON.parse(rrf.data);
  const dayMaxes = [];
  for (let i = 0; i < rrd.length; i += 1440) {
    const chunk = rrd.slice(i, i + 1440);
    dayMaxes.push(chunk);
  }
  const maxes: number[] = [];
  for (const o of dayMaxes) {
    maxes.push(Math.max(...o));
  }
  const averageMax = Math.round(maxes.reduce((a, b) => a + b) / maxes.length);
  res.status(200).send({
    error: false,
    msg: 'success',
    current: rrd[rrd.length - 1],
    max: averageMax,
    percent: Math.floor((rrd[rrd.length - 1] / averageMax) * 100),
  });
}
