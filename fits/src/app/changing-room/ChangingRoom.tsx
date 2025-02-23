"use client"

import { useState } from "react"
import { Wand2 } from "lucide-react"
import Carousel from "./Carousel"

const carouselItems = {
  hats: ["/assets/hat1.png", "/assets/hat2.png"],
  torsos: [
    "/assets/shirt1.png",
    "/assets/shirt2.png",
    "/assets/shirt3.png",
    "/assets/hoodie1.png",
    "/assets/hoodie2.png",
    "/assets/hoodie3.png",
  ],
  pants: ["/assets/shorts1.png", "/assets/pants1.png", "/assets/pants2.png", "/assets/pants3.png"],
  shoes: ["/assets/shoes1.png", "/assets/shoes2.png", "/assets/shoes3.png", "/assets/shoes4.png"],
}

interface LockedState {
  hat: boolean
  torso: boolean
  pants: boolean
  shoes: boolean
}

export default function ChangingRoom() {
  const [outfit, setOutfit] = useState({
    hat: carouselItems.hats[0],
    torso: carouselItems.torsos[0],
    pants: carouselItems.pants[0],
    shoes: carouselItems.shoes[0],
  })

  const [lockedItems, setLockedItems] = useState<LockedState>({
    hat: false,
    torso: false,
    pants: false,
    shoes: false,
  })

  const updateOutfit = (category: keyof typeof outfit, item: string) => {
    if (!lockedItems[category]) {
      setOutfit((prevOutfit) => ({
        ...prevOutfit,
        [category]: item,
      }))
    }
  }

  const handleLockChange = (category: keyof typeof outfit, isLocked: boolean) => {
    setLockedItems((prev) => ({
      ...prev,
      [category]: isLocked,
    }))
  }

  const generateRandomOutfit = () => {
    const newOutfit = { ...outfit }

    if (!lockedItems.hat) {
      const randomHat = Math.floor(Math.random() * carouselItems.hats.length) + 1
      newOutfit.hat = `/assets/hat${randomHat}.png`
    }

    if (!lockedItems.torso) {
      const isHoodie = Math.random() < 0.5
      const randomNum = Math.floor(Math.random() * (isHoodie ? 3 : 3)) + 1
      newOutfit.torso = `/assets/${isHoodie ? "hoodie" : "shirt"}${randomNum}.png`
    }

    if (!lockedItems.pants) {
      const isShorts = Math.random() < 0.25
      const randomNum = Math.floor(Math.random() * (isShorts ? 1 : 3)) + 1
      newOutfit.pants = `/assets/${isShorts ? "shorts" : "pants"}${randomNum}.png`
    }

    if (!lockedItems.shoes) {
      const randomShoes = Math.floor(Math.random() * carouselItems.shoes.length) + 1
      newOutfit.shoes = `/assets/shoes${randomShoes}.png`
    }

    setOutfit(newOutfit)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Changing Room</h1>
        <p className="text-center mb-8" style={{ fontFamily: "Arial Narrow" }}>
          Create and visualize your outfits here.
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "Arial Narrow" }}>
              Select Your Outfit
            </h2>
            <button
              onClick={generateRandomOutfit}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              style={{ fontFamily: "Arial Narrow" }}
            >
              <Wand2 className="w-4 h-4" />
              Generate
            </button>
          </div>
          <Carousel
            items={carouselItems.hats}
            title={<span style={{ fontFamily: "Arial Narrow" }}>Hats</span>}
            onSelect={(item) => updateOutfit("hat", item)}
            onLockChange={(isLocked) => handleLockChange("hat", isLocked)}
            initialLocked={lockedItems.hat}
            currentItem={outfit.hat}
          />
          <Carousel
            items={carouselItems.torsos}
            title={<span style={{ fontFamily: "Arial Narrow" }}>Tops</span>}
            onSelect={(item) => updateOutfit("torso", item)}
            onLockChange={(isLocked) => handleLockChange("torso", isLocked)}
            initialLocked={lockedItems.torso}
            currentItem={outfit.torso}
          />
          <Carousel
            items={carouselItems.pants}
            title={<span style={{ fontFamily: "Arial Narrow" }}>Pants</span>}
            onSelect={(item) => updateOutfit("pants", item)}
            onLockChange={(isLocked) => handleLockChange("pants", isLocked)}
            initialLocked={lockedItems.pants}
            currentItem={outfit.pants}
          />
          <Carousel
            items={carouselItems.shoes}
            title={<span style={{ fontFamily: "Arial Narrow" }}>Shoes</span>}
            onSelect={(item) => updateOutfit("shoes", item)}
            onLockChange={(isLocked) => handleLockChange("shoes", isLocked)}
            initialLocked={lockedItems.shoes}
            currentItem={outfit.shoes}
          />
        </div>
      </div>
    </div>
  )
}

