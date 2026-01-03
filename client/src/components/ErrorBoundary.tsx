import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Envoyer l'erreur à un service de monitoring (Sentry, etc.)
    // if (import.meta.env.PROD) {
    //   // Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertCircle className="h-16 w-16 sm:h-20 sm:w-20 text-[#d4af37] mx-auto mb-4" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffffff] mb-3">
                Une erreur est survenue
              </h1>
              <p className="text-sm sm:text-base text-[#cccccc] mb-6">
                Nous sommes désolés, quelque chose s'est mal passé. Notre équipe a été notifiée
                et travaille sur le problème.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-[#d4af37] hover:underline mb-2">
                    Détails techniques (mode développement)
                  </summary>
                  <div className="bg-[#1a1a1a] border border-[#2d3748] rounded p-4 text-xs text-[#cccccc] overflow-auto max-h-60">
                    <p className="font-bold text-red-400 mb-2">{this.state.error.toString()}</p>
                    {this.state.errorInfo && (
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    )}
                  </div>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleReset} size="lg" className="w-full sm:w-auto">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Retour à l'accueil
                </Button>
                <a href="tel:+41760842089" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full">
                    Nous contacter
                  </Button>
                </a>
              </div>
            </div>

            <p className="text-xs text-[#666666] mt-8">
              Si le problème persiste, contactez-nous au{' '}
              <a href="tel:+41760842089" className="text-[#d4af37] hover:underline">
                076 084 20 89
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
