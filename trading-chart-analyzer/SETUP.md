# Trading Chart Analyzer - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

## Features Implemented

✅ **Upload System**
- Drag-and-drop file uploader
- Supports PNG, JPG, JPEG formats
- File validation and size checking

✅ **AI Model Integration**
- OpenAI GPT-4 Vision API integration
- Detects trading pair (BTC/USDT, EUR/USD, etc.)
- Identifies timeframe (M1, M5, H1, H4, D1, etc.)
- Analyzes trend (Bullish, Bearish, Sideways)
- Predicts signal (UP/DOWN)

✅ **Frontend Design**
- React + TailwindCSS
- Glassmorphism design with blurred backgrounds
- Framer Motion animations
- Responsive design (desktop + mobile)
- Modern trading dashboard look

✅ **Backend**
- Next.js API routes
- Secure API key handling (server-side only)
- File upload processing
- Error handling

✅ **Extra Features**
- Loading animations with progress indicators
- Error handling with retry functionality
- "New Analysis" button to reset
- Styled results display
- Production-ready code structure

## API Response Format

The AI returns results in this exact format:
```
PAIR: "BTC/USDT"
TIMEFRAME: "H1"
TREND: "Bullish"
SIGNAL: "UP"
```

## Testing

1. **Demo Chart**: Use the provided `public/demo-chart.svg` for testing
2. **Real Charts**: Upload actual trading chart screenshots
3. **Error Testing**: Try uploading non-image files to test error handling

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Environment Variables Required
- `OPENAI_API_KEY`: Your OpenAI API key

## File Structure

```
src/
├── app/
│   ├── api/analyze/route.ts    # AI analysis endpoint
│   ├── page.tsx                # Main application
│   └── globals.css             # Global styles
├── components/
│   ├── FileUpload.tsx          # Upload component
│   ├── AnalysisResults.tsx     # Results display
│   ├── LoadingSpinner.tsx      # Loading animation
│   └── ErrorMessage.tsx        # Error handling
└── types/
    └── index.ts                # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Security Notes

- API keys are stored server-side only
- No sensitive data exposed to client
- File upload validation implemented
- Error messages don't expose internal details