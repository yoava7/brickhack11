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
    <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-3">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="flex items-center gap-4">
        <button onClick={handlePrev} className="px-3 py-2 bg-gray-200 rounded-full text-xl" disabled={isLocked}>{"<"}</button>

        <div className="w-[250px] h-[250px] flex items-center justify-center">
          <Image src={items[currentIndex]} alt="Current" width={250} height={250} className="object-contain w-full h-full" />
        </div>

        <button onClick={handleNext} className="px-3 py-2 bg-gray-200 rounded-full text-xl" disabled={isLocked}>{">"}</button>
        <button onClick={toggleLock} className={`p-2 rounded-full ${isLocked ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
