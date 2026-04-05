import { NextApiRequest, NextApiResponse } from 'next';
import { getMessages } from '../../../lib/db';

/**
 * @openapi
 * /api/history/{chatId}:
 *   get:
 *     description: Retrieve all messages for a specific chat ID
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat session
 *     responses:
 *       200:
 *         description: A list of messages.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { chatId } = req.query;

  try {
    const messages = await getMessages(chatId as string);
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
