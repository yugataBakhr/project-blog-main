import { RSSGenerator } from "@/helpers/rss-helpers";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request) {
  const blogPostList = await RSSGenerator();
  3;

  return new Response(blogPostList, {
    headers: { "Content-Type": "application/xml" },
  });
}

export async function HEAD(request) {}

export async function POST(request) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) {}
