import { NextRequest } from "next/server";
import { twitterClient } from "../../../../twitterClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { influencerName, timeRange } = body;

    if (!influencerName) {
      return new Response(JSON.stringify({ error: "Influencer name is required" }), {
        status: 400,
      });
    }

    // Calcula a data baseada no timeRange
    const now = new Date();
    let startTime: Date;
    
    switch (timeRange) {
      case 'last-week':
        startTime = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'last-month':
        startTime = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'last-year':
        startTime = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startTime = new Date(now.setFullYear(now.getFullYear() - 10));
    }

    const startTimeString = startTime.toISOString();

    const tweets = await twitterClient.v2.search(`from:${influencerName} -is:retweet`, {
      'start_time': startTimeString,
      max_results: 5,
      'tweet.fields': ['created_at', 'public_metrics', 'text']
    });

    return new Response(
      JSON.stringify({ tweets: tweets.data }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.error("Error fetching tweets:", err);
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch tweets", 
        details: err instanceof Error ? err.message : String(err) 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
