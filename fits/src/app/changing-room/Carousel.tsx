"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Lock, Unlock } from "lucide-react";
import { cn } from "../../app/lib/utils";

interface CarouselProps {
  items: string[];
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
  const [isAnimating, setIsAnimating] = useState(false); // State to control animation

  useEffect(() => {
    if (currentItem) {
      const newIndex = items.indexOf(currentItem);
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
      }
    }
  }, [currentItem, items]);

  const handleNext = () => {
    if (isLocked) return;
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      onSelect(items[(currentIndex + 1) % items.length]);
      setIsAnimating(false); // End animation
    }, 200); // Match the duration of the CSS animation
  };

  const handlePrev = () => {
    if (isLocked) return;
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      onSelect(items[(currentIndex - 1 + items.length) % items.length]);
      setIsAnimating(false); // End animation
    }, 200); // Match the duration of the CSS animation
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
            isLocked ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
          )}
          disabled={isLocked}
        >
          {"<"}
        </button>
        <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[140px] md:h-[140px] flex items-center justify-center overflow-hidden">
          <div
            className={`w-full h-full transition-transform duration-200 ease-in-out ${
              isAnimating ? "transform scale-105" : "transform scale-100"
            }`}
          >
            <Image
              src={items[currentIndex]}
              alt="Current"
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <button
          onClick={handleNext}
          className={cn(
            "px-2 py-1 bg-gray-200 rounded-full transition-colors text-lg",
            isLocked ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
          )}
          disabled={isLocked}
        >
          {">"}
        </button>
        <button
          onClick={toggleLock}
          className={`p-2 rounded-full ${
            isLocked ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}