'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import styles from './filtercard.module.scss'; 
import calendar from '../../assets/icons/calendar.png'
import { GoChevronDown } from "react-icons/go";
import usersData from '../../utils/mockUser.json'
interface FilterFormState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}
interface UserFilterFormProps {
  onFilter: (filters: FilterFormState) => void; 
  onReset: () => void;
}
interface PersonalInformation {
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

interface EducationAndEmployment {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  organizationName:string;
  monthlyIncome: string;
  savings:string
  loanRepayment: string;
}
interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}
interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}
interface UserDetails {
  userStatus: string;
  dateJoined: string;
}
interface UserType {
  personalInformation: PersonalInformation;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor[];
  userDetails: UserDetails;
}

interface FilterProp {
  organization?:string,
  username?:string,
  email?:string,
  date?:string,
  phone?: string,
  status?:string
  
}


interface FilterCardProp{
  allUser:UserType[],
onFilterChange:(filteredUsers: UserType[]) => void;
}
const FilterCard: React.FC<FilterCardProp>= ({allUser,onFilterChange})=> {

const [FilteredData, setFilteredData] = useState()
  const [filters, setFilters] = useState<FilterFormState>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });


  const [filterOrganization, setFilterOrganization] =useState<UserType>()
  const [filterUsername, setUsername] =useState<UserType>()
  const [filterEmail, setEmail] =useState<UserType>()
  const [filterDate, setDate] =useState<UserType>()
  const [filterStatus, setFilterStatus] =useState<UserType>()
  const [totalFilter, setTotalFilter] = useState<UserType>()
  useEffect(()=>{
    
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Applying filters:', filters);
  };

  const handleReset = () => {
    const initialFilters: FilterFormState = {
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    };
    setFilters(initialFilters);
  };

  return (
    <div className={styles.filterFormContainer}>
      <form onSubmit={handleFilterSubmit} className={styles.filterForm}>
        <div className={styles.formGroup}>
          <label htmlFor="organization" className={styles.label}>Organization</label>
          <div className={styles.selectWrapper}>
            <select
              id="organization"
              name="organization"
              value={filters.organization}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
              <option value="Lendstar">Lendstar</option>
            </select>
            <span className={styles.selectArrow} ><GoChevronDown className={styles.filter_down_arrow}/></span> 
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User"
            value={filters.username}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>Date</label>
          <div className={styles.dateInputWrapper}>
            <input
              type="date"
              id="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className={styles.input}
            />
            <span className={styles.calendarIcon}>
             <img src={calendar} alt="calendar icon" />
            </span>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <div className={styles.selectWrapper}>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
              <option value="Inactive">Inactive</option>
            </select>
            <span className={styles.selectArrow}><GoChevronDown className={styles.filter_down_arrow} />
              </span> 
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
          <button type="submit" className={styles.filterButton}>
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterCard;
