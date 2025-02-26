"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Unlock } from "lucide-react";
import { cn } from "@lib/utils";

interface CarouselProps {
  items: string[]; // Only the image URLs
  title: string;
  onSelect: (item: string) => void;
  onLockChange?: (isLocked: boolean) => void;
  initialLocked?: boolean;
  currentItem?: string;
}

export default function Carousel({
  items,
  title,
  onSelect,
  onLockChange,
  initialLocked = false,
  currentItem,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(initialLocked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isLocked || items.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      onSelect(items[(currentIndex + 1) % items.length]);
      setIsAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    if (isLocked || items.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      onSelect(items[(currentIndex - 1 + items.length) % items.length]);
      setIsAnimating(false);
    }, 200);
  };

  const toggleLock = () => {
    const newLockedState = !isLocked;
    setIsLocked(newLockedState);
    onLockChange?.(newLockedState);
  };

  return (
    <div className="w-full max-w-[120px] mx-auto flex flex-col items-center space-y-2">
      <h3 className="text-md font-bold">{title}</h3>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          className={cn(
            "px-2 py-1 bg-gray-200 rounded-full transition-colors text-lg",
            isLocked || items.length === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
          )}
          disabled={isLocked || items.length === 0}
        >
          {"<"}
        </button>
        <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[140px] md:h-[140px] flex items-center justify-center overflow-hidden">
          {items.length > 0 ? (
            <div
              className={`w-full h-full transition-transform duration-200 ease-in-out ${
                isAnimating ? "transform scale-105" : "transform scale-100"
              }`}
            >
              <Image
                src={items[currentIndex]}
                alt={`Clothing item ${currentIndex + 1}`}
                width={150}
                height={150}
                className="object-contain w-full h-full"
              />
            </div>
          ) : (
            <p className="text-gray-500">No Images</p>
          )}
        </div>
        <button
          onClick={handleNext}
          className={cn(
            "px-2 py-1 bg-gray-200 rounded-full transition-colors text-lg",
            isLocked || items.length === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
          )}
          disabled={isLocked || items.length === 0}
        >
          {">"}
        </button>
        <button
          onClick={toggleLock}
          className={`p-2 rounded-full ${isLocked ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
