import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const structuredPrompt = `
      Analyze the following text and return a JSON object in this exact format:
      {
        "trueClaims": number,
        "falseClaims": number,
        "unknownClaims": number
      }
      
      Text to analyze: ${prompt}
    `;

    const result = await model.generateContent(structuredPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw Gemini response:", text);

    let analysis;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : '{}';
      analysis = JSON.parse(jsonString);

      if (!('trueClaims' in analysis) || 
          !('falseClaims' in analysis) || 
          !('unknownClaims' in analysis)) {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Error parsing Gemini response:", err);
      analysis = {
        trueClaims: 0,
        falseClaims: 0,
        unknownClaims: 0
      };
    }

    return new Response(
      JSON.stringify({ analysis }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.error("Error analyzing with Gemini:", err);
    return new Response(
      JSON.stringify({ 
        error: "Failed to analyze claims", 
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