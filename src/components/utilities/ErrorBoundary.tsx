import { Component, ReactNode } from "react";
import { SomethingWentWrong } from "@/pages/status-pages/SomethingWentWrong";

interface ErrorBoundaryProps {
    children: ReactNode;
    failure: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }

    render() {
        if (this.state.hasError) {
            return this.props.failure || <SomethingWentWrong/>;
        }

        return this.props.children;
    }
}
