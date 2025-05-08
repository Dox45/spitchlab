
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import FeatureList from "@/components/feature-list"
import MobileMenu from "@/components/mobile-menu"
import { SignInButton, SignUpButton , SignedIn, SignedOut, UserButton} from "@clerk/nextjs";


const WaveformAnimation = () => (
  <div className="w-full overflow-hidden px-4">
    <div className="flex items-end justify-center gap-[4px] h-40 md:h-60 max-w-full">
      {Array.from({ length: 64 }).map((_, i) => (
        <div
          key={i}
          className="w-[10px] bg-purple-400 animate-wave"
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


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black text-white"> 

    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <span className="text-xl font-bold">
          Spitch<span className="text-purple-400">Labs</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link href="/about" className="text-sm hover:text-purple-400 transition-colors">
          About Us
        </Link>
        <Link href="/pricing" className="text-sm hover:text-purple-400 transition-colors">
          Pricing
        </Link>
        <Link href="/blog" className="text-sm hover:text-purple-400 transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="text-sm hover:text-purple-400 transition-colors">
          Contact
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal" redirecturl="/dashboard">
          <Button variant="ghost" size="sm" className="text-white hover:text-purple-400">
            Login
          </Button>
        </SignInButton>

        <SignUpButton mode="modal" redirecturl="/dashboard">
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            Signup
          </Button>
        </SignUpButton>
        </SignedOut>

        {/* Display 'User' button and 'Dashboard' link if user is signed in */}
        <SignedIn>
          <Link href="/dashboard">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Dashboard
            </Button>
          </Link>

          <UserButton />
        </SignedIn>

      </div>

      <MobileMenu />
    </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Enterprise Voice AI Agent</h1>
            <p className="text-gray-300">
              Build ultra-realistic AI voice agents that handle customer conversations - from outbound sales to 24/7 inbound support - all in one powerful platform.
            </p>
            <div className="flex gap-4 pt-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
              </Link>
              <Link href="/sign-in">
              <Button variant="outline" className="border-purple-600 text-white hover:bg-purple-900/30">
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
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon="voice-inflection"
            title="Real time Calls"
            description="Our AI agents handle calls in real-time with natural conversation flow and adaptive responses.."
            color="bg-red-900/40"
            iconColor="text-red-500"
          />
          <FeatureCard
            icon="multi-voice"
            title="Simultaneous Calls"
            description="Our AI agents can handle multiple calls seamlessly and efficiently all at once."
            color="bg-purple-900/40"
            iconColor="text-purple-500"
          />
          <FeatureCard
            icon="preview-mode"
            title="Lightning Fast Setup"
            description="Get up and running in minutes with simple onboarding and intuitive configuration.."
            color="bg-orange-900/40"
            iconColor="text-orange-500"
          />
          <FeatureCard
            icon="custom-voice"
            title="Custom Voice"
            description="Create your own unique AI voice that matches your brand identity perfectly."
            color="bg-red-900/40"
            iconColor="text-red-500"
          />
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
          <div className="md:w-1/2 flex justify-center">
            <WaveformAnimation />
          </div>
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-purple-900/50 text-purple-400 text-sm rounded-full mb-2">
              SPITCHLABS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Enhance Your Customer Support with 24/7 AI support</h2>
            <p className="text-gray-300">
              Meet your AI-powered voice assistant designed for seamless, real-time conversations.
              Our speech-to-speech AI listens, understands, and replies naturally—bridging the gap between human interaction and intelligent automation.
              Whether it's customer support, personal help, or guided assistance, this voice-first assistant speaks your language and delivers instant, context-aware responses with lifelike clarity.
            </p>

            <FeatureList />

            <div className="flex justify-center md:justify-start">
              <Button className="bg-purple-600 hover:bg-purple-700 mt-4">EXPLORE MORE</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
