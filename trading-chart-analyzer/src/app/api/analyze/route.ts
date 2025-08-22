import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Analyze the image using OpenAI Vision
    const analysis = await analyzeChartImage(base64Image, file.type);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing chart:', error);
    return NextResponse.json(
      { error: 'Failed to analyze chart' },
      { status: 500 }
    );
  }
}

async function analyzeChartImage(base64Image: string, mimeType: string) {
  const prompt = `
    Analyze this trading chart screenshot and extract the following information in the exact format specified:

    1. PAIR: The trading pair shown on the chart (e.g., BTC/USDT, EUR/USD, ETH/BTC)
    2. TIMEFRAME: The time interval of the chart (e.g., M1, M5, M15, M30, H1, H4, D1, W1)
    3. TREND: The overall trend direction (Bullish, Bearish, or Sideways)
    4. SIGNAL: The predicted direction for the next candle (UP or DOWN)

    IMPORTANT: Return ONLY the result in this exact format:
    PAIR: "BTC/USDT"
    TIMEFRAME: "H1"
    TREND: "Bullish"
    SIGNAL: "UP"

    If you cannot detect any of these elements, use "Unknown" for that field.
    Be precise and only return the specified format with no additional text.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 150,
  });

  const result = response.choices[0]?.message?.content?.trim();
  
  if (!result) {
    throw new Error('No analysis result received');
  }

  // Parse the result into structured data
  const lines = result.split('\n');
  const analysis: Record<string, string> = {};

  lines.forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      // Remove quotes from value
      analysis[key] = value.replace(/"/g, '');
    }
  });

  return {
    success: true,
    analysis: {
      pair: analysis.PAIR || 'Unknown',
      timeframe: analysis.TIMEFRAME || 'Unknown',
      trend: analysis.TREND || 'Unknown',
      signal: analysis.SIGNAL || 'Unknown',
    },
    rawResult: result,
  };
}