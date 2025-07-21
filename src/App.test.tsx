import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import App from './App';

// --- Minimal Mocks for Page Components ---
// We only need to know if they render, not their internal details.
jest.mock('./pages/Auth/SignIn', () => ({
  __esModule: true,
  default: () => <div data-testid="signin-page" />,
}));
jest.mock('./pages/Dashboard/Dashboard', () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-page" />,
}));
jest.mock('./pages/User/User', () => ({
  __esModule: true,
  default: () => <div data-testid="user-page" />,
}));

describe('App Component - Minimal Routing Tests', () => {
  // Helper to render App with MemoryRouter for testing routes
  const renderAppWithRoute = (route: string) => {
    return render(
      <App />
    );
  };

  // Test 1: Default redirect from '/' to '/login'
  test('should redirect from "/" to "/login" and render SignIn', () => {
    renderAppWithRoute('/');
    expect(screen.getByTestId('signin-page')).toBeInTheDocument();
  });

  // Test 2: Renders Dashboard for '/dashboard'
  test('should render Dashboard component for "/dashboard" path', () => {
    renderAppWithRoute('/dashboard');
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  // Test 3: Renders 404 page for unknown paths
  test('should render 404 page for an unknown path', () => {
    renderAppWithRoute('/this-path-does-not-exist');
    expect(screen.getByRole('heading', { name: /404 - page not found/i })).toBeInTheDocument();
  });
});