import { spawn } from "child_process";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Missing image URL" }), { status: 400 });
  }

  const pythonScript = path.resolve(process.cwd(), "src/app/ai/article_classification.py");

  return new Promise((resolve) => {
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
        resolve(new Response(JSON.stringify(result), { status: 200 }));
      } catch (error) {
        resolve(new Response(JSON.stringify({ error: "Failed to process image" }), { status: 500 }));
      }
    });
  });
}
