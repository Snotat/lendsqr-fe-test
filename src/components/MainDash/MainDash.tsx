'use client'; 

import React, { useState } from 'react';
import styles from './Maindash.module.scss'; 
import dropDownIcon from '../../assets/icons/Group.png'
import { FiChevronDown, FiChevronsDown } from 'react-icons/fi';

interface User {
  id: string;
  organization: string;
  user: string;
  email: string;
  phoneNumber: string;
  date: string;
  status: 'Inactive' | 'Pending' | 'Blacklisted' | 'Active';
}

const getstatus_badgeClass = (status: User['status']) => {
  switch (status) {
    case 'Active':
      return styles.status_active;
    case 'Pending':
      return styles.status_pending;
    case 'Blacklisted':
      return styles.status_blacklisted;
    case 'Inactive':
      return styles.status_inactive;
    default:
      return '';
  }
};

const mockUsers: User[] = [
  { id: '1', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '2', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '3', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '4', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '1', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '2', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '3', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '4', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '1', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '2', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '3', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '4', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '1', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '2', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '3', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '4', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '1', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '2', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '3', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '4', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },

];

const MainDash: React.FC = () => {
    let users = mockUsers
   let totalUsers = mockUsers.length 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

const [selected, setSelected] = useState('')

  return (
    <div className={styles.main_dash}>
        <div className={styles.table_wrapper_out}></div>
      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ORGANIZATION <span className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>USER <span className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>EMAIL <span className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>PHONE NUMBER <span className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>DATE JOINED <span className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>STATUS <span className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th></th> 
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr onClick={()=>setSelected(user.id)} key={user.id}
              style={{backgroundColor:selected===user.id?"#f5f5f5":''}}
              >
                <td>{user.organization}</td>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.date}</td>
                <td>
                  <span className={`${styles.status_badge} ${getstatus_badgeClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className={styles.more_options} aria-label="More options">
                    &#x22EE; 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.cards_wrapper}>
        {currentUsers.map((user) => (
          <div key={user.id} className={styles.card}>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Organization:</span>
              <span className={styles.card_value}>{user.organization}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>User:</span>
              <span className={styles.card_value}>{user.user}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Email:</span>
              <span className={styles.card_value}>{user.email}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Phone:</span>
              <span className={styles.card_value}>{user.phoneNumber}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Joined:</span>
              <span className={styles.card_value}>{user.date}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Status:</span>
              <span className={`${styles.status_badge} ${getstatus_badgeClass(user.status)}`}>
                {user.status}
              </span>
            </div>
            <button className={styles.more_optionsCard} aria-label="More options">
              &#x22EE;
            </button>
          </div>
        ))}
      </div>

      <div className={styles.page_bar}>
        <div className={styles.drop_pages}>
          <span>Showing</span>
          <div className={styles.select_div}>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className={styles.drop_select}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select> 
          <FiChevronDown  className={styles.select_icon} /></div>
          <span>out of {totalUsers}</span>

        </div>
      
      </div>
    </div>
  );
};

export default MainDash;
