// pages/api/auth/discord.ts
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

const client_id = process.env.DISCORD_CLIENT_ID!;
const redirect_uri = process.env.DISCORD_REDIRECT_URI!;
const scope = 'identify email';

export async function GET(req: NextRequest) {
  const state = Math.random().toString(36).substring(7); // Generate a random state parameter for CSRF protection
  const email = req.nextUrl.searchParams.get('email') ; // Get email from query parameters

  const stateCookie = serialize('oauth_state', state, { path: '/', httpOnly: true });
  const emailCookie = serialize('oauth_email', email as string, { path: '/', httpOnly: true });

  console.log(emailCookie)

  const authorizationUrl = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;

 const response = NextResponse.redirect(authorizationUrl);
 response.headers.append('Set-Cookie', stateCookie);
 response.headers.append('Set-Cookie', emailCookie);
  return response;
}
