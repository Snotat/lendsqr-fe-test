'use client'; 

import React, { useEffect, useRef, useState } from 'react';
import styles from './Maindash.module.scss'; 
import dropDownIcon from '../../assets/icons/Group.png'
import { FiChevronDown } from 'react-icons/fi';
import Pagination from '../Pagination/Pagination';
import usersDataJson from '../../utils/mockUser.json'
import UserMenuCard from '../MenuCard/UserMenuCard';
import FilterCard from '../FilterCard/FilterCard';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { UserType } from '../../types/UserTypes';
import axios from 'axios';
import { getUsers } from '../../API/getUsers';
import { Spinner } from '../Spinner/Spinner';
interface User {
  id: string;
  organization: string;
  user: string;
  email: string;
  phoneNumber: string;
  date: string;
  status: 'Inactive' | 'Pending' | 'Blacklisted' | 'Active';
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

const [userIndex, setUserIndex] = useState<number|null>(null)
const [userId, setUserId] = useState<string|null>(null)
   const handleToggleMenu = (index: number, id:string) => {
   userIndex === index?setUserIndex(null):setUserIndex(index)
   setUserId(id)
   console.log('index, id, userId', index, id, userIndex)
  };
const [usersData, setUsersData] = useState<UserType[] | undefined>() 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = usersData?.slice(indexOfFirst, indexOfLast);
const onPageChange =(x:number)=>{
setCurrentPage(x)
}
// useEffect(()=>{
// usersDataJson && setUsersData(usersDataJson)
// usersData && console.log('user data length',usersData?.length)
// },[])
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };


const [selected, setSelected] = useState('')
const [openFilter,setOpenFilter] = useState(false)

const handleFilterChange =(filteredUsers:UserType[])=>{
console.log('open filter change', filteredUsers)
setUsersData(filteredUsers)
}
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
  useEffect(() => {
    const fetchAndSetUsers = async () => {
      setLoading(true);
      setError(false);
      try {
        const users = await getUsers();
        setUsersData(users);
      } catch (err: any) {
        setError(err.message || 'Failed to load users.');
        console.error('Failed to fetch users in MainDash:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetUsers();
  }, []);
if(loading){
  return <div style={{height:'100vh'}}><Spinner/></div>
}
if(error){
  return <h2 style={{width:'100%', display:'flex', alignItems:'center', textAlign:'center', justifyContent:'center', height:'90vh', color:'red', flexDirection:'column'}}><p>An error occured,</p>  <p>please check you internet connection and refresh!</p></h2>
}
return (
    <div style={{position:'relative', paddingBottom:'250px'}}  className={styles.main_dash}>
         {openFilter&& <FilterCard onOpenFilter={()=>setOpenFilter(false)} allUser={usersData||[]} onFilterChange={handleFilterChange}  />}
        <div className={styles.table_wrapper_out}></div>
      <div className={styles.table_wrapper}>
        <table style={{position:'relative'}} className={styles.table}>
                  
        {userIndex && <UserMenuCard index={(itemsPerPage*currentPage)-userIndex}  id={userId||null} />}  
          <thead>
            <tr>
              <th>ORGANIZATION <span onClick={()=>setOpenFilter(!openFilter)} className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>USER <span onClick={()=>setOpenFilter(!openFilter)} className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>EMAIL <span onClick={()=>setOpenFilter(!openFilter)} className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>PHONE NUMBER <span onClick={()=>setOpenFilter(!openFilter)} className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>DATE JOINED <span onClick={()=>setOpenFilter(!openFilter)} className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th>STATUS <span onClick={()=>setOpenFilter(!openFilter)}  className={styles.sort_icon}><img src={dropDownIcon} alt="" /></span></th>
              <th></th> 
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user, index) => (
              <tr onClick={()=>setSelected(user.personalInformation.id)} key={user.personalInformation.id}
              style={{backgroundColor:selected===user.personalInformation.id?"#f5f5f5":'', position:'relative'}}
            
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
                handleToggleMenu((itemsPerPage*currentPage)-index, user.personalInformation.id);
              }} aria-label="More options">
                   <HiOutlineDotsVertical className='more_options_menu_icon' />
                  </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.cards_wrapper}>
         <span onClick={()=>setOpenFilter(!openFilter)} style={{width:'fit-content', cursor:'pointer'}} >Filterer <img src={dropDownIcon} alt="" /></span>
           {openFilter&& <FilterCard onOpenFilter={()=>setOpenFilter(false)} allUser={usersData||[]} onFilterChange={handleFilterChange}  />}
        {currentUsers?.map((user, index) => (
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
            <button  onClick={(e) => {
                e.stopPropagation();
                handleToggleMenu((itemsPerPage*currentPage)-index, user.personalInformation.id);
              }} className={styles.more_optionsCard}  aria-label="More options">
             <HiOutlineDotsVertical className='more_options_menu_icon' />
            </button>
                  {itemsPerPage-(userIndex||0) ===index && <UserMenuCard index={10000000} id={user.personalInformation.id} />}  
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