import { NextRequest } from "next/server";
import { igApi } from "insta-fetcher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { influencerName, timeRange, sessionId } = body;

    // Inicializa a API do Instagram com o sessionId recebido do body
    const ig = new igApi(sessionId as string);

    if (!influencerName) {
      return new Response(JSON.stringify({ error: "Influencer name is required" }), {
        status: 400,
      });
    }

    // Primeiro busca os dados do usuário
    const userData = await ig.fetchUser(influencerName);
    
    // Depois busca os posts
    const userPosts = await ig.fetchUserPosts(influencerName);

    // Filtra posts baseado no timeRange
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

    // Filtra os posts usando a estrutura correta (edges)
    const filteredPosts = userPosts.edges
      .map(edge => edge.node) // Pega o node de cada edge
      .filter(post => {
        const postDate = new Date(post.taken_at_timestamp * 1000);
        return postDate >= startTime;
      });

    return new Response(
      JSON.stringify({ 
        user: userData,
        posts: filteredPosts,
        total: filteredPosts.length,
        count: userPosts.count // Total de posts do usuário
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.error("Error fetching Instagram posts:", err);
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch Instagram posts", 
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