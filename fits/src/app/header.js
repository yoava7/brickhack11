"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="relative w-24 h-12">
            <Link href="/" className="text-xl font-bold">
              Fits
            </Link>
          </div>

          <nav
            className={`fixed md:relative top-0 right-0 h-screen md:h-auto w-full md:w-auto bg-white md:bg-transparent transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
            md:flex md:items-center md:space-x-8`}
          >
            <button
              className="md:hidden absolute top-6 right-6 text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col md:flex-row items-center justify-center h-full md:h-auto space-y-8 md:space-y-0 md:space-x-8">
              <li>
                <Link href="/" className="text-gray-800 hover:text-primary transition-colors duration-300 font-Arial" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/closet" className="text-gray-800 hover:text-primary transition-colors duration-300 font-Arial_Narrow" onClick={() => setIsMenuOpen(false)}>
                  Closet
                </Link>
              </li>
              <li>
                <Link href="/changing-room" className="text-gray-800 hover:text-primary transition-colors duration-300 font-Arial Narrow" onClick={() => setIsMenuOpen(false)}>
                  Changing Room
                </Link>
              </li>
            </div>
          </nav>

          <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
