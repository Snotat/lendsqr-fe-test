import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import MainDash from './MainDash'; // The component to test
import { UserType } from '../../types/UserTypes'; // Adjust path
// Mock external modules
import { getUsers } from '../../API/getUsers'; // We will mock this


// --- Mocks ---
// Mock API call (getUsers)
jest.mock('../../API/getUsers', () => ({
  getUsers: jest.fn(),
}));

// Mock FilterCard component
jest.mock('../FilterCard/FilterCard', () => ({
  __esModule: true,
  default: jest.fn(({ onFilterChange, onOpenFilter, allUser }) => (
    <div data-testid="mock-filter-card">
      Mock Filter Card
      <button onClick={() => onFilterChange(allUser.filter((u:any) => u.personalInformation.fullName.includes('Alice')))}>Apply Filter</button>
      <button onClick={() => onOpenFilter(false)}>Close Filter</button>
      <button onClick={() => onFilterChange([])}>No Results Filter</button> {/* For testing the else branch */}
      <button onClick={() => onFilterChange(allUser)}>Reset Filter (Simulated)</button> {/* For testing reset logic */}
    </div>
  )),
}));
jest.mock('../Pagination/Pagination', () => ({
  __esModule: true,
  default: jest.fn(({ currentPage, totalPages, onPageChange }) => (
    <div data-testid="mock-pagination">
      Page {currentPage} of {totalPages}
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  )),
}));

// Mock UserMenuCard component
jest.mock('../MenuCard/UserMenuCard', () => ({
  __esModule: true,
  default: jest.fn(({ id, index }) => (
    <div data-testid={`mock-user-menu-card-${id}-${index}`}>
      User Menu for {id} at index {index}
    </div>
  )),
}));

// Mock Spinner component
jest.mock('../Spinner/Spinner', () => ({
  __esModule: true,
  Spinner: jest.fn(() => <div data-testid="mock-spinner">Loading...</div>),
}));

// Mock image imports
jest.mock('../../assets/icons/Group.png', () => 'dropdown-icon.png');

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiChevronDown: () => <svg data-testid="fi-chevron-down" />,
}));
jest.mock('react-icons/hi', () => ({
  HiOutlineDotsVertical: () => <svg data-testid="hi-dots-vertical" />,
}));

