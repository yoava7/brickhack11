"use client";

import { useState } from "react";
import Carousel from "./Carousel";
import { Wand2 } from "lucide-react";

const carouselItems = {
  hats: ["/assets/hat1.png", "/assets/hat2.png"],
  torsos: [
    "/assets/shirt1.jpg",
    "/assets/shirt2.png",
    "/assets/shirt3.png",
    "/assets/hoodie1.png",
    "/assets/hoodie2.png",
    "/assets/hoodie3.png",
  ],
  pants: ["/assets/shorts1.png", "/assets/pants1.png", "/assets/pants2.png", "/assets/pants3.png"],
  shoes: ["/assets/shoes1.jpg", "/assets/shoes2.png", "/assets/shoes3.png", "/assets/shoes4.png"],
};

interface LockedState {
  hat: boolean;
  torso: boolean;
  pants: boolean;
  shoes: boolean;
}

export default function ChangingRoom() {
  const [outfit, setOutfit] = useState({
    hat: carouselItems.hats[0],
    torso: carouselItems.torsos[0],
    pants: carouselItems.pants[0],
    shoes: carouselItems.shoes[0],
  });

  const [lockedItems, setLockedItems] = useState<LockedState>({
    hat: false,
    torso: false,
    pants: false,
    shoes: false,
  });

  const updateOutfit = (category: keyof typeof outfit, item: string) => {
    if (!lockedItems[category]) {
      setOutfit((prevOutfit) => ({
        ...prevOutfit,
        [category]: item,
      }));
    }
  };

  const handleLockChange = (category: keyof typeof outfit, isLocked: boolean) => {
    setLockedItems((prev) => ({
      ...prev,
      [category]: isLocked,
    }));
  };

  const generateRandomOutfit = () => {
    const newOutfit = { ...outfit };

    if (!lockedItems.hat) {
      newOutfit.hat = carouselItems.hats[Math.floor(Math.random() * carouselItems.hats.length)];
    }
    if (!lockedItems.torso) {
      newOutfit.torso = carouselItems.torsos[Math.floor(Math.random() * carouselItems.torsos.length)];
    }
    if (!lockedItems.pants) {
      newOutfit.pants = carouselItems.pants[Math.floor(Math.random() * carouselItems.pants.length)];
    }
    if (!lockedItems.shoes) {
      newOutfit.shoes = carouselItems.shoes[Math.floor(Math.random() * carouselItems.shoes.length)];
    }

    setOutfit(newOutfit);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-4 py-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <p className="text-center mb-6 text-lg font-semibold">Create and visualize your outfits here.</p>

        {/* Generate Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={generateRandomOutfit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Wand2 className="w-5 h-5" />
            Generate Outfit
          </button>
        </div>

        {/* Carousels */}
        <div className="flex flex-col items-center gap-6 w-full">
          <Carousel items={carouselItems.hats} title="" onSelect={(item) => updateOutfit("hat", item)} onLockChange={(isLocked) => handleLockChange("hat", isLocked)} initialLocked={lockedItems.hat} currentItem={outfit.hat} />
          <Carousel items={carouselItems.torsos} title="" onSelect={(item) => updateOutfit("torso", item)} onLockChange={(isLocked) => handleLockChange("torso", isLocked)} initialLocked={lockedItems.torso} currentItem={outfit.torso} />
          <Carousel items={carouselItems.pants} title="" onSelect={(item) => updateOutfit("pants", item)} onLockChange={(isLocked) => handleLockChange("pants", isLocked)} initialLocked={lockedItems.pants} currentItem={outfit.pants} />
          <Carousel items={carouselItems.shoes} title="" onSelect={(item) => updateOutfit("shoes", item)} onLockChange={(isLocked) => handleLockChange("shoes", isLocked)} initialLocked={lockedItems.shoes} currentItem={outfit.shoes} />
        </div>
      </div>
    </div>
  );
}
