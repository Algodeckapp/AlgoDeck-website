export const config = {
  runtime: 'edge',
};

export default function handler(request: Request) {
  return new Response(JSON.stringify({ message: "Test OK", url: request.url }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
