"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Lock, Unlock, ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  items: string[]
  onSelect: (item: string) => void
  onLockChange?: (isLocked: boolean) => void
  initialLocked?: boolean
  currentItem?: string
}

export default function Carousel({ items, onSelect, onLockChange, initialLocked = false, currentItem }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLocked, setIsLocked] = useState(initialLocked)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (currentItem) {
      const newIndex = items.indexOf(currentItem)
      if (newIndex !== -1) {
        setCurrentIndex(newIndex)
      }
    }
  }, [currentItem, items])

  const getItemIndex = (offset: number) => {
    return (currentIndex + offset + items.length) % items.length
  }

  const handleNext = () => {
    if (isLocked || isAnimating) return
    setIsAnimating(true)
    const newIndex = (currentIndex + 1) % items.length
    setCurrentIndex(newIndex)
    onSelect(items[newIndex])
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isLocked || isAnimating) return
    setIsAnimating(true)
    const newIndex = (currentIndex - 1 + items.length) % items.length
    setCurrentIndex(newIndex)
    onSelect(items[newIndex])
    setTimeout(() => setIsAnimating(false), 500)
  }

  const toggleLock = () => {
    const newLockedState = !isLocked
    setIsLocked(newLockedState)
    onLockChange?.(newLockedState)
  }

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center justify-between w-full max-w-2xl px-4">
          <button
            onClick={handlePrev}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#80CED7] text-white hover:bg-[#6bb5bd] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous item"
            disabled={isLocked || isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-[500px] h-[200px] flex items-center justify-center">
            {/* Previous Item */}
            <div
              className={`absolute transition-all duration-500 ease-in-out transform ${
                isAnimating ? "-translate-x-full opacity-0" : ""
              }`}
              style={{ left: "0px" }}
            >
              <Image
                src={items[getItemIndex(-1)] || "/placeholder.svg"}
                alt="Previous item"
                width={150}
                height={150}
                className="object-contain opacity-20 scale-60 blur-[2px]"
              />
            </div>

            {/* Current Item */}
            <div className="absolute transition-all duration-500 ease-in-out transform">
              <Image
                src={items[currentIndex] || "/placeholder.svg"}
                alt="Current item"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>

            {/* Next Item */}
            <div
              className={`absolute transition-all duration-500 ease-in-out transform ${
                isAnimating ? "translate-x-full opacity-0" : ""
              }`}
              style={{ right: "0px" }}
            >
              <Image
                src={items[getItemIndex(1)] || "/placeholder.svg"}
                alt="Next item"
                width={150}
                height={150}
                className="object-contain opacity-20 scale-60 blur-[2px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#80CED7] text-white hover:bg-[#6bb5bd] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next item"
              disabled={isLocked || isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={toggleLock}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isLocked ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
              }`}
              aria-label={isLocked ? "Unlock item" : "Lock item"}
            >
              {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

