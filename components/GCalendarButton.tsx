'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email',
].join(' ');

const GoogleCalendarButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  console.log('Checking connection for email:', email);


  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`/api/google/status?email=${email}`);
        const data = await res.json();
        setIsConnected(data.connected);
      } catch (err) {
        console.error("Failed to check connection", err);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, [email]);

//   const handleClick = () => {
//   //   const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
//   //     REDIRECT_URI
//   //   )}&response_type=code&scope=${encodeURIComponent(
//   //     SCOPES
//   //   )}&access_type=offline&prompt=consent`;

//   //   window.location.href = oauthUrl;
//   // };

// const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
//   REDIRECT_URI
// )}&response_type=code&scope=${encodeURIComponent(
//   SCOPES
// )}&access_type=offline&prompt=consent&login_hint=${encodeURIComponent(email)}`;
// windows.location.href = oauthUrl;
// };
  const handleClick = () => {
  if (!email) return;

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=${encodeURIComponent(
    SCOPES
  )}&access_type=offline&prompt=consent&login_hint=${encodeURIComponent(email)}`;

  window.location.href = oauthUrl;
};



  return (
    <button
      onClick={handleClick}
      disabled={isConnected || loading}
      className={`px-4 py-2 rounded text-white transition ${
        isConnected
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isConnected ? 'Connected ✅' : 'Google 📅'}
    </button>
  );
};

export default GoogleCalendarButton;
