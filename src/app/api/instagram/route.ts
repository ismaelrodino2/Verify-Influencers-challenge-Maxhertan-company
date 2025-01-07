import { NextRequest } from "next/server";
import { igApi } from "insta-fetcher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { influencerName, sessionId } = body;

    const ig = new igApi(sessionId as string);

    if (!influencerName) {
      return new Response(
        JSON.stringify({ error: "Influencer name is required" }),
        {
          status: 400,
        }
      );
    }

    const userData = await ig.fetchUser(influencerName);

    const userPosts = await ig.fetchUserPostsV2(influencerName);

    return new Response(
      JSON.stringify({
        user: userData,
        posts: userPosts.edges,
        total: userPosts.edges.length,
        count: userPosts.count,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching Instagram posts:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch Instagram posts",
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
