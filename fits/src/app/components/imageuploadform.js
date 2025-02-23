"use client";
async function uploadImage() {
    const response = await fetch("/api/upload", {  // ✅ Calls Next.js API route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            imageUrl: "https://example.com/image.jpg",
            description: "A test image",
        }),
    });

    const data = await response.json();
    console.log(data);
}
