// app/(auth)/sign-in/[[...sign-in]]/page.tsx

'use client';

import { SignIn } from '@clerk/nextjs';
// import { dark } from '@clerk/themes';

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200 p-6">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />
      </div>
    </main>
  );
}
