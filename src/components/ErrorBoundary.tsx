import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-red-500 font-mono p-10 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">⚠️ App Crushed</h1>
                    <p className="text-xl text-white mb-8">Something went wrong.</p>
                    <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl max-w-2xl w-full overflow-auto">
                        <p className="font-bold mb-2">Error:</p>
                        <pre className="text-sm mb-4">{this.state.error?.toString()}</pre>
                        <p className="font-bold mb-2">Stack:</p>
                        <pre className="text-xs opacity-70 whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
                    >
                        Reload App
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                    >
                        Start Fresh (Clear Data)
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