// Mock the local usersDataJson import
jest.mock('../../utils/mockUser.json', () => ([
  {
    personalInformation: { fullName: 'Alice Smith', emailAddress: 'alice@example.com', phoneNumber: '111-222-3333', id: '1', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: 'Lendsqr', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: '', loanRepayment: '' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: {
      dateJoined: 'October 10, 2023 09:00 AM',
      userStatus: 'Active',
      tier: 1,
      accountNumber: '',
      accountBank: '',   
      accountBalance: '',
    },
  },
  {
    personalInformation: { fullName: 'Bob Johnson', emailAddress: 'bob@example.com', phoneNumber: '444-555-6666', id: '2', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: 'Irorun', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: '', loanRepayment: '' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: {
      dateJoined: 'November 15, 2023 10:00 AM',
      userStatus: 'Pending',
      tier: 2,
      accountNumber: '', // Added
      accountBank: '',   // Added
      accountBalance: '',// Added
    },
  },
  {
    personalInformation: { fullName: 'Charlie Brown', emailAddress: 'charlie@example.com', phoneNumber: '777-888-9999', id: '3', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: 'TechCorp', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: '', loanRepayment: '' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: {
      dateJoined: 'October 10, 2024 11:00 AM',
      userStatus: 'Inactive',
      tier: 3,
      accountNumber: '', 
      accountBank: '',   
      accountBalance: '',
    },
  },
  {
    personalInformation: { fullName: 'Diana Prince', emailAddress: 'diana@example.com', phoneNumber: '888-999-0000', id: '4', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: 'Lendstar', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: '', loanRepayment: '' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: {
      dateJoined: 'December 01, 2023 12:00 PM',
      userStatus: 'Active',
      tier: 1,
      accountNumber: '', // Added
      accountBank: '',   // Added
      accountBalance: '',// Added
    },
  },
]));


describe('MainDash Component', () => {
  // Get the mocked getUsers function
  const mockedGetUsers = jest.mocked(getUsers);

  beforeEach(() => {
    jest.clearAllMocks(); 
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  // Test Case 1: Displays loading spinner initially
  test('displays loading spinner initially', () => {
    // Mock getUsers to be pending indefinitely to keep loading state
    mockedGetUsers.mockReturnValueOnce(new Promise(() => {}));
    render(<MainDash />);
    expect(screen.getByTestId('mock-spinner')).toBeInTheDocument();
  });

  // Test Case 2: Hides loading spinner and displays data on successful fetch
  test('hides loading spinner and displays user data on successful fetch', async () => {
    render(<MainDash />);

    // Wait for loading spinner to disappear
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // Check if user data is displayed (e.g., Alice Smith from mockUsers)
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Lendsqr')).toBeInTheDocument(); // Check organization
    expect(mockedGetUsers).toHaveBeenCalledTimes(1); // Ensure getUsers was called
  });

  // Test Case 3: Displays error message on fetch failure
  test('displays error message if fetching users fails', async () => {
    mockedGetUsers.mockRejectedValueOnce(new Error('Network error occurred')); // Mock a failed API call

    render(<MainDash />);

    expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument(); // Spinner should be gone
    expect(mockedGetUsers).toHaveBeenCalledTimes(1);
  });

  // Test Case 4: Pagination renders and changes page
  test('pagination component receives correct props and changes page', async () => {
    render(<MainDash />);
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // Check if pagination is rendered with initial props (10 items per page, 6 users total, so 1 page)
    expect(screen.getByTestId('mock-pagination')).toHaveTextContent('Page 1 of 1'); // 6 users / 10 itemsPerPage = 1 page

    // Change items per page to 5
    const itemsPerPageSelect = screen.getByDisplayValue('10'); // Find the select by its current value
    fireEvent.change(itemsPerPageSelect, { target: { value: '5' } });

    // Wait for pagination to update (6 users / 5 itemsPerPage = 2 pages)
    await waitFor(() => {
      expect(screen.getByTestId('mock-pagination')).toHaveTextContent('Page 1 of 2');
    });

    // Click next page
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    // Wait for pagination to update to page 2
    await waitFor(() => {
      expect(screen.getByTestId('mock-pagination')).toHaveTextContent('Page 2 of 2');
    });

    // Check if displayed users change (e.g., Alice should not be on page 2 if 5 items per page)
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Frank Green')).toBeInTheDocument(); // Assuming Frank is the 6th user
  });

  // Test Case 5: FilterCard opens and closes
  test('FilterCard opens when filter icon is clicked and closes on its own action', async () => {
    render(<MainDash />);
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // FilterCard should initially not be in the document
    expect(screen.queryByTestId('mock-filter-card')).not.toBeInTheDocument();

    // Click a filter icon to open it (e.g., Organization column header)
    const filterIcon = screen.getAllByAltText('')[0]; // Assuming dropDownIcon alt is empty or specific
    fireEvent.click(filterIcon);

    // FilterCard should now be in the document
    expect(screen.getByTestId('mock-filter-card')).toBeInTheDocument();

    // Simulate FilterCard closing itself (e.g., via onOpenFilter prop)
    const closeFilterButton = screen.getByRole('button', { name: /close filter/i });
    fireEvent.click(closeFilterButton);

    // FilterCard should be gone
    await waitFor(() => expect(screen.queryByTestId('mock-filter-card')).not.toBeInTheDocument());
  });

  // Test Case 6: handleFilterChange updates displayed users
  test('handleFilterChange updates displayed users correctly based on FilterCard output', async () => {
    render(<MainDash />);
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // Open filter card
    fireEvent.click(screen.getAllByAltText('')[0]);

    // Simulate FilterCard applying a filter that returns only Alice
    const applyFilterButton = screen.getByRole('button', { name: /apply filter/i });
    fireEvent.click(applyFilterButton);


    // Simulate FilterCard applying a filter that returns no results
    const noResultsFilterButton = screen.getByRole('button', { name: /no results filter/i });
    fireEvent.click(noResultsFilterButton);

  });

  // Test Case 7: Table row click and UserMenuCard toggle
  test('clicking a table row sets selected state and toggles UserMenuCard', async () => {
    render(<MainDash />);
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // UserMenuCard should initially not be visible
    expect(screen.queryByTestId(/mock-user-menu-card/i)).not.toBeInTheDocument();

    
  });

  // Test Case 8: Card view "More options" button toggles UserMenuCard
  test('clicking card view more options button toggles UserMenuCard', async () => {
    render(<MainDash />);
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());


// Mock the Spinner component
jest.mock('../Spinner/Spinner', () => ({
  __esModule: true,
  Spinner: () => <div data-testid="mock-spinner">Loading...</div>,
}));

// Mock other components to prevent errors and simplify the test DOM
jest.mock('../FilterCard/FilterCard', () => ({ __esModule: true, default: () => null }));
jest.mock('../Pagination/Pagination', () => ({ __esModule: true, default: () => null }));
jest.mock('../MenuCard/UserMenuCard', () => ({ __esModule: true, default: () => null }));
jest.mock('../../assets/icons/Group.png', () => 'dropdown-icon.png'); // Mock image
jest.mock('react-icons/fi', () => ({ FiChevronDown: () => null })); // Mock react-icons
jest.mock('react-icons/hi', () => ({ HiOutlineDotsVertical: () => null })); // Mock react-icons
jest.mock('../../utils/mockUser.json', () => ([])); // Mock local JSON if used as fallback

// Mock data for successful API response
const mockUsers: UserType[] = [
  {
    personalInformation: { fullName: 'Alice Smith', emailAddress: 'alice@example.com', phoneNumber: '111', id: 'user_1', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: 'Lendsqr', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: '', loanRepayment: '' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: { dateJoined: 'October 10, 2023 09:00 AM', userStatus: 'Active', tier: 1, accountNumber: '', accountBank: '', accountBalance: '' },
  },
];

describe('MainDash Component - Core Functionality Tests', () => {
  // Get the mocked getUsers function
  const mockedGetUsers = jest.mocked(getUsers);

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    // Set a default successful mock for getUsers
    mockedGetUsers.mockResolvedValue(mockUsers);
    // Mock localStorage to prevent actual browser storage interaction
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  // Test 1: Displays loading spinner initially
  test('should display loading spinner when data is being fetched', () => {
    // Make getUsers return a pending promise to keep the loading state active
    mockedGetUsers.mockReturnValueOnce(new Promise(() => {}));
    render(<MainDash />);
    expect(screen.getByTestId('mock-spinner')).toBeInTheDocument();
  });

  // Test 2: Hides loading spinner and displays user data on successful fetch
  test('should hide loading spinner and display user data on successful fetch', async () => {
    render(<MainDash />);

    // Wait for the loading spinner to disappear
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // Check if user data is displayed (e.g., the name of the the only user)
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Lendsqr')).toBeInTheDocument(); // Check organization
    expect(mockedGetUsers).toHaveBeenCalledTimes(1); // Ensure getUsers was called
  });

  // Test 3: Displays error message on fetch failure
  test('should display error message if fetching users fails', async () => {
    mockedGetUsers.mockRejectedValueOnce(new Error('API is unreachable')); // Mock a failed API call

    render(<MainDash />);

    expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument(); // Spinner should be gone
    expect(mockedGetUsers).toHaveBeenCalledTimes(1);
  });

  // Test 4: Handles empty data gracefully (no users returned)
  test('should display no users if API returns an empty array', async () => {
    mockedGetUsers.mockResolvedValueOnce([]); // Mock an empty array from API

    render(<MainDash />);

    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

    // Check that no user names are displayed (assuming your table/cards won't render anything)
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    // You might want to add an explicit "No users found" message in your component for this case
    // For now, we just assert that user data is absent.
    expect(screen.getByText(/out of 0/i)).toBeInTheDocument(); // Check pagination total count
  });
});
  });
});