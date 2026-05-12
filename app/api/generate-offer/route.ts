import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Create a compelling offer from this input.

Business type: ${body.businessType}
Target customer: ${body.targetCustomer}
Product or service: ${body.product}
Pain point: ${body.painPoint}
Price range: ${body.priceRange}
Tone: ${body.tone}

Return ONLY valid JSON with:
headline, coreOffer, promise, bullets, instagram, email
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const offer = JSON.parse(response.output_text);

    return NextResponse.json({ offer });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not generate offer" },
      { status: 500 }
    );
  }
}