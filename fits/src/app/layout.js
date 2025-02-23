import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fits",
  description: "Discover, organize, and style your perfect outfits",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Fits
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/closet" className="hover:text-gray-300">
                  Closet
                </Link>
              </li>
              <li>
                <Link href="/changing-room" className="hover:text-gray-300">
                  Changing Room
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">© 2023 Fashion Hub. All rights reserved.</div>
        </footer>
      </body>
    </html>
  )
}

