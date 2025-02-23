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
      <div className="flex items-center justify-center gap-2 mb-4">
        <h3 className="text-center font-bold">{title}</h3>
      </div>
      <div className="relative h-[150px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className={cn(
              "absolute left-0 z-10 h-full px-4 text-2xl transition-colors",
              isLocked ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900",
            )}
            disabled={isLocked}
          >
            {"<"}
          </button>

          {/* Previous item */}
          <div className="absolute left-8 transform -translate-x-1/2">
            <div className={cn("blur-[2px]", isLocked && "opacity-30")}>
              <Image
                src={items[getPrevIndex()] || "/placeholder.svg"}
                alt="Previous Item"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          {/* Current item container */}
          <div className="relative">
            {/* Current item */}
            <div className={cn("transform transition-transform duration-300 ease-in-out", isAnimating && "scale-105")}>
              <Image
                src={items[currentIndex] || "/placeholder.svg"}
                alt="Current Item"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* Lock button positioned to the right of the current item */}
            <button
              onClick={toggleLock}
              className={cn(
                "absolute -right-16 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors",
                isLocked
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              style={{ fontFamily: "Arial Narrow" }}
            >
              {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>

          {/* Next item */}
          <div className="absolute right-8 transform translate-x-1/2">
            <div className={cn("blur-[2px]", isLocked && "opacity-30")}>
              <Image
                src={items[getNextIndex()] || "/placeholder.svg"}
                alt="Next Item"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className={cn(
              "absolute right-0 z-10 h-full px-4 text-2xl transition-colors",
              isLocked ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900",
            )}
            disabled={isLocked}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  )
}

