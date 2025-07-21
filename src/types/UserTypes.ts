
export interface PersonalInformation {
  fullName: string;
  phoneNumber: string;
  id: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  userAddress: string;
}

export interface EducationAndEmployment {
  organizationName: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string; 
  savings: string; 
  loanRepayment: string; 
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface UserDetails {
  userStatus: 'Active' | 'Pending' | 'Inactive' | string;
    accountNumber: string;
  accountBank: string;
  accountBalance: string;
  tier: number; 
  dateJoined: string;
}

export interface UserType {
  personalInformation: PersonalInformation;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor[]; 
  userDetails: UserDetails;
}

export interface SidebarItem {
  title: string;
  icon?: any;
  link?: string;
  children?: SidebarItem[];
}