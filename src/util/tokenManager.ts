import axios from 'axios';

let tokenCache: { token: string; expiresAt: number } | null = null;

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID as string;
const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET as string;
const AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

async function getAuth0Token(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: AUDIENCE,
  }), {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  });

  if (response.status !== 200) {
    console.error('Failed to obtain Auth0 token', response.data);
    throw new Error('Failed to obtain Auth0 token');
  }

  const token = response.data.access_token;
  const expiresIn = response.data.expires_in * 1000; // Convert to milliseconds

  tokenCache = {
    token,
    expiresAt: Date.now() + expiresIn,
  };

  return token;
}

async function getAuth0UserByEmail(email: string): Promise<any> {
    const token = await getAuth0Token();
    console.log('Using Auth0 token:', token);
  
    try {
      const response = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users-by-email`, {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Auth0 response status:', response.status);
      console.log('Auth0 response data:', response.data);
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch user from Auth0');
      }
  
      if (response.data.length === 0) {
        throw new Error('User not found in Auth0');
      }
  
      return response.data[0];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

export { getAuth0Token, getAuth0UserByEmail };

