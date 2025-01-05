import React from 'react';
import InAppLayout from '../Layout/InAppLayout';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <InAppLayout>
                    <h1 className="text-4xl uppercase font-bold p-8 text-left">
                        We&apos;ve encountered an error...
                    </h1>
                    <p className="text-lg text-left px-8">
                        Something went wrong. Please try refreshing the page or
                        come back later.
                    </p>
                </InAppLayout>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
