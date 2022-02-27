import dotenv from 'dotenv';
import _ from 'lodash';
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
  const dSec = new Date().getMinutes();

  let yesterday = rrd.slice(
    rrd.length - 1 - dSec - 1440,
    rrd.length - 1 - dSec
  );
  yesterday = _.chunk(yesterday, 60);
  const maxesHour = [];
  const averageHour = [];
  for (const i of yesterday) {
    maxesHour.push(Math.max(...i));
    averageHour.push(_.mean(i));
  }

  const maxesBefore: Array<Array<number>> = _.chunk(rrd, 1440);
  const maxesEveryDay = [];
  for (const max of maxesBefore) {
    maxesEveryDay.push(Math.max(...max));
  }
  const averageMax = _.mean(maxesEveryDay);

  res.status(200).send({
    error: false,
    msg: 'success',
    current: rrd[rrd.length - 1],
    max: _.mean(maxesHour),
    percent: Math.floor((rrd[rrd.length - 1] / averageMax) * 100),
    maxHour: maxesHour.indexOf(Math.max(...maxesHour)),
    hourly: averageHour,
    id: req.query.id,
    name: (names as { [key: string]: string })[req.query.id as string],
    hours: (hours as { [key: string]: Array<number> })[req.query.id as string],
  });
}

const names = {
  library: 'Campus Library',
  study: 'Study Hall',
  cyber: 'Cyber Center',
  music: 'Music Room',
  gym: 'Main Gym',
};

const hours = {
  library: [7, 11],
  study: [9, 5],
  cyber: [9, 5],
  music: [7, 9],
  gym: [6, 9],
};
