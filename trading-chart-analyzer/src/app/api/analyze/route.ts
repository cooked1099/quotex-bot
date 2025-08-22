import { NextRequest, NextResponse } from 'next/server';

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

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI analysis - simulate different results based on file name
    const fileName = file.name.toLowerCase();
    let analysis;

    if (fileName.includes('btc') || fileName.includes('bitcoin')) {
      analysis = {
        pair: 'BTC/USDT',
        timeframe: 'H1',
        trend: 'Bullish',
        signal: 'UP'
      };
    } else if (fileName.includes('eth') || fileName.includes('ethereum')) {
      analysis = {
        pair: 'ETH/USDT',
        timeframe: 'H4',
        trend: 'Bearish',
        signal: 'DOWN'
      };
    } else if (fileName.includes('eur') || fileName.includes('euro')) {
      analysis = {
        pair: 'EUR/USD',
        timeframe: 'D1',
        trend: 'Sideways',
        signal: 'UP'
      };
    } else {
      // Default analysis
      const pairs = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'DOT/USDT', 'LINK/USDT'];
      const timeframes = ['M5', 'M15', 'H1', 'H4', 'D1'];
      const trends = ['Bullish', 'Bearish', 'Sideways'];
      const signals = ['UP', 'DOWN'];

      analysis = {
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        trend: trends[Math.floor(Math.random() * trends.length)],
        signal: signals[Math.floor(Math.random() * signals.length)]
      };
    }

    const rawResult = `PAIR: "${analysis.pair}"
TIMEFRAME: "${analysis.timeframe}"
TREND: "${analysis.trend}"
SIGNAL: "${analysis.signal}"`;

    return NextResponse.json({
      success: true,
      analysis,
      rawResult,
      note: 'This is a demo version using mock AI analysis. For real AI analysis, add your OpenAI API key.'
    });

  } catch (error) {
    console.error('Error analyzing chart:', error);
    return NextResponse.json(
      { error: 'Failed to analyze chart' },
      { status: 500 }
    );
  }
}