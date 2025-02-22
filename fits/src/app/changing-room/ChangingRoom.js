"use client"

import { useState } from "react"
import Image from "next/image"
import Carousel from "./Carousel"

const carouselItems = {
  hats: [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ],
  torsos: [
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
  ],
  pants: [
    "/placeholder.svg?height=250&width=150",
    "/placeholder.svg?height=250&width=150",
    "/placeholder.svg?height=250&width=150",
  ],
  shoes: [
    "/placeholder.svg?height=100&width=150",
    "/placeholder.svg?height=100&width=150",
    "/placeholder.svg?height=100&width=150",
  ],
}

export default function ChangingRoom() {
  const [outfit, setOutfit] = useState({
    hat: carouselItems.hats[0],
    torso: carouselItems.torsos[0],
    pants: carouselItems.pants[0],
    shoes: carouselItems.shoes[0],
  })

  const updateOutfit = (category, item) => {
    setOutfit((prevOutfit) => ({
      ...prevOutfit,
      [category]: item,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Changing Room</h1>
      <p className="mb-4">Create and visualize your outfits here.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select Your Outfit</h2>
          <Carousel items={carouselItems.hats} title="Hats" onSelect={(item) => updateOutfit("hat", item)} />
          <Carousel items={carouselItems.torsos} title="Tops" onSelect={(item) => updateOutfit("torso", item)} />
          <Carousel items={carouselItems.pants} title="Pants" onSelect={(item) => updateOutfit("pants", item)} />
          <Carousel items={carouselItems.shoes} title="Shoes" onSelect={(item) => updateOutfit("shoes", item)} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Outfit</h2>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <Image
              src={outfit.hat || "/placeholder.svg"}
              alt="Selected hat"
              width={100}
              height={100}
              className="mb-2"
            />
            <Image
              src={outfit.torso || "/placeholder.svg"}
              alt="Selected top"
              width={150}
              height={200}
              className="mb-2"
            />
            <Image
              src={outfit.pants || "/placeholder.svg"}
              alt="Selected pants"
              width={150}
              height={250}
              className="mb-2"
            />
            <Image src={outfit.shoes || "/placeholder.svg"} alt="Selected shoes" width={150} height={100} />
          </div>
        </div>
      </div>
    </div>
  )
}

