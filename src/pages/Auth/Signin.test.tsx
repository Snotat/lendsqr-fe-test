import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers like toBeInTheDocument
import SignIn from './SignIn'; // The component to test
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'; // For testing navigation

// --- Mocks ---
// Mock image imports
jest.mock('../../assets/images/logo.png', () => 'mock-logo.png');
jest.mock('../../assets/images/sign_ill_trimmed_bgremoved.png', () => 'mock-illustration.png');
jest.mock('../../assets/images/lendsqr.png', () => 'mock-lendsqr-logo.png');

// Mock Spinner component
jest.mock('../../components/Spinner/Spinner', () => ({
  __esModule: true,
  Spinner: () => <div data-testid="mock-spinner"></div>,
}));

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: jest.fn(), // Mock the entire toast object
}));

// Mock framer-motion components to avoid complex animation rendering in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    img: ({ children }: { children: React.ReactNode }) => <img />,
  },
}));

// Mock react-icons
jest.mock('react-icons/io5', () => ({
  IoCheckmarkDoneCircle: () => <svg data-testid="success-icon" />,
}));
jest.mock('react-icons/bi', () => ({
  BiSolidErrorCircle: () => <svg data-testid="error-icon" />,
}));

// Mock Audio constructor and its play method
const mockPlay = jest.fn();
jest.spyOn(window, 'Audio').mockImplementation(() => ({
  play: mockPlay,
} as unknown as any)); // Type cast to Audio

// Mock setTimeout for controlling async operations
jest.useFakeTimers(); // Use Jest's fake timers

describe('SignIn Component - Minimal Tests', () => {
  // Helper to render SignIn within a router context
  const renderSignInWithRouter = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<div data-testid="dashboard-page-content">Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    jest.runOnlyPendingTimers(); // Clear any pending timers from previous tests
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Ensure all timers are cleared after each test
    jest.useRealTimers(); // Restore real timers after each test
  });

  // Test 1: Renders essential form elements
  test('should render email and password inputs and a login button', () => {
    renderSignInWithRouter('/login');

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/show/i)).toBeInTheDocument(); // Password toggle
  });

  // Test 2: Toggles password visibility
  test('should toggle password input type when SHOW/HIDE is clicked', () => {
    renderSignInWithRouter('/login');

    const passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
    const toggleButton = screen.getByText(/show/i);

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  // Test 3: Displays error toast for invalid email on submit
  test('should show error toast for invalid email on submit', async () => {
    renderSignInWithRouter('/login');

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } }); // Valid password length
    fireEvent.click(loginButton);

    // Advance timers to allow toast to appear
    jest.runAllTimers();

    expect(jest.mocked(require('sonner').toast)).toHaveBeenCalledWith(
      'Please, Fill in a Proper Email Address',
      expect.any(Object) // Check that it was called with an object for icon
    );
    expect(mockPlay).toHaveBeenCalledTimes(1); // Check if failure sound played
  });

  // Test 4: Successful login redirects to dashboard and shows success toast
  test('should navigate to dashboard and show success toast on valid credentials', async () => {
    renderSignInWithRouter('/login');

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    // Enter valid (mocked) credentials
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } }); // Any valid format will pass regex
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    // Advance timers to simulate the setTimeout delay
    jest.advanceTimersByTime(3000); // Advance by 3 seconds

    // Wait for navigation and toast to appear
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page-content')).toBeInTheDocument();
    });

    expect(jest.mocked(require('sonner').toast)).toHaveBeenCalledWith(
      'Success! You would be redirected to your dashboard.',
      expect.any(Object)
    );
    expect(mockPlay).toHaveBeenCalledTimes(1); // Check if success sound played
  });
});