
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import FeatureList from "@/components/feature-list"
import MobileMenu from "@/components/mobile-menu"
import TelephonyDiagram from "@/components/sidecon"
import { SignInButton, SignUpButton , SignedIn, SignedOut, UserButton} from "@clerk/nextjs";


const WaveformAnimation = () => (
  <div className="w-full overflow-hidden px-4">
    <div className="flex items-end justify-center gap-[4px] h-40 md:h-60 max-w-full">
      {Array.from({ length: 64 }).map((_, i) => (
        <div
          key={i}
          className="w-[10px] bg-[rgb(209,44,44)] animate-wave"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
    <style jsx>{`
      @keyframes wave {
        0%, 100% {
          height: 20%;
          opacity: 0.5;
        }
        50% {
          height: 100%;
          opacity: 1;
        }
      }
      .animate-wave {
        animation: wave 1.2s infinite linear;
      }
    `}</style>
  </div>
)

function AnimatedPath({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <path
      d={d}
      stroke="url(#pulse)"
      strokeWidth="4"
      fill="none"
      style={{
        strokeDasharray: 400,
        strokeDashoffset: 400,
        animation: `dash 1.5s ${delay}s linear infinite`,
      }}
    />
  );
}

export default function Home() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black text-white"> 
    <div className="min-h-screen bg-white text-black">


    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <span className="text-xl font-bold">
          Spitch<span className="text-[#B24444]">Labs</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link href="/about" className="text-sm hover:text-[rgb(209,44,44)] transition-colors">
          About Us
        </Link>
        <Link href="/pricing" className="text-sm hover:text-[rgb(209,44,44)] transition-colors">
          Pricing
        </Link>
        <Link href="/blog" className="text-sm hover:text-[rgb(209,44,44)] transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="text-sm hover:text-[rgb(209,44,44)] transition-colors">
          Contact
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal" redirecturl="/dashboard">
          <Button variant="ghost" size="sm" className="text-white hover:text-[rgb(209,44,44)]">
            Login
          </Button>
        </SignInButton>

        <SignUpButton mode="modal" redirecturl="/dashboard">
          <Button size="sm" className="bg-[rgb(209,44,44)] hover:bg-black">
            Signup
          </Button>
        </SignUpButton>
        </SignedOut>

        {/* Display 'User' button and 'Dashboard' link if user is signed in */}
        <SignedIn>
          <Link href="/dashboard">
            <Button size="sm" className="bg-[rgb(209,44,44)] hover:bg-black">
              Workspace
            </Button>
          </Link>

          <UserButton />
        </SignedIn>

      </div>

      <MobileMenu />
    </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
    {/*<section className="container mx-auto px-6 py-20 md:py-32 mt-10 md:mt-16">*/}

        <div className="flex flex-col items-center text-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Enterprise Voice AI Agent</h1>
            <p className="text-[#B24444">
              Build ultra-realistic AI voice agents that handle customer conversations - from outbound sales to 24/7 inbound support - all in one powerful platform.
            </p>
            <div className="flex gap-4 pt-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-[rgb(209,44,44)] hover:bg-[rgb(209,44,44)]">Get Started</Button>
              </Link>
              <Link href="/sign-in">
              {/*<Button variant="outline" className="border-[rgb(209,44,44)] text-[rgb(209,44,44)] bg-white">*/}
              <Button
                    variant="outline"
                    className="border-[rgb(209,44,44)] text-[rgb(209,44,44)] bg-white hover:border-transparent"
                  >

               Try Demo
              </Button>
              </Link>
            </div>
          </div>

          {/* Replace image with animated waveform */}
          <div className="mt-12 w-full flex justify-center">
            <WaveformAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 py-16 md:py-32 mt-10 md:mt-16 bg-black text-black rounded-[10px]">
  <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-white">
    Powerful Features
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-black">
    <FeatureCard
      icon="voice-inflection"
      title="Real time Calls"
      description="Our AI agents handle calls in real-time with natural conversation flow and adaptive responses.."
      color="bg-white text-black"
      iconColor="text-black"
    />
    <FeatureCard
      icon="multi-voice"
      title="Simultaneous Calls"
      description="Our AI agents can handle multiple calls seamlessly and efficiently all at once."
      color="bg-white text-black"
      iconColor="text-black"
    />
    <FeatureCard
      icon="preview-mode"
      title="Lightning Fast Setup"
      description="Get up and running in minutes with simple onboarding and intuitive configuration.."
      color="bg-white text-black"
      iconColor="text-black"
    />
    <FeatureCard
      icon="custom-voice"
      title="Custom Voice"
      description="Create your own unique AI voice that matches your brand identity perfectly."
      color="bg-white text-black"
      iconColor="text-black"
    />
  </div>

  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-16 mb-4">
    <Link href="/dashboard">
      <Button className="bg-[rgb(209,44,44)] hover:bg-[rgb(209,44,44)] text-white">
        Get Started
      </Button>
    </Link>
    <Link href="/dashboard">
      <Button
        variant="outline"
        className="border-white text-white bg-black hover:border-transparent"
      >
        Try Demo
      </Button>
    </Link>
  </div>
</section>


      {/* Enhanced Projects Section */}
      {/* <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
         <div className="md:w-1/2 flex justify-center bg-black">
                 <svg
    width="280"
    height="280"
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="max-w-full h-auto"
  >
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
        <stop offset="100%" stopColor="#B24444" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="pulse" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B24444" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
    </defs>
    
    <ellipse
      cx="140"
      cy="140"
      rx="70"
      ry="90"
      fill="url(#glow)"
      opacity="0.3"
    />
    
    <g>
      <AnimatedPath
        d="M60,120 Q100,60 140,140 Q180,220 220,160"
        delay={0}
      />
      <AnimatedPath
        d="M80,200 Q120,120 140,140 Q160,160 200,80"
        delay={0.3}
      />
      <AnimatedPath
        d="M60,180 Q100,200 140,140 Q180,80 220,120"
        delay={0.6}
      />
    </g>
   
    <circle className="synapse-node" cx="60" cy="120" r="8" fill="#FFD700">
      <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle className="synapse-node" cx="220" cy="160" r="8" fill="#FFD700">
      <animate attributeName="r" values="8;12;8" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
    </circle>
    <circle className="synapse-node" cx="80" cy="200" r="8" fill="#FFD700">
      <animate attributeName="r" values="8;12;8" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
    </circle>
    <circle className="synapse-node" cx="200" cy="80" r="8" fill="#FFD700">
      <animate attributeName="r" values="8;12;8" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
    </circle>
    <circle className="synapse-node" cx="60" cy="180" r="8" fill="#FFD700">
      <animate attributeName="r" values="8;12;8" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
    </circle>
    <circle className="synapse-node" cx="220" cy="120" r="8" fill="#FFD700">
      <animate attributeName="r" values="8;12;8" dur="1.5s" begin="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
  
</div>

          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-[rgb(209,44,44)] text-white text-sm rounded-full mb-2">
              SPITCHLABS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Enhance Your Customer Experience with 24/7 AI support</h2>
            <p className="text-black">
              Meet your AI-powered voice assistant designed for seamless, real-time conversations.
              Our speech-to-speech AI listens, understands, and replies naturally—bridging the gap between human interaction and intelligent automation.
              Whether it's customer support, personal help, or guided assistance, this voice-first assistant speaks your language and delivers instant, context-aware responses with lifelike clarity.
            </p>

            <FeatureList />

            <div className="flex justify-center md:justify-start">
              <Button className="bg-[rgb(209,44,44)] hover:bg-[rgb(209,44,44)] mt-4">EXPLORE MORE</Button>
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative px-4 py-20 md:py-32 bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden rounded-[12px] shadow-xl">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
    {/* Animation / Illustration */}
    <div className="md:w-1/2 flex justify-center">
      <div className="bg-zinc-900 rounded-xl p-6 shadow-inner w-full max-w-md">
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
              <stop offset="100%" stopColor="#B24444" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="pulse" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B24444" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>

          <ellipse cx="140" cy="140" rx="70" ry="90" fill="url(#glow)" opacity="0.3" />

          <g>
            <AnimatedPath d="M60,120 Q100,60 140,140 Q180,220 220,160" delay={0} />
            <AnimatedPath d="M80,200 Q120,120 140,140 Q160,160 200,80" delay={0.3} />
            <AnimatedPath d="M60,180 Q100,200 140,140 Q180,80 220,120" delay={0.6} />
          </g>

          {[
            [60, 120, 0],
            [220, 160, 0.3],
            [80, 200, 0.6],
            [200, 80, 0.9],
            [60, 180, 1.2],
            [220, 120, 1.5]
          ].map(([cx, cy, delay], i) => (
            <circle key={i} className="synapse-node" cx={cx} cy={cy} r="8" fill="#FFD700">
              <animate attributeName="r" values="8;12;8" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>
    </div>

    {/* Text Content */}
    <div className="md:w-1/2 space-y-6 text-center md:text-left">
      <div className="inline-block px-4 py-1 bg-[rgb(209,44,44)] text-white text-xs font-semibold rounded-full tracking-wider">
        SPITCHLABS
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
        Enhance Your Customer Experience with <br className="hidden md:block" /> 24/7 AI Support
      </h2>
      <p className="text-zinc-300 text-base md:text-lg">
        Meet your AI-powered voice assistant designed for seamless, real-time conversations.
        Our speech-to-speech AI listens, understands, and replies naturally—bridging the gap between human interaction and intelligent automation.
        Whether it's customer support or guided assistance, it delivers instant, context-aware responses with lifelike clarity.
      </p>

      <FeatureList />

      <div className="flex justify-center md:justify-start">
        <Button className="bg-[rgb(209,44,44)] hover:bg-[rgb(180,30,30)] mt-4 text-white shadow-md px-6 py-3 rounded-lg text-sm font-semibold">
          EXPLORE MORE
        </Button>
      </div>
    </div>
  </div>
</section>

<footer className="bg-black text-white py-10 px-6 mt-16">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
    {/* Company Info */}
    <div className="text-center md:text-left space-y-2">
      <h3 className="text-xl font-semibold">SpitchLabs</h3>
      <p className="text-sm text-zinc-400 max-w-xs">
        Revolutionizing real-time conversations with AI-driven voice agents.
      </p>
    </div>

    {/* Footer Links */}
    <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-zinc-300">
      <a href="/about" className="hover:text-white transition">About</a>
      <a href="/login" className="hover:text-white transition">Login</a>
      <a href="/terms" className="hover:text-white transition">Terms</a>
      <a href="/privacy" className="hover:text-white transition">Privacy</a>
    </div>
  </div>

  {/* Divider & Copyright */}
  <div className="mt-8 border-t border-zinc-700 pt-4 text-center text-xs text-zinc-500">
    © {new Date().getFullYear()} SpitchLabs. All rights reserved.
  </div>
</footer>


    </div>
  )
}



