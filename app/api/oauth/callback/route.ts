// import { google } from 'googleapis';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const code = req.query.code as string;

//   if (!code) {
//     return res.status(400).json({ error: 'Missing auth code' });
//   }

//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URI // Must match what you added in console
//   );

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // Optional: get the user's email
//     const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
//     const { data: userInfo } = await oauth2.userinfo.get();

//     // Save tokens and user info in DB (or session)
//     console.log('Access Token:', tokens.access_token);
//     console.log('Refresh Token:', tokens.refresh_token);
//     console.log('User Info:', userInfo);

//     // Redirect to frontend with success or store in session
//     res.redirect('/integration-success'); // or return a message

//   } catch (error) {
//     console.error('OAuth callback error:', error);
//     res.status(500).json({ error: 'OAuth token exchange failed' });
//   }
// }

// app/api/oauth-callback/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

async function handleOAuth(code: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
  const { data: userInfo } = await oauth2.userinfo.get();

  // Save tokens
  const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/save-tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userInfo.email,
      tokens,
    }),
  });

  if (!saveResponse.ok) {
    const errorData = await saveResponse.json();
    console.error('Failed to save tokens:', errorData);
    throw new Error('Failed to save tokens');
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
}

// Handles GET for OAuth redirect
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing auth code' }, { status: 400 });
  }

  try {
    return await handleOAuth(code);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json({ error: 'OAuth token exchange failed' }, { status: 500 });
  }
}

// Optional: handle POST if needed elsewhere
export async function POST(req: NextRequest) {
  const body = await req.json();
  const code = body.code as string;

  if (!code) {
    return NextResponse.json({ error: 'Missing auth code' }, { status: 400 });
  }

  try {
    return await handleOAuth(code);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json({ error: 'OAuth token exchange failed' }, { status: 500 });
  }
}


