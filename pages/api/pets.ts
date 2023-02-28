// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { pets, Pet } from '@/data/pets';
import { middleware } from '@/middleware/auth';

export default middleware(function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pet[]>,
) {

  res.status(200).json(pets);
});
