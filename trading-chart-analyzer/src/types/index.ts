export interface AnalysisData {
  pair: string;
  timeframe: string;
  trend: string;
  signal: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis: AnalysisData;
  rawResult: string;
}

export interface ApiError {
  error: string;
}

export type AppState = 'upload' | 'loading' | 'results' | 'error';

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
}

export interface AnalysisResultsProps {
  analysis: AnalysisData;
  onNewAnalysis: () => void;
}

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}