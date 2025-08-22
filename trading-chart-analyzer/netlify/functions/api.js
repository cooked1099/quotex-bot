// Mock AI analysis - no OpenAI API key required

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
    let fileName = 'chart.png';
    
    for (const part of parts) {
      if (part.includes('Content-Disposition: form-data; name="image"')) {
        const lines = part.split('\r\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('filename=')) {
            fileName = lines[i].split('filename=')[1].replace(/"/g, '');
            break;
          }
        }
        break;
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI analysis - simulate different results based on file name
    const fileNameLower = fileName.toLowerCase();
    let analysis;

    if (fileNameLower.includes('btc') || fileNameLower.includes('bitcoin')) {
      analysis = {
        pair: 'BTC/USDT',
        timeframe: 'H1',
        trend: 'Bullish',
        signal: 'UP'
      };
    } else if (fileNameLower.includes('eth') || fileNameLower.includes('ethereum')) {
      analysis = {
        pair: 'ETH/USDT',
        timeframe: 'H4',
        trend: 'Bearish',
        signal: 'DOWN'
      };
    } else if (fileNameLower.includes('eur') || fileNameLower.includes('euro')) {
      analysis = {
        pair: 'EUR/USD',
        timeframe: 'D1',
        trend: 'Sideways',
        signal: 'UP'
      };
    } else {
      // Default analysis with random results
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        analysis,
        rawResult,
        note: 'This is a demo version using mock AI analysis. For real AI analysis, add your OpenAI API key.'
      })
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