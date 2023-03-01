// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

import { users, User } from '@/data/users';
import * as process from "process";

type ReturnedType = {
  message: string;
  error: boolean;
  success: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnedType>
) {
  if (req.method !== 'POST') {

    res.status(405).json({
      error: true,
      success: false,
      message: 'Method not allowed, we only support POST!'
    });
  }

  const { email } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(404).json({
      error: true,
      success: false,
      message: 'Something went wrong!',
    });
    return;
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY IS NOT SET UP!');
  }

  const jwt = sign(user, process.env.JWT_KEY);
  res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  }));

  res.status(200).json({
    message: 'Successfully logged in!',
    error: false,
    success: true,
  });
}
