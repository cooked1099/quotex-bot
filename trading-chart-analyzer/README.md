# Trading Chart Analyzer

A modern, AI-powered trading chart analysis application built with Next.js, React, and TailwindCSS. Upload trading chart screenshots and get instant AI analysis of trading pairs, timeframes, trends, and signals.

## Features

### 🚀 Core Features
- **Drag & Drop Upload**: Modern file upload interface supporting PNG, JPG, JPEG formats
- **AI-Powered Analysis**: Uses OpenAI Vision API to analyze trading charts
- **Real-time Results**: Get instant analysis with detailed insights
- **Responsive Design**: Works perfectly on desktop and mobile devices

### 📊 Analysis Capabilities
- **Trading Pair Detection**: Identifies the trading pair (e.g., BTC/USDT, EUR/USD)
- **Timeframe Recognition**: Detects chart timeframes (M1, M5, H1, H4, D1, etc.)
- **Trend Analysis**: Determines overall market trend (Bullish, Bearish, Sideways)
- **Signal Prediction**: Provides UP/DOWN signals for the next candle

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful blurred backgrounds and soft shadows
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Loading States**: Engaging loading animations with progress indicators
- **Error Handling**: User-friendly error messages with retry functionality

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: OpenAI GPT-4 Vision API
- **Backend**: Next.js API Routes

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trading-chart-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_NAME=Trading Chart Analyzer
   NEXT_PUBLIC_APP_DESCRIPTION=AI-powered trading chart analysis
   ```

4. **Get OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account and get your API key
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload Chart**: Drag and drop or click to upload a trading chart screenshot
2. **AI Analysis**: The system will automatically analyze the chart using AI
3. **View Results**: Get detailed analysis including pair, timeframe, trend, and signal
4. **New Analysis**: Click "Analyze New Chart" to upload another image

## API Endpoints

### POST `/api/analyze`
Analyzes uploaded trading chart images.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field containing the file

**Response:**
```json
{
  "success": true,
  "analysis": {
    "pair": "BTC/USDT",
    "timeframe": "H1",
    "trend": "Bullish",
    "signal": "UP"
  },
  "rawResult": "PAIR: \"BTC/USDT\"\nTIMEFRAME: \"H1\"\nTREND: \"Bullish\"\nSIGNAL: \"UP\""
}
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for chart analysis
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── FileUpload.tsx            # Drag & drop file upload component
│   ├── AnalysisResults.tsx       # Results display component
│   ├── LoadingSpinner.tsx        # Loading animation component
│   └── ErrorMessage.tsx          # Error display component
└── types/                        # TypeScript type definitions
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Application description | No |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## Acknowledgments

- OpenAI for providing the Vision API
- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Framer Motion for smooth animations
