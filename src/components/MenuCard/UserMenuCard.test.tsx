import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import UserMenuCard from './UserMenuCard'; // The component to test
import { MemoryRouter } from 'react-router-dom'; // For testing Link component

// --- Mocks ---
// Mock image imports
jest.mock('../../assets/icons/view.png', () => 'mock-view-icon.png');
jest.mock('../../assets/icons/activate.png', () => 'mock-activate-icon.png');
jest.mock('../../assets/icons/blacklist.png', () => 'mock-blacklist-icon.png');

// Mock UserMenuCardPortal if it's a wrapper that affects rendering
// Based on the provided code, UserMenuCardPortal is imported but not used to wrap.
// If it's meant to wrap, you might need to adjust your component or mock it like this:
// jest.mock('../../UserMenuCardPortal', () => ({
//   __esModule: true,
//   default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-portal-wrapper">{children}</div>,
// }));


describe('UserMenuCard Component', () => {
  // Helper to render UserMenuCard within a MemoryRouter for Link context
  const renderUserMenuCard = (index: number, id: string | null) => {
    return render(
      <MemoryRouter> {/* No initialEntries needed unless we're testing specific route context */}
        <UserMenuCard index={index} id={id} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  // Test 1: Renders all menu options with correct text and images
  test('should render "View Details", "Blacklist User", and "Activate User" options', () => {
    renderUserMenuCard(1, 'user_test_id_1');

    // Check "View Details" link
    const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
    expect(viewDetailsLink).toBeInTheDocument();
    expect(screen.getByAltText('View Icon')).toBeInTheDocument();

    // Check "Blacklist User" option
    expect(screen.getByText('Blacklist User')).toBeInTheDocument();
    expect(screen.getByAltText('Activate User')).toBeInTheDocument(); // Note: Your alt text for blacklistIcon is 'Activate User' in the code. Consider changing it to 'Blacklist User' for clarity.

    // Check "Activate User" option
    expect(screen.getByText('Activate User')).toBeInTheDocument();
    // Assuming the same activateIcon is used for both, which is fine for rendering check
  });

  // Test 2: "View Details" link navigates to the correct user details path
  test('should link "View Details" to the correct user details path', () => {
    const testId = 'user_abc_123';
    renderUserMenuCard(1, testId);

    const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
    expect(viewDetailsLink).toHaveAttribute('href', `/userdetails/${testId}`);
  });

  test('should handle null ID for view details link', () => {
    renderUserMenuCard(1, null);
    const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
    expect(viewDetailsLink).toHaveAttribute('href', '/userdetails/null');
  });
});
