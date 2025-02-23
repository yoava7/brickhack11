"use client";

import { useState } from "react";

export default function UploadButton() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!imageUrl) {
      setMessage("Image URL is required.");
      return;
    }

    try {
      // Only include the description in the request if it's not empty
      const requestBody = description
        ? { imageUrl, description }
        : { imageUrl };

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Upload successful!");
      } else {
        setMessage(`Error: ${data.error || "Failed to upload image."}`);
      }
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Upload your Closet</h2>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Upload
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}