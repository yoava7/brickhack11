"use client";
import Link from "next/link";
import UploadButton from "./components/uploadbutton"; // Ensure this path matches your project structure

export default function Home() {
  return (
    <div className="home-page-bg min-h-screen" style={{ fontFamily: "Arial Narrow" }}> 
      <div className="container mx-auto px-4 py-8" style={{ fontFamily: "Arial Narrow" }}>
        <h1 className="text-4xl font-bold mb-6">Does it fit?</h1>
        <p className="text-xl mb-8">Discover, organize, and style your perfect outfits.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/closet"
            className="block p-6 bg-grey-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">Closet</h2>
            <p>Organize and view your wardrobe items.</p>
          </Link>

          <Link
            href="/changing-room"
            className="block p-6 bg-grey-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">Changing Room</h2>
            <p>Mix and match to create your perfect outfit.</p>
          </Link>
        </div>

        {/* Upload Button Component */}
        <div className="mt-8 flex justify-center">
          <UploadButton />
        </div>
      </div>
    </div>
  );
}
