import { NextApiRequest, NextApiResponse } from 'next';

export function withLogger(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(`[API Request] ${req.method} ${req.url}`);
    return handler(req, res);
  };
}
