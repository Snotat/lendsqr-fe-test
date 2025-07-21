import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import Dashboard from './Dashboard'; // The component to test

// --- Mocks ---
// Mock all child components to isolate the Dashboard component's logic.
// We'll give them data-testid attributes to easily find them in the test DOM.
jest.mock('../../components/NavBar', () => ({
  __esModule: true,
  // Mock NavBar to accept its props and allow us to simulate interactions
  default: jest.fn(({ openSidebar, sidebar }) => (
    <nav data-testid="mock-nav-bar">
      <button onClick={openSidebar} data-testid="navbar-toggle-button">
        Toggle Sidebar ({sidebar ? 'Open' : 'Closed'})
      </button>
    </nav>
  )),
}));

jest.mock('../../components/SideBar/SideBar', () => ({
  __esModule: true,
  // Mock SideBar to accept its 'open' prop
  default: jest.fn(({ open }) => (
    <aside data-testid="mock-side-bar" data-sidebar-open={open} />
  )),
}));

jest.mock('../../components/InfoCards/InfoCards', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-info-cards" />,
}));

jest.mock('../../components/MainDash/MainDash', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-main-dash" />,
}));

// FilterCard is imported in MainDash, not directly in Dashboard, so no need to mock here.

describe('Dashboard Page Component', () => {
  // Clear all mocks before each test to ensure test isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders all child components
  test('should render NavBar, SideBar, InfoCards, and MainDash components', () => {
    render(<Dashboard />);
 expect(screen.getByTestId('mock-info-cards')).toBeInTheDocument();
    expect(screen.getByTestId('mock-main-dash')).toBeInTheDocument();
  });


});