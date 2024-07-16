// pages/api/auth/discord/callback.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { serialize } from 'cookie';
import { prisma } from "../../../../../../lib/prisma"

const client_id = process.env.DISCORD_CLIENT_ID!;
const client_secret = process.env.DISCORD_CLIENT_SECRET!;
const redirect_uri = process.env.DISCORD_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const email = req.cookies.get('oauth_email')?.value;
  const storedState = req.cookies.get('oauth_state')?.value;

  console.log(email)

  if (state !== storedState) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id,
        client_secret,
        grant_type: 'authorization_code',
        code: code!,
        redirect_uri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Retrieve user's Discord information
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const discordUser = userResponse.data;

    // Here you can associate the Discord account with the user in your database
    // Example: await updateUserWithDiscord(req.user.id, discordUser);
    // Assuming you have the user authenticated and their user ID available

    if (email) {
        await prisma.user.update({
            where : {
                email: email
            },
            data : {
                discordId : discordUser.id
            }
        })
    } else {
        console.log('email not found')
    }

    const clearStateCookie = serialize('oauth_state', '', { path: '/', expires: new Date(0) });
    const clearEmailCookie = serialize('oauth_email', '', { path: '/', expires: new Date(0) });
    

    // Clear the OAuth state cookie
    const clearCookie = serialize('oauth_state', '', { path: '/', expires: new Date(0) });

    return NextResponse.redirect(`http://localhost:3000/complete_registration`, {
      headers: {
        'Set-Cookie': clearCookie,
        'Clear-Email' : clearEmailCookie,
        'Clear-State' : clearStateCookie
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
