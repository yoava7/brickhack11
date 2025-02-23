"use client";  // 👈 Important! This must be here

import { useState } from "react";

export default function UploadButton() {
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        try {
            const response = await fetch("/api/upload", {  // 👈 Make sure this matches your API route
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageUrl, description })
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
            <h2 className="text-lg font-semibold mb-2">Upload your Closet</h2>
            <input 
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="border p-2 rounded mb-2 w-full"
            />
            <input 
                type="text" 
                placeholder="Description" 
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
