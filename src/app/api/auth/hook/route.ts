import type { NextApiHandler } from 'next';
import { prisma } from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Role } from "@prisma/client";

export const POST = async (req:NextRequest, res:NextResponse) => {
    let passedValue = await new Response(req.body).text();
    let { email, secret } = JSON.parse(passedValue);

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return NextResponse.json({ message: `You must provide the secret 🤫` });
  }

  if (email) {
    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (foundUser) {
        return NextResponse.json({message: 'User found, redirecting'}, {status: 200})
    } else {
    try {
      await prisma.user.create({
        data: { email, role: Role.USER },
      });
      return NextResponse.json({ 
        status: 200,
        message: `User with email: ${email} has been created successfully!`,
      });
    } catch (error) {
      console.error('Failed to process user:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
    }

  }
};
