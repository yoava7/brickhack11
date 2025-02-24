"use client";

import { useState } from "react";

export default function UploadButton() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/insert_clothing", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Upload successful!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Upload an Image</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])} 
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
