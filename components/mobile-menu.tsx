"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col items-center gap-8 p-8">
            <Link
              href="/about"
              className="text-xl font-medium text-white hover:text-purple-400 transition-colors"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              className="text-xl font-medium text-white hover:text-purple-400 transition-colors"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-xl font-medium text-white hover:text-purple-400 transition-colors"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-xl font-medium text-white hover:text-purple-400 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            <div className="flex flex-col gap-4 mt-6 w-full">
              <Button variant="ghost" className="w-full text-white hover:text-purple-400">
                Login
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Signup</Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
