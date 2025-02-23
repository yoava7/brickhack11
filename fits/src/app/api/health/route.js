export async function GET(req) {
    return new Response(JSON.stringify({ message: 'API is alive' }), {
      status: 200,
    });
  }
