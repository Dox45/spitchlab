// app/(auth)/sign-up/[[...sign-up]]/page.tsx

'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200 p-6">
        <SignUp
          appearance={{
            elements: {
              card: 'shadow-none',
              formButtonPrimary: 'bg-black hover:bg-gray-800 text-white',
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
        />
      </div>
    </main>
  );
}
