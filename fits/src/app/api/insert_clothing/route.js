import { spawn } from "child_process";
import mysql from "mysql2";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function POST(req) {
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

    // Ensure the uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    // Save the image buffer as a file
    await writeFile(filePath, imageBuffer);

    // Path to the Python AI script
    const pythonScript = path.resolve(process.cwd(), "src/app/ai/article_classification.py");

    return new Promise((resolve, reject) => {
      // Spawn the Python process and send the image path as an argument
      const process = spawn("python", [pythonScript, filePath]);

      let output = "";

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        console.error("Error:", data.toString());
      });

      process.on("close", async () => {
        try {
          // Ensure there's some output before attempting to parse
          if (!output.trim()) {
            throw new Error("No output from Python script");
          }

          let aiResponse;
          try {
            aiResponse = JSON.parse(output);
          } catch (err) {
            throw new Error("Invalid JSON output from Python script: " + output);
          }

          if (aiResponse.error) throw new Error(aiResponse.error);

          const { color, type, material, pattern } = aiResponse;

          // Connect to MySQL database
          const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "mochinut",
            database: "clothing_db",
          });

          // Insert AI results along with image URL
          connection.query(
            "INSERT INTO clothes (color, type, material, pattern, image_url) VALUES (?, ?, ?, ?, ?)",
            [color, type, material, pattern, `/uploads/${fileName}`],
            (err, results) => {
              connection.end();
              if (err) {
                console.error("Database insertion failed:", err);
                reject(new NextResponse(JSON.stringify({ error: "Database insertion failed" }), { status: 500 }));
              } else {
                resolve(new NextResponse(JSON.stringify({
                  message: "AI results saved successfully",
                  results: results,
                  image: `/uploads/${fileName}`
                }), { status: 200 }));
              }
            }
          );
        } catch (err) {
          console.error("Error during AI processing or database insertion:", err);
          reject(new NextResponse(JSON.stringify({ error: err.message }), { status: 500 }));
        }
      });
    });

  } catch (err) {
    console.error("Error during image processing:", err);
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
