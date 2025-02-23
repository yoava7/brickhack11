"use client";  

import { useState } from "react";

export default function UploadButton() {
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!imageUrl.trim()) {
            setMessage("Please enter an image URL.");
            return;
        }

        try {
            const response = await fetch(`/api/insert_clothing?url=${encodeURIComponent(imageUrl)}`, {
                method: "GET",
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
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
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
