import { AxiosResponse } from 'axios';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { postExternalLogin } from '../../../adapters/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const response: AxiosResponse = await postExternalLogin({
        username,
        password,
      });
      if (response.status >= 200 && response.status < 300) {
        res.setHeader('Set-Cookie', [
          cookie.serialize('accessToken', response.data.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
          }),
          cookie.serialize('refreshToken', response.data.data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 31, // 1 month
          }),
        ]);
        return res.status(200).json({ data: response.data.data });
      }
      res.setHeader('Set-Cookie', [
        cookie.serialize('accessToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          expires: new Date(0),
        }),
        cookie.serialize('refreshToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          expires: new Date(0),
        }),
      ]);
      return res.status(response.status).json({ message: '' });
    } catch (error) {
      res.setHeader('Set-Cookie', [
        cookie.serialize('accessToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          expires: new Date(0),
        }),
        cookie.serialize('refreshToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          expires: new Date(0),
        }),
      ]);
      const { response } = error;
      return res
        .status(response.status)
        .json({ message: response.data.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
