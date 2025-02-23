"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Lock, Unlock } from "lucide-react"
import { cn } from "../../app/lib/utils"

interface CarouselProps {
  items: string[]
  title: React.ReactNode
  onSelect: (item: string) => void
  onLockChange?: (isLocked: boolean) => void
  initialLocked?: boolean
  currentItem?: string
}

export default function Carousel({
  items,
  title,
  onSelect,
  onLockChange,
  initialLocked = false,
  currentItem,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLocked, setIsLocked] = useState(initialLocked)

  useEffect(() => {
    if (currentItem) {
      const newIndex = items.indexOf(currentItem)
      if (newIndex !== -1) {
        setCurrentIndex(newIndex)
      }
    }
  }, [currentItem, items])

  const handleNext = () => {
    if (isAnimating || isLocked) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setTimeout(() => {
      setIsAnimating(false)
      onSelect(items[(currentIndex + 1) % items.length])
    }, 300)
  }

  const handlePrev = () => {
    if (isAnimating || isLocked) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    setTimeout(() => {
      setIsAnimating(false)
      onSelect(items[(currentIndex - 1 + items.length) % items.length])
    }, 300)
  }

  const toggleLock = () => {
    const newLockedState = !isLocked
    setIsLocked(newLockedState)
    onLockChange?.(newLockedState)
    if (!newLockedState) {
      onSelect(items[currentIndex])
    }
  }

  const getPrevIndex = () => (currentIndex - 1 + items.length) % items.length
  const getNextIndex = () => (currentIndex + 1) % items.length

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 ">
        <h3 className="text-center font-bold">{title}</h3>
      </div>
      <div className="relative h-[50px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Navigation and content container */}
          <div className="flex items-center gap-4">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className={cn(
                "z-10 px-4 text-2xl transition-colors",
                isLocked ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900",
              )}
              disabled={isLocked}
            >
              {"<"}
            </button>

            {/* Previous item */}
            <div className={cn("opacity-50 blur-[2px]", isLocked && "opacity-30")}>
              <Image
                src={items[getPrevIndex()]}
                alt="Previous"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>

            {/* Current item */}
            <div className={cn("transform transition-transform duration-300 ease-in-out", isAnimating && "scale-105")}>
              <Image
                src={items[currentIndex]}
                alt="Current"
                width={600}
                height={600}
                className="object-contain"
              />
            </div>

            {/* Next item */}
            <div className={cn("opacity-50 blur-[2px]", isLocked && "opacity-30")}>
              <Image
                src={items[getNextIndex()]}
                alt="Next"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className={cn(
                "z-10 px-4 text-2xl transition-colors",
                isLocked ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900",
              )}
              disabled={isLocked}
            >
              {">"}
            </button>

            {/* Lock button */}
            <button
              onClick={toggleLock}
              className={cn(
                "p-2 rounded-full transition-colors",
                isLocked
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              style={{ fontFamily: "Arial Narrow" }}
            >
              {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

