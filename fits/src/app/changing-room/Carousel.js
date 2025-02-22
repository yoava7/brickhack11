"use client"

import { useState } from "react"
import Image from "next/image"

export default function Carousel({ items, title, onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <button onClick={prev} className="bg-blue-500 text-white px-2 py-1 rounded">
          Prev
        </button>
        <div className="relative">
          <Image
            src={items[currentIndex] || "/placeholder.svg"}
            alt={`${title} option`}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
        <button onClick={next} className="bg-blue-500 text-white px-2 py-1 rounded">
          Next
        </button>
      </div>
    </div>
  )
}

