import { NextApiRequest, NextApiResponse } from 'next';
import { getChats } from '../../lib/db';

/**
 * @openapi
 * /api/history:
 *   get:
 *     description: Retrieve all chat sessions from PostgreSQL
 *     responses:
 *       200:
 *         description: A list of chat sessions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   accumulated_score:
 *                     type: number
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const chats = await getChats();
    res.status(200).json(chats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
