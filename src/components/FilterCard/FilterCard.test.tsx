import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterCard from './FilterCard'; 
import { UserType } from '../../types/UserTypes';
jest.mock('../../assets/icons/calendar.png', () => ({
  default: 'calendar-icon.png', 
}));

jest.mock('react-icons/go', () => ({
  GoChevronDown: () => <svg data-testid="chevron-down-icon" />,
  GoOrganization: () => <svg data-testid="organization-icon" />,
}));

const mockUsers: UserType[] = [
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
];

describe('FilterCard', () => {
  const mockOnFilterChange = jest.fn(); // Mock the onFilterChange callback
  const mockOnOpenFilter = jest.fn();   // Mock the onOpenFilter callback

  // Clear mocks before each test to ensure tests are independent
  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnOpenFilter.mockClear();
  });



  // Test Case 2: Updates filter state on input change
  test('updates filter state when input fields change', () => {
    render(<FilterCard allUser={mockUsers} onFilterChange={mockOnFilterChange} onOpenFilter={mockOnOpenFilter} />);

    const usernameInput = screen.getByPlaceholderText(/user/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput).toHaveValue('testuser');

    const organizationSelect = screen.getByLabelText(/organization/i);
    fireEvent.change(organizationSelect, { target: { value: 'Lendsqr' } });
    expect(organizationSelect).toHaveValue('Lendsqr');

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput).toHaveValue('2023-01-01');
  });

  // Test Case 3: Filters by Organization and calls onFilterChange
  test('filters by organization and calls onFilterChange with correct users', async () => {
    render(<FilterCard allUser={mockUsers} onFilterChange={mockOnFilterChange} onOpenFilter={mockOnOpenFilter} />);

    const organizationSelect = screen.getByLabelText(/organization/i);
    const filterButton = screen.getByRole('button', { name: /filter/i });

    fireEvent.change(organizationSelect, { target: { value: 'Lendsqr' } });
    fireEvent.click(filterButton);

   
    mockOnFilterChange.mockClear();
    mockOnOpenFilter.mockClear();
    fireEvent.change(organizationSelect, { target: { value: 'NonExistentOrg' } });
    fireEvent.click(filterButton);


  });

  // Test Case 4: Filters by Status and calls onFilterChange
  test('filters by status and calls onFilterChange with correct users', async () => {
    render(<FilterCard allUser={mockUsers} onFilterChange={mockOnFilterChange} onOpenFilter={mockOnOpenFilter} />);

    const statusSelect = screen.getByLabelText(/status/i);
    const filterButton = screen.getByRole('button', { name: /filter/i });

    // Positive Scenario: Filter by 'Pending'
    fireEvent.change(statusSelect, { target: { value: 'Pending' } });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith([mockUsers[1]]);
    });

    // Negative Scenario: Filter by status with no matching users
    mockOnFilterChange.mockClear();
    mockOnOpenFilter.mockClear();
    fireEvent.change(statusSelect, { target: { value: 'Blacklisted' } }); // Assuming no blacklisted users in mockData
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith([]);
    });
  });

  // Test Case 5: Applies multiple filters cumulatively
  test('applies multiple filters cumulatively and calls onFilterChange', async () => {
    render(<FilterCard allUser={mockUsers} onFilterChange={mockOnFilterChange} onOpenFilter={mockOnOpenFilter} />);

    const organizationSelect = screen.getByLabelText(/organization/i);
    const statusSelect = screen.getByLabelText(/status/i);
    const filterButton = screen.getByRole('button', { name: /filter/i });

    fireEvent.change(organizationSelect, { target: { value: 'Lendsqr' } });
    fireEvent.click(filterButton);
    mockOnFilterChange.mockClear(); 
    fireEvent.change(statusSelect, { target: { value: 'Inactive' } });
    fireEvent.click(filterButton);
    mockOnFilterChange.mockClear();
    mockOnOpenFilter.mockClear();
    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith([]);
    });
  });

  test('reset button clears all filters and calls onFilterChange with all users', async () => {
    render(<FilterCard allUser={mockUsers} onFilterChange={mockOnFilterChange} onOpenFilter={mockOnOpenFilter} />);

    const usernameInput = screen.getByPlaceholderText(/user/i);
    const organizationSelect = screen.getByLabelText(/organization/i);
    const resetButton = screen.getByRole('button', { name: /reset/i });

    fireEvent.change(usernameInput, { target: { value: 'bob' } });
    fireEvent.change(organizationSelect, { target: { value: 'Irorun' } });
    fireEvent.click(screen.getByRole('button', { name: /filter/i })); 

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith([mockUsers[1]]);
    });
    mockOnFilterChange.mockClear();
    mockOnOpenFilter.mockClear();

    // Click the reset button
    fireEvent.click(resetButton);

    // Assert that input fields are cleared
    expect(usernameInput).toHaveValue('');
    expect(organizationSelect).toHaveValue(''); // Selects usually reset to first option if value is ''
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/date/i)).toHaveValue('');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('');
    expect(screen.getByLabelText(/status/i)).toHaveValue(''); // 

   
  });
});