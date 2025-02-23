import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import Header from "./header"

const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "digiFit",
  description: "Discover, fart, and style your perfect outfits",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Add Header here */}
        <Header />

        <main>{children}</main>

        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div style={{ fontFamily: "Arial Narrow" }} className="container mx-auto text-center">© 2025 digiFit. All rights reserved. </div>
        </footer>
      </body>
    </html>
  )
}

