import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { postExternalLogin } from '../../../adapters/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const response = await postExternalLogin({ username, password });
      if (response.status > 200 && response.status < 300) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('accessToken', response.data.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
          }),
        );
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('refreshToken', response.data.data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 31, // 1 month
          }),
        );
        res.status(200).json({ user: response.data.data.user ?? '' });
        return;
      }
      res.status(response.status).json({ message: '' });
    } catch (error: any) {
      console.log('test-------', { error });
      res.status(error.statusCode).json({ message: '' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
