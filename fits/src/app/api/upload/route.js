export async function POST(req) {
    try {
        const { imageUrl, description } = await req.json();

        if (!imageUrl || !description) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log("Received:", imageUrl, description);

        return new Response(JSON.stringify({ message: "Image uploaded successfully!" }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
