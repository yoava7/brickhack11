"use client";

import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { ClothingItem } from "../../lib/types";

interface ChangingRoomProps {
  clothingItems?: ClothingItem[];
}

const ChangingRoom: React.FC<ChangingRoomProps> = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [validClothingItems, setValidClothingItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const response = await fetch("/api/get_clothes");
        const data = await response.json();
        if (data.clothes && Array.isArray(data.clothes)) {
          setClothingItems(data.clothes);
        } else {
          console.log("No clothing items found.");
        }
      } catch (error) {
        console.error("Error fetching clothing items:", error);
      }
    };

    fetchClothingItems();
  }, []);

  // Effect to filter out invalid items
  useEffect(() => {
    if (clothingItems && clothingItems.length > 0) {
      const filteredItems = clothingItems.filter(item => item.image_url?.trim());
      setValidClothingItems(filteredItems);
    } else {
      setValidClothingItems([]);
    }
  }, [clothingItems]);

  if (validClothingItems.length === 0) {
    return <p>No clothing items available.</p>;
  }

  // Group clothing items by category (e.g., hat, torso, pants, shoes)
  const groupedItems = {
    hat: validClothingItems.filter(item => item.type === "hat"),
    torso: validClothingItems.filter(item => item.type === "t-shirt"),  // Changed from 'torso' to 't-shirt'
    pants: validClothingItems.filter(item => item.type === "pants"),
    shoes: validClothingItems.filter(item => item.type === "shoes"),
  };

  return (
    <div>
      <h2>Changing Room</h2>
      <div className="flex flex-col items-center space-y-6">
        {Object.keys(groupedItems).map((category) => {
          const items = groupedItems[category as keyof typeof groupedItems];
          return (
            <Carousel
              key={category}
              items={items.map(item => item.image_url)}
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              onSelect={(selectedUrl) => {
                const selectedItem = items.find(item => item.image_url === selectedUrl);
                if (selectedItem) {
                  console.log("Selected Item:", selectedItem);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChangingRoom;
