"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Lock, Unlock } from "lucide-react";

interface CarouselProps {
  items: string[];
  title: string;
  onSelect: (item: string) => void;
  onLockChange?: (isLocked: boolean) => void;
  initialLocked?: boolean;
  currentItem?: string;
}

export default function Carousel({ items, title, onSelect, onLockChange, initialLocked = false, currentItem }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(initialLocked);

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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    onSelect(items[(currentIndex + 1) % items.length]);
  };

  const handlePrev = () => {
    if (isLocked) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    onSelect(items[(currentIndex - 1 + items.length) % items.length]);
  };

  const toggleLock = () => {
    const newLockedState = !isLocked;
    setIsLocked(newLockedState);
    onLockChange?.(newLockedState);
  };

  return (
    <div className="w-full max-w-[180px] mx-auto flex flex-col items-center space-y-2">
      <h3 className="text-md font-bold">{title}</h3>
      <div className="flex items-center gap-2">
        <button onClick={handlePrev} className="px-2 py-1 bg-gray-200 rounded-full text-lg" disabled={isLocked}>{"<"}</button>

        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[150px] md:h-[150px] flex items-center justify-center">
          <Image src={items[currentIndex]} alt="Current" width={150} height={150} className="object-contain w-full h-full" />
        </div>

        <button onClick={handleNext} className="px-2 py-1 bg-gray-200 rounded-full text-lg" disabled={isLocked}>{">"}</button>
        <button onClick={toggleLock} className={`p-2 rounded-full ${isLocked ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
