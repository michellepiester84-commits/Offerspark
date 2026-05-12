import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = `
You are an expert offer strategist and conversion copywriter.
Create a clear, compelling offer from this business input.

Business type: ${body.businessType || "Not provided"}
Target customer: ${body.targetCustomer || "Not provided"}
Product or service: ${body.product || "Not provided"}
Main pain point: ${body.painPoint || "Not provided"}
Price range: ${body.priceRange || "Not provided"}
Tone: ${body.tone || "Warm and premium"}

Rules:
- Be specific and commercially useful.
- Avoid hype and vague marketing language.
- Make the offer easy to understand and easy to buy.
- Write in the requested tone.

Return ONLY valid JSON with this exact shape:
{
  "headline": "string",
  "coreOffer": "string",
  "promise": "string",
  "bullets": ["string", "string", "string", "string"],
  "instagram": "string",
  "email": "string"
}
`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const text = response.output_text;
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const offer = JSON.parse(cleaned);

    return NextResponse.json({ offer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not generate offer" }, { status: 500 });
  }
}
