import { NextResponse } from 'next/server';
import { createChat } from '@/lib/db';
import * as crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { classCode, topic } = await req.json();
    
    if (!classCode || !topic) {
      return NextResponse.json({ error: "Missing classCode or topic" }, { status: 400 });
    }

    const chatId = crypto.randomUUID();
    const title = `Web Session: ${classCode} - ${topic} - ${new Date().toLocaleString()}`;
    
    createChat(chatId, title);
    
    return NextResponse.json({ chatId, title, success: true });
  } catch (error: any) {
    console.error("[Session API Error]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
