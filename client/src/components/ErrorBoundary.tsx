import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="min-h-[400px] flex items-center justify-center p-8"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" aria-hidden="true" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                Something went wrong
              </h2>
              <p className="text-white/60 text-base">
                We encountered an unexpected error. Please try refreshing the page or return home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="gap-2"
                data-testid="button-error-retry"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                Try Again
              </Button>
              <Button
                onClick={this.handleGoHome}
                className="gap-2 bg-violet-600 hover:bg-violet-500"
                data-testid="button-error-home"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                Go Home
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left bg-white/5 rounded-lg p-4 text-sm">
                <summary className="cursor-pointer text-white/50 hover:text-white/70">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-red-400 overflow-auto text-xs">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
