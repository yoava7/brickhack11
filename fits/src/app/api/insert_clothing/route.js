import { spawn } from "child_process";
import path from "path";
import mysql from "mysql2";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse(JSON.stringify({ error: "Missing image URL" }), { status: 400 });
  }

  const pythonScript = path.resolve(process.cwd(), "src/app/ai/article_classification.py");

  try {
    // Run the Python script to classify the image
    const aiResponse = await new Promise((resolve, reject) => {
      const process = spawn("python", [pythonScript, imageUrl]);

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

    // Extract AI response fields: color, type, material, pattern
    const { color, type, material, pattern } = aiResponse;  // Assuming these fields exist in the AI response

    // Connect to the MySQL database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",  // Change this to your MySQL username
      password: "mochinut",  // Change this to your MySQL password
      database: "clothing_db",  // Your database name
    });

    return new Promise((resolve, reject) => {
      // Insert the AI results into the clothes table
      connection.query(
        "INSERT INTO clothes (color, type, material, pattern, image_url) VALUES (?, ?, ?, ?, ?)",
        [color, type, material, pattern, imageUrl],
        (err, results) => {
          if (err) {
            reject(new Error("Database insertion failed"));
          } else {
            resolve(
              new NextResponse(
                JSON.stringify({ message: "AI results saved successfully", results }),
                { status: 200 }
              )
            );
          }
        }
      );
    })
      .catch((err) => {
        return new NextResponse(
          JSON.stringify({ error: err.message }),
          { status: 500 }
        );
      })
      .finally(() => {
        connection.end(); // Close the database connection
      });

  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
