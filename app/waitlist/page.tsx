
// app/page.tsx
// 'use client';

// import { useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default function LandingPage() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const { error } = await supabase.from('waitlist').insert([{ full_name: fullName, email }]);

//     if (error) {
//       setError(error.message);
//     } else {
//       setSuccess(true);
//       setFullName('');
//       setEmail('');
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-white text-[rgb(209,44,44)] p-6">
//       <h1 className="text-3xl font-bold mb-8">SpitchLabs</h1>
//       <div className="max-w-md w-full text-center border border-[rgb(209,44,44)] p-6 rounded-lg shadow-sm">
//         <h2 className="text-2xl font-semibold mb-4">Join Our Waitlist</h2>
//         <p className="mb-8 text-gray-600">We’re launching something exciting soon — and you won’t want to miss it.
// Join the waitlist now to get early access and exclusive updates</p>

//         {success ? (
//           <p className="text-green-600 font-semibold">You've successfully subscribed!</p>
//         ) : (
          
//             <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full px-4 py-2 rounded bg-white text-[rgb(209,44,44)] border border-[rgb(209,44,44)] focus:outline-none focus:ring-2 focus:ring-[rgb(209,44,44)]"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 rounded bg-white text-[rgb(209,44,44)] border border-[rgb(209,44,44)] focus:outline-none focus:ring-2 focus:ring-[rgb(209,44,44)]"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[rgb(209,44,44)] hover:bg-[rgb(180,30,30)] text-white py-2 px-4 rounded font-semibold transition"
//             >
//               Join Waitlist
//             </button>
//             {error && <p className="text-red-600">{error}</p>}
//           </form>
//         )}
//       </div>
//     </main>
//   );
// }

// app/page.tsx
'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LandingPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const { error } = await supabase.from('waitlist').insert([{ full_name: fullName, email }]);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setFullName('');
      setEmail('');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-red-100/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/40 to-red-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-100/30 to-red-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-50/20 to-red-100/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-300/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo/Brand */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[rgb(209,44,44)] via-red-600 to-[rgb(209,44,44)] bg-clip-text text-transparent mb-4 animate-pulse">
            SpitchLabs
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[rgb(209,44,44)] to-transparent mx-auto opacity-60"></div>
        </div>

        {/* Main Card */}
        <div className="max-w-lg w-full">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden group hover:shadow-red-200/50 transition-all duration-500 hover:-translate-y-2">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(209,44,44)]/5 via-transparent to-[rgb(209,44,44)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-200/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-100/20 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[rgb(209,44,44)] mb-4">
                  Join Our Waitlist
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We’re launching something exciting soon — and you won’t want to miss it. Join the waitlist now to get early access and exclusive updates 
                  <span className="block mt-2 font-semibold text-[rgb(209,44,44)]">
                    ✨ Early access guaranteed
                  </span>
                </p>
              </div>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Welcome aboard! 🎉</h3>
                  <p className="text-gray-600">You've successfully joined our exclusive waitlist.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-sm text-[rgb(209,44,44)] placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(209,44,44)]/50 focus:border-[rgb(209,44,44)]/50 transition-all duration-300 group-hover:bg-white/60"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgb(209,44,44)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-sm text-[rgb(209,44,44)] placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(209,44,44)]/50 focus:border-[rgb(209,44,44)]/50 transition-all duration-300 group-hover:bg-white/60"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgb(209,44,44)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[rgb(209,44,44)] to-red-600 hover:from-red-600 hover:to-[rgb(209,44,44)] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Joining...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {error && (
                    <div className="text-center p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <p className="text-red-600 font-medium">{error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-4">Join thousands of others waiting for launch</p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                No Spam
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Early Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}