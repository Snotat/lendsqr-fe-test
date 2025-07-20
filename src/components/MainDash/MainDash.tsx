'use client'; 

import React, { useEffect, useRef, useState } from 'react';
import styles from './Maindash.module.scss'; 
import dropDownIcon from '../../assets/icons/Group.png'
import { FiChevronDown } from 'react-icons/fi';
import Pagination from '../Pagination/Pagination';
import usersDataJson from '../../utils/mockUser.json'
import UserMenuCard from '../MenuCard/UserMenuCard';
import UserMenuCardPortal from '../../UserMenuCardPortal';
import FilterCard from '../FilterCard/FilterCard';
import { HiOutlineDotsVertical } from "react-icons/hi";
interface User {
  id: string;
  organization: string;
  user: string;
  email: string;
  phoneNumber: string;
  date: string;
  status: 'Inactive' | 'Pending' | 'Blacklisted' | 'Active';
}


const mockUsers: User[] = [
  { id: '1', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '2', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '3', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '4', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '5', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '6', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '7', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '8', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '9', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '10', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '11', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '12', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '13', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '14', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '15', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '16', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },
  { id: '17', organization: 'Lendsqr', user: 'Olawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Inactive' },
  { id: '18', organization: 'Lendsqr', user: 'Ola', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Pending' },
  { id: '19', organization: 'Lendsqr', user: 'Wale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Blacklisted' },
  { id: '20', organization: 'Lendsqr', user: 'lawale', email: 'snotatonline@outlook.com', phoneNumber: '09129285031', date: 'July 18, 2025 10:00 AM', status: 'Active' },

];
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
const getstatus_badgeClass = (status: string) => {
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
const MainDash: React.FC = () => {
  const menuButtonRefs = useRef<{ [key: string]: HTMLButtonElement }>({})
  const [openMenuId, setOpenMenuId]=useState<string|null>('')
   const handleToggleMenu = (userId: string) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };
const [usersData, setUsersData] = useState<UserType[] | undefined>(usersDataJson||[]) 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = usersData?.slice(indexOfFirst, indexOfLast);
const onPageChange =(x:number)=>{
setCurrentPage(x)
}
useEffect(()=>{
usersDataJson && setUsersData(usersDataJson)
usersData && console.log('user data length',usersData?.length)
},[])
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };


const [selected, setSelected] = useState('')
const [handleFilter,setHandleFilter] = useState('')

const handleFilterChange =(x:UserType[])=>{

}

  return (
    <div style={{position:'relative', paddingBottom:'250px'}}  className={styles.main_dash}>
          <FilterCard allUser={usersData||[]} onFilterChange={handleFilterChange}  />
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
            {currentUsers?.map((user) => (
              <tr onClick={()=>setSelected(user.personalInformation.id)} key={user.personalInformation.id}
              style={{backgroundColor:selected===user.personalInformation.id?"#f5f5f5":''}}
              >
                <td>{user.educationAndEmployment.organizationName}</td>
                <td>{user.personalInformation.fullName}</td>
                <td>{user.personalInformation.emailAddress}</td>
                <td>{user.personalInformation.phoneNumber}</td>
                <td>{user.userDetails.dateJoined}</td>
                <td>
                  <span className={`${styles.status_badge} ${getstatus_badgeClass(user.userDetails.userStatus)}`}>
                    {user.userDetails.userStatus}
                  </span>
                </td>
                <td style={{position:'relative'}}>
                  <button className={styles.more_options}  onClick={(e) => {
                e.stopPropagation();
                handleToggleMenu(user.personalInformation.id);
              }}aria-label="More options">
                   <HiOutlineDotsVertical className='more_options_menu_icon' />
                  </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.cards_wrapper}>
        {usersData?.map((user) => (
          <div key={user.personalInformation.id} className={styles.card}>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Organization:</span>
              <span className={styles.card_value}>{user.educationAndEmployment.organizationName}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>User:</span>
              <span className={styles.card_value}>{user.personalInformation.fullName}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Email:</span>
              <span className={styles.card_value}>{user.personalInformation.emailAddress}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Phone:</span>
              <span className={styles.card_value}>{user.personalInformation.phoneNumber}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Joined:</span>
              <span className={styles.card_value}>{user.userDetails.dateJoined}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.card_label}>Status:</span>
              <span className={`${styles.status_badge} ${getstatus_badgeClass(user.userDetails.userStatus)}`}>
                {user.userDetails.userStatus}
              </span>
            </div>
            <button className={styles.more_optionsCard} aria-label="More options">
             <HiOutlineDotsVertical className='more_options_menu_icon' />
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
          <FiChevronDown className={styles.select_icon} /></div>
          <span>out of {usersData?.length||0}</span>

        </div>
     <Pagination currentPage={currentPage} totalPages={(usersData&&Math.ceil(usersData?.length/itemsPerPage))||0} onPageChange={onPageChange}/>
      </div> 
    </div>
  );
};
export default MainDash;
