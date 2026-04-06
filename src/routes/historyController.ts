import { NextApiRequest, NextApiResponse } from 'next';
import { getChats, getMessages } from '../models/chatModel';

export async function getAllChats(req: NextApiRequest, res: NextApiResponse) {
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

export async function getChatMessages(req: NextApiRequest, res: NextApiResponse) {
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
