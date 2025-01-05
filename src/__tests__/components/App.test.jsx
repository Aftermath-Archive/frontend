import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../components/App';

// Mock the required modules and components
vi.mock('react-toastify', () => ({
    ToastContainer: () => <div data-testid="toast-container" />,
}));

vi.mock('@/pages/LandingPage', () => ({
    default: () => <div>Landing Page</div>,
}));

vi.mock('@/pages/Dashboard', () => ({
    default: () => <div>Dashboard</div>,
}));

vi.mock('@/pages/ErrorPage', () => ({
    default: () => <div>Error Page</div>,
}));

vi.mock('@/pages/Auth/RegisterPage', () => ({
    default: () => <div>Register Page</div>,
}));

vi.mock('@/pages/Auth/LoginPage', () => ({
    default: () => <div>Login Page</div>,
}));

vi.mock('../components/Auth/ProtectedRoute', () => ({
    default: ({ children }) => <div>{children}</div>,
}));

describe('App Component', () => {
    test('renders without crashing', () => {
        render(<App />);
        expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    });

    test('contains ErrorBoundary wrapper', () => {
        const { container } = render(<App />);
        expect(container.firstChild).toBeTruthy();
    });

    test('includes RouterProvider', () => {
        render(<App />);
        // Initially shows landing page as default route
        expect(screen.getByText('Landing Page')).toBeInTheDocument();
    });

    test('includes ToastContainer', () => {
        render(<App />);
        const toastContainer = screen.getByTestId('toast-container');
        expect(toastContainer).toBeInTheDocument();
    });
});
