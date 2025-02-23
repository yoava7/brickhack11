// "use client";
// export default function handler(req, res) {
//     if (req.method === "POST") {
//         return res.status(200).json({ message: "Upload API working!" });
//     }
//     return res.status(405).json({ error: "Method not allowed" });

//     try {
//         const { imageUrl, description } = req.body;

//         if (!imageUrl || !description) {
//             return res.status(400).json({ error: "Missing fields" });
//         }

//         // Simulate saving the image (replace with actual MongoDB logic)
//         console.log("Image received:", imageUrl, description);

//         return res.status(201).json({ message: "Image uploaded successfully" });
//     } catch (error) {
//         return res.status(500).json({ error: "Internal server error", details: error.message });
//     }
// }
