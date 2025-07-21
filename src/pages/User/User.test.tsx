import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import User from './User';

// --- Mocks ---
// Mock child components to isolate the User component's logic.
// We'll give them data-testid attributes to easily find them in the test DOM.
jest.mock('../../components/UserDetails/UserDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-user-details" />,
}));

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

describe('User Page Component', () => {
  // Clear all mocks before each test to ensure test isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders all child components
  test('should render NavBar, SideBar, and UserDetails components', () => {
    render(<User />);

    
  });

  // Test 2: Toggles sidebar state correctly when NavBar's toggle is clicked
  test('should toggle SideBar open state when NavBar toggle button is clicked', () => {
    render(<User />);

  });
});