import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import Header from "./header"

const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "Fits",
  description: "Discover, organize, and style your perfect outfits",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <main>{children}</main>

        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">© 2025 Fits. All rights reserved.</div>
        </footer>
      </body>
    </html>
  )
}

