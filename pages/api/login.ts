// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sign, Jwt } from 'jsonwebtoken';

import { users, User } from '@/data/users';
import * as process from "process";

type Error = {
  error: string;
}

type Success = {
  authToken: string;
}

type ReturnedType = Success | Error;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnedType>
) {
  if (req.method !== 'POST') {

    res.status(405).json({ error: 'Method not allowed, we only support POST!' });
  }

  const { email } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(404).json({ error: 'Something went wrong!' });
    return;
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY IS NOT SET UP!');
  }

  const jwt = sign(user, process.env.JWT_KEY);

  res.status(200).json({ authToken: jwt });
}
