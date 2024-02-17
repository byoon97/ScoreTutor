import type { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from "../../../../../lib/prisma"

export const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, secret, firstName, lastName, phoneNumber } = req.body;
  
    // Check if the secret matches
    if (secret !== process.env.AUTH0_HOOK_SECRET) {
      console.error('Unauthorized attempt to call hook');
      return res.status(403).json({ error: 'Unauthorized' });
    }
  
    try {
      // Adjust the Prisma operation to include firstName, lastName, and phoneNumber
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          firstName, // Assuming these fields exist in your Prisma User model
          lastName,
          phoneNumber,
        },
        create: {
          email,
          firstName,
          lastName,
          phoneNumber, // Ensure these fields are correctly defined in your Prisma schema
        },
      });
  
      return res.status(200).json({ message: 'User processed successfully', user });
    } catch (error) {
      console.error('Failed to process user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
