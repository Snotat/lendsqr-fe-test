import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import SideBar from './SideBar'; // The component to test
import { MemoryRouter } from 'react-router-dom'; // For testing routing context
import styles from './Sidebar.module.scss'
// --- Mocks ---
// Mock image imports
jest.mock('../../assets/icons/briefcase 1.png', () => 'mock-switch-org-icon.png');
jest.mock('../../assets/icons/logout_icon.png', () => 'mock-logout-icon.png');
// Mock icons used in sidebar-data (ensure these paths match your mock sidebarData)
jest.mock('./sidebar-data', () => ({
  sidebarData: [
    {
      title: "Dashboard",
      icon: "dashboard-icon.png",
      link: "/dashboard",
    },
    {
      title: "CUSTOMERS",
      children: [
        {
          title: "Users",
          icon: "users-icon.png",
          link: "/users",
        },
        {
          title: "Guarantors",
          icon: "guarantors-icon.png",
          link: "/guarantors",
        },
      ],
    },
    {
      title: "BUSINESSES",
      children: [
        {
          title: "Organizations",
          icon: "organizations-icon.png",
          link: "/organizations",
        },
      ],
    },
    {
      title: "Settings",
      icon: "settings-icon.png",
      link: "/settings",
    },
  ],
}));

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiChevronDown: () => <svg data-testid="fi-chevron-down-icon" />,
}));

describe('SideBar Component', () => {
  // Helper to render SideBar within a MemoryRouter for routing context
  const renderSideBar = (initialRoute: string, open: boolean = false) => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <SideBar open={open} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  // Test 1: Renders the sidebar in its closed state by default
  test('should render the sidebar in a closed state by default', () => {
    renderSideBar('/dashboard', false);
    const sidebarContainer = screen.getByTestId('mock-side-bar-container'); // Add data-testid to the main div
    expect(sidebarContainer).not.toHaveClass('side_container_open');
  });

  // Test 2: Renders the sidebar in its open state when 'open' prop is true
  test('should render the sidebar in an open state when "open" prop is true', () => {
    renderSideBar('/dashboard', true);
    const sidebarContainer = screen.getByTestId('mock-side-bar-container'); // Add data-testid to the main div
    expect(sidebarContainer).toHaveClass('side_container_open');
  });

  // Test 3: Renders "Switch Organization" section
  test('should render "Switch Organization" section', () => {
    renderSideBar('/dashboard');
    expect(screen.getByText('Switch Organization')).toBeInTheDocument();
    expect(screen.getByAltText('Switch Organization')).toBeInTheDocument();
    expect(screen.getByTestId('fi-chevron-down-icon')).toBeInTheDocument();
  });

  // Test 4: Renders navigation items from sidebarData
  test('should render navigation items from sidebarData', () => {
    renderSideBar('/dashboard');

    // Check parent items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('CUSTOMERS')).toBeInTheDocument();
    expect(screen.getByText('BUSINESSES')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Check child items
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Guarantors')).toBeInTheDocument();
    expect(screen.getByText('Organizations')).toBeInTheDocument();
  });

  // Test 5: Applies active class to the current active link
  test('should apply active class to the current active link', () => {
    renderSideBar('/users'); // Simulate being on the /users path

    const usersLink = screen.getByRole('link', { name: /users/i });
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });

    expect(usersLink).toHaveClass(styles.active); // Check for the active class
    expect(dashboardLink).not.toHaveClass(styles.active); // Ensure other links are not active
  });

  // Test 6: Applies active class for parent path matches (e.g., /users/123 should activate /users)
  test('should apply active class for parent path matches', () => {
    renderSideBar('/users/123'); // Simulate being on a sub-path of /users

    const usersLink = screen.getByRole('link', { name: /users/i });
    expect(usersLink).toHaveClass(styles.active);
  });

  // Test 7: Renders Logout section and version number
  test('should render Logout section and version number', () => {
    renderSideBar('/dashboard');
    expect(screen.getByAltText('Logout Icon')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('v1.2.0')).toBeInTheDocument();
  });
});