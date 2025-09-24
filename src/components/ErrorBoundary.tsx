import React from "react";

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log for debugging in iframe environments
    if (typeof window !== "undefined") {
      try {
        console.error("ErrorBoundary caught: ", error, info);
        if (window.parent && window.parent !== window) {
          window.parent.postMessage(
            {
              type: "ERROR_CAPTURED",
              error: { message: error.message, stack: error.stack, source: "ErrorBoundary" },
              timestamp: Date.now(),
            },
            "*"
          );
        }
      } catch {}
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="max-w-xl">
            <h1 className="text-2xl font-semibold mb-3">Something went wrong.</h1>
            <p className="text-sm text-muted-foreground mb-4">
              The app encountered an error and cannot render. Below is a brief message to help with debugging.
            </p>
            {this.state.error && (
              <pre className="text-left whitespace-pre-wrap break-words rounded-md bg-muted/40 p-4 text-sm">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;