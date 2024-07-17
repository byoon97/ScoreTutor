// pages/api/telegram-webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';
import axios from 'axios';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  if (message && message.new_chat_members) {
    for (const member of message.new_chat_members) {
      const telegramId = member.id;

            // extracting the query
            const textParts = message.text?.split(' ');
            const token = textParts ? textParts[1] : null;
            const email = textParts ? textParts[2] : null;

      // Check if the token exists in your database
      const user = await getEmailByToken(token); 
      if (user && user?.email === email) {
        // Link the Telegram ID with the user's email
        await linkTelegramIdToUser(email, telegramId);
        await sendGreetingMessage(telegramId);
        res.status(200).json({ message: 'Authentication successful' });
      } else {
        res.status(400).json({ message: 'Invalid token or email' });
      }
    }
  } else {
    res.status(200).json({ message: 'No action taken' });
  }
}

// function to get email by token
async function getEmailByToken(token: string) {
  const foundUser = await prisma.user.findFirst({
    where : {
        telegramToken : token
    }
  })

  return foundUser
}

// function to link Telegram ID with email
async function linkTelegramIdToUser(email: string, telegramId : string) {
    await prisma.user.update({
        where : {
            email : email
        },
        data : {
            telegramId : telegramId
        }
    })
}

// Function to send a greeting message
async function sendGreetingMessage(telegramId: number) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: telegramId,
    text: 'Welcome to ScoreTutor Telegram Group 🎉! Your account has been linked.',
  };

  await axios.post(url, data);
}
