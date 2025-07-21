import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers
import InfoCards from './InfoCards'; // The component to test
import { getUsers } from '../../API/getUsers'; // We will mock thi
import { UserType } from '../../types/UserTypes'; // Adjust path to your UserType

// --- Mocks ---
// Mock the getUsers API call
jest.mock('../../API/getUsers', () => ({
  getUsers: jest.fn(),
}));

// Mock the Spinner component
jest.mock('../Spinner/Spinner', () => ({
  __esModule: true,
  Spinner: () => <div data-testid="mock-spinner">Loading...</div>,
}));

// Mock image imports
jest.mock('../../assets/icons/icon1.png', () => 'mock-icon1.png');
jest.mock('../../assets/icons/icon2.png', () => 'mock-icon2.png');
jest.mock('../../assets/icons/icon3.png', () => 'mock-icon3.png');
jest.mock('../../assets/icons/icon4.png', () => 'mock-icon4.png');

// Mock the InfoPlate component to check the props it receives
jest.mock('./Infocards', () => {
  const actualModule = jest.requireActual('./Infocards');
  return {
    ...actualModule,
    // Mock the InfoPlate named export
    InfoPlate: jest.fn(({ icon, label, value }) => (
      <div data-testid={`info-plate-${label.toLowerCase().replace(/\s/g, '-')}`}>
        <img src={icon} alt={`${label} icon`} />
        <p>{label}</p>
        <h3>{value.toLocaleString()}</h3>
      </div>
    )),
    // Export the default InfoCards component as actual
    default: actualModule.default,
  };
});

// Get the mocked getUsers function
const mockedGetUsers = jest.mocked(getUsers);
// Get the mocked InfoPlate component
const mockedInfoPlate = jest.mocked(require('./Infocards').InfoPlate);

// Mock User Data for testing
const mockUsers: UserType[] = [
  { // User 1: Active, with loans, with savings
    personalInformation: { fullName: 'Alice', phoneNumber: '', id: '', emailAddress: '', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: '', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: 'N1000', loanRepayment: 'N500' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: { userStatus: 'Active', dateJoined: '', tier: 0, accountNumber: '', accountBank: '', accountBalance: '' },
  },
  { // User 2: Pending, no loans, no savings
    personalInformation: { fullName: 'Bob', phoneNumber: '', id: '', emailAddress: '', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: '', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: 'N0', loanRepayment: 'N0' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: { userStatus: 'Pending', dateJoined: '', tier: 0, accountNumber: '', accountBank: '', accountBalance: '' },
  },
  { // User 3: Active, no loans, with savings
    personalInformation: { fullName: 'Charlie', phoneNumber: '', id: '', emailAddress: '', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: '', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: 'N2000', loanRepayment: 'N0' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: { userStatus: 'Active', dateJoined: '', tier: 0, accountNumber: '', accountBank: '', accountBalance: '' },
  },
  { // User 4: Inactive, with loans, no savings
    personalInformation: { fullName: 'Diana', phoneNumber: '', id: '', emailAddress: '', bvn: '', gender: '', maritalStatus: '', children: '', typeOfResidence: '', userAddress: '' },
    educationAndEmployment: { organizationName: '', levelOfEducation: '', employmentStatus: '', sectorOfEmployment: '', durationOfEmployment: '', officeEmail: '', monthlyIncome: '', savings: 'N0', loanRepayment: 'N700' },
    socials: { twitter: '', facebook: '', instagram: '' },
    guarantor: [],
    userDetails: { userStatus: 'Inactive', dateJoined: '', tier: 0, accountNumber: '', accountBank: '', accountBalance: '' },
  },
];

describe('InfoCards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    // Set a default successful mock for getUsers
    mockedGetUsers.mockResolvedValue(mockUsers);
    // Mock localStorage for getUsers caching logic (if used internally)
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
  test('should display loading spinner initially', () => {
    // Make getUsers return a pending promise to keep the loading state active
    mockedGetUsers.mockReturnValueOnce(new Promise(() => {}));
  });

  // Test 2: Hides loading spinner and displays InfoPlate components on successful fetch
  test('should hide loading spinner and display InfoPlate components on successful fetch', async () => {


    // Wait for the loading spinner to disappear
    await waitFor(() => expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument());

  });

  // Test 3: Displays error message on fetch failure
  test('should display error message if fetching users fails', async () => {
    mockedGetUsers.mockRejectedValueOnce(new Error('Failed to fetch data')); // Mock a failed API call



  });


  test('should display all counts as 0 if API returns an empty array', async () => {
    mockedGetUsers.mockResolvedValueOnce([]); 
 

  });
});