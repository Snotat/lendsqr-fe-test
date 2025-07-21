import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import Pagination from './Pagination'; // The component to test
import styles from './Pagination.module.scss'
// --- Mocks ---
// Mock react-icons
jest.mock('react-icons/lu', () => ({
  LuChevronLeft: () => <svg data-testid="chevron-left-icon" />,
  LuChevronRight: () => <svg data-testid="chevron-right-icon" />,
}));

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn(); // Mock the onPageChange callback

  beforeEach(() => {
    mockOnPageChange.mockClear(); // Clear mock calls before each test
  });

  // Test Case 1: Renders correctly with few pages (less than maxPagesToShow)
  test('should render all page numbers when totalPages is small', () => {
    render(
      <Pagination currentPage={1} totalPages={4} onPageChange={mockOnPageChange} />
    );
  
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument(); // No ellipses
  });

  // Test Case 2: Renders correctly with many pages - currentPage at start
  test('should render correct page numbers and ellipses when totalPages is large and currentPage is at start', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument(); // Based on your logic
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1); // Should have ellipses
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument(); // totalPages - 1
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument(); // totalPages
  });

  // Test Case 3: Renders correctly with many pages - currentPage in middle
  test('should render correct page numbers and ellipses when totalPages is large and currentPage is in middle', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1); // Should have ellipses
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument(); // Current page
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument(); // totalPages - 1
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument(); // totalPages
  });

  // Test Case 4: Renders correctly with many pages - currentPage near end
  test('should render correct page numbers and ellipses when totalPages is large and currentPage is near end', () => {
    render(
      <Pagination currentPage={9} totalPages={10} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1); // Should have ellipses
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument(); // Current page
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument(); // totalPages
  });

  // Test Case 5: Calls onPageChange when a page number button is clicked
  test('should call onPageChange with the correct page number when a page button is clicked', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );
  });

  // Test Case 6: Calls onPageChange with currentPage - 1 when left arrow is clicked
  test('should call onPageChange with currentPage - 1 when left arrow is clicked', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );

  });

  // Test Case 7: Calls onPageChange with currentPage + 1 when right arrow is clicked
  test('should call onPageChange with currentPage + 1 when right arrow is clicked', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );

  });

  // Test Case 8: Left arrow is disabled on the first page
  test('should disable the left arrow button on the first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );

  });

  // Test Case 9: Right arrow is disabled on the last page
  test('should disable the right arrow button on the last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />
    );
});

  // Test Case 10: Active page number has the active class
  test('should apply active class to the current page number', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const page3Button = screen.getByRole('button', { name: '3' });
    const page1Button = screen.getByRole('button', { name: '1' });

    expect(page3Button).toHaveClass(styles.active);
    expect(page1Button).not.toHaveClass(styles.active);
  });
});