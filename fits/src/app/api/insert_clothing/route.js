import { spawn } from "child_process";
import path from "path";
import mysql from "mysql2";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  // Parse form data from the request (file upload)
  const formData = await req.formData();
  const imageFile = formData.get("image");

  if (!imageFile) {
    return new NextResponse(JSON.stringify({ error: "No image file uploaded" }), { status: 400 });
  }

  try {
    // Convert uploaded file to a buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    // Create a unique filename (e.g., using uuid)
    const fileName = `${uuidv4()}.jpg`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // Ensure the uploads directory exists (create it if necessary)
    // (You can manually create the "public/uploads" folder in your project root if you prefer.)
    
    await writeFile(filePath, imageBuffer);

    // Path to the Python AI script
    const pythonScript = path.resolve(process.cwd(), "src/app/ai/article_classification.py");

    // Run the Python script with the local file path as an argument
    const aiResponse = await new Promise((resolve, reject) => {
      const process = spawn("python", [pythonScript, filePath]);

      let output = "";
      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        console.error("Error:", data.toString());
      });

      process.on("close", () => {
        try {
          const result = JSON.parse(output);
          resolve(result);
        } catch (error) {
          reject(new Error("Failed to process image"));
        }
      });
    });

    // Extract the expected AI response fields (adjust if your AI outputs different keys)
    const { color, type, material, pattern } = aiResponse;

    // Connect to MySQL database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "mochinut",
      database: "clothing_db",
    });

    // Insert the AI results along with the image path (we store the URL to the uploaded file)
    const imagePathUrl = `/uploads/${fileName}`;
    const insertionResult = await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO clothes (color, type, material, pattern, image_url) VALUES (?, ?, ?, ?, ?)",
        [color, type, material, pattern, imagePathUrl],
        (err, results) => {
          if (err) {
            reject(new Error("Database insertion failed"));
          } else {
            resolve(results);
          }
        }
      );
    });

    connection.end();

    return new NextResponse(JSON.stringify({
      message: "AI results saved successfully",
      results: insertionResult,
      image: imagePathUrl
    }), { status: 200 });

  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
