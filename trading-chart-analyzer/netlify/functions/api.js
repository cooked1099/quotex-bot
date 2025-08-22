const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the multipart form data
    const boundary = event.headers['content-type'].split('boundary=')[1];
    const body = event.body;
    
    // Extract the image data from multipart form
    const parts = body.split('--' + boundary);
    let imageData = null;
    let contentType = null;
    
    for (const part of parts) {
      if (part.includes('Content-Type: image/')) {
        const lines = part.split('\r\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('Content-Type: ')) {
            contentType = lines[i].split(': ')[1];
          }
          if (lines[i] === '' && i + 1 < lines.length) {
            // This is the image data
            imageData = lines.slice(i + 1).join('\r\n').replace(/\r\n$/, '');
            break;
          }
        }
        break;
      }
    }

    if (!imageData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No image file provided' })
      };
    }

    // Convert to base64 if needed
    const base64Image = Buffer.from(imageData, 'binary').toString('base64');

    // Analyze the image using OpenAI Vision
    const analysis = await analyzeChartImage(base64Image, contentType);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(analysis)
    };

  } catch (error) {
    console.error('Error analyzing chart:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to analyze chart' })
    };
  }
};

async function analyzeChartImage(base64Image, mimeType) {
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
  const analysis = {};

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