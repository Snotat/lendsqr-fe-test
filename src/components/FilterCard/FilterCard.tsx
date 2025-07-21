'use client';

import React, { useState, FormEvent, useEffect, useMemo } from 'react';
import styles from './filtercard.module.scss'; 
import calendar from '../../assets/icons/calendar.png'
import { GoChevronDown, GoOrganization } from "react-icons/go";
import { UserType } from '../../types/UserTypes';
import { getUsers } from '../../API/getUsers';
interface FilterFormState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}



interface FilterCardProp{
  allUser:UserType[],
onFilterChange:(filteredUsers: UserType[]) => void,
onOpenFilter:(x:boolean)=>void
}
const FilterCard: React.FC<FilterCardProp>= ({allUser,onFilterChange, onOpenFilter})=> {

  const [filters, setFilters] = useState<FilterFormState>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });



const formatDate= (dateString: string): string => {
  if (!dateString) {
    return ""; 
  }

  let date: Date;
  try {
    date = new Date(dateString);
    if (isNaN(date.getTime())) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        date = new Date(year, month, day);
      } else {
        return "";
      }
    }
  } catch (error) {
    console.error(`Error parsing date string "${dateString}":`, error);
    return "";
  }
  if (isNaN(date.getTime())) {
    return "";
  }const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0'); 
  return `${year}-${month}-${day}`;
};
const [userData, setUserData]= useState<UserType|any>()
  useEffect(() => {
    const fetchAndSetUsers = async () => {
   
      try {
        const users = await getUsers();
        setUserData(users);
      } catch (err: any) {
        console.error('Failed to fetch users in MainDash:', err);
      }
    };

    fetchAndSetUsers();
  }, [onOpenFilter]);
const currentFilteredData = useMemo(() => {
let tempFilteredUsers:any[] =userData
  if (filters.organization) {
    
  console.log('organizationssss', filters.organization,tempFilteredUsers)
    tempFilteredUsers = tempFilteredUsers?.filter(data =>
      data.educationAndEmployment.organizationName.toLowerCase() ===filters.organization.toLowerCase()
    );
  }

  if (filters.username) {
    console.log('name', filters.username,tempFilteredUsers)
    tempFilteredUsers = tempFilteredUsers.filter(data =>
      data.personalInformation.fullName.toLowerCase().includes(filters.username.toLowerCase())
    );
  }
  if (filters.date) {
    console.log('date',filters.date,tempFilteredUsers)
    const filterDateFormatted = formatDate(filters.date);
    tempFilteredUsers = tempFilteredUsers.filter(data =>
      formatDate(data.userDetails.dateJoined) === filterDateFormatted
    );
  }

  if (filters.email) {
    console.log('email', filters.email,tempFilteredUsers)
    tempFilteredUsers = tempFilteredUsers.filter(data =>
      data.personalInformation.emailAddress.toLowerCase().includes(filters.email.toLowerCase())
    );
  }

  if (filters.phoneNumber) {
    console.log('phone', filters.phoneNumber,tempFilteredUsers)
    tempFilteredUsers = tempFilteredUsers.filter(data =>
      data.personalInformation.phoneNumber.includes(filters.phoneNumber)
    );
  }

  if (filters.status) { 
    console.log('status', filters.status,tempFilteredUsers )
    tempFilteredUsers = tempFilteredUsers.filter(data =>
      data.userDetails.userStatus.toLowerCase() === filters.status.toLowerCase()
    );
  }
  console.log('tempFilteredUsers', tempFilteredUsers)
  return tempFilteredUsers;

}, [allUser, filters]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
  onFilterChange(currentFilteredData);
    onOpenFilter(false);
    
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
    onOpenFilter(false);
    setFilters({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  })
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
