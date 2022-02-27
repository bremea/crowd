// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/database/Database/Database';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json(
      await db.locations.get(req.headers.authorization as string, ['data'])
    );
}
