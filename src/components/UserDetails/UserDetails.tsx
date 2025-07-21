import React, { useEffect, useState } from 'react';
import styles from './Userdetails.module.scss';
import left_arrow from '../../assets/icons/left_arrow.png'
import user_icon from '../../assets/icons/user_icon.png'
import empty_star from '../../assets/icons/empty_star.png'
import fill_star from '../../assets/icons/fill_star.png'
import { Link, useParams } from 'react-router-dom';
import MockedUser from '../../utils/mockUser.json'
import { UserType } from '../../types/UserTypes';
import { getUsers } from '../../API/getUsers';
import { Spinner } from '../Spinner/Spinner';



const UserDetails: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>();
  const [user, setUser] = useState<UserType[]>();
  const [activeTab, setActiveTab] = useState<string>('General Details');

let {id} = useParams()

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
  useEffect(() => {
    const fetchAndSetUsers = async () => {
      setLoading(true);
      setError(false);
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err: any) {
        setError(err.message || 'Failed to load users.');
        console.error('Failed to fetch users in MainDash:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetUsers();
  }, []);

useEffect(()=>{
  // setUsers(MockedUser)
let idFound = users?.filter(res=>{
 return res.personalInformation.id ===id
})
setUser(idFound)
},[users,id])

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

const StarRating: React.FC<{tier:number}> = ({ tier }) => {
  const totalStars = 3;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const isFilled = i <= tier;

    stars.push(
      isFilled ? <img
        key={i}
        src={fill_star }
        alt= 'Fill star' 
        className={styles.starImage}
      />:<img
        key={i}
        src={empty_star }
        alt= 'Empty star' 
        className={styles.starImage}
      />
    );
  }

  return (
    <div className={styles.starRatingContainer} aria-label={`User Tier: ${tier} out of ${totalStars} stars`}>
      {stars}
    </div>
  );
};



  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'General Details':
        return (
             <div className={styles.userGeneralDetails}>
      <section className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.infoFlex}>
          <div className={styles.infoItem}>
            <h4>FULL NAME</h4>
            <p>{user?.[0].personalInformation.fullName}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>PHONE NUMBER</h4>
            <p>{user?.[0].personalInformation.phoneNumber}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>EMAIL ADDRESS</h4>
            <p>{user?.[0].personalInformation.emailAddress}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>BVN</h4>
            <p>{user?.[0].personalInformation.bvn}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>GENDER</h4>
            <p>{user?.[0].personalInformation.gender}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>MARITAL STATUS</h4>
            <p>{user?.[0].personalInformation.maritalStatus}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>CHILDREN</h4>
            <p>{user?.[0].personalInformation.children}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>TYPE OF RESIDENCE</h4>
            <p>{user?.[0].personalInformation.typeOfResidence}</p>
          </div>
        </div>
      </section>
      <section className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>Education and Employment</h3>
        <div className={styles.infoFlex}>
          <div className={styles.infoItem}>
            <h4>LEVEL OF EDUCATION</h4>
            <p>{user?.[0].educationAndEmployment.levelOfEducation}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>EMPLOYMENT STATUS</h4>
            <p>{user?.[0].educationAndEmployment.employmentStatus}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>SECTOR OF EMPLOYMENT</h4>
            <p>{user?.[0].educationAndEmployment.sectorOfEmployment}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>DURATION OF EMPLOYMENT</h4>
            <p>{user?.[0].educationAndEmployment.durationOfEmployment}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>OFFICE EMAIL</h4>
            <p>{user?.[0].educationAndEmployment.officeEmail}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>MONTHLY INCOME</h4>
            <p>{user?.[0].educationAndEmployment.monthlyIncome}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>LOAN REPAYMENT</h4>
            <p>{user?.[0].educationAndEmployment.loanRepayment}</p>
          </div>
        </div>
      </section>
      <section className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>Socials</h3>
        <div className={styles.infoFlex}>
          <div className={styles.infoItem}>
            <h4>TWITTER</h4>
            <p>{user?.[0].socials.twitter}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>FACEBOOK</h4>
            <p>{user?.[0].socials.facebook}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>INSTAGRAM</h4>
            <p>{user?.[0].socials.instagram}</p>
          </div>
        </div>
      </section>
      <section className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>Guarantor</h3>
        <div className={styles.infoFlex}>
          <div className={styles.infoItem}>
            <h4>FULL NAME</h4>
            <p>{user?.[0].guarantor[0].fullName}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>PHONE NUMBER</h4>
            <p>{user?.[0].guarantor[0].phoneNumber}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>EMAIL ADDRESS</h4>
            <p>{user?.[0].guarantor[0].emailAddress}</p>
          </div>
          <div className={styles.infoItem}>
            <h4>RELATIONSHIP</h4>
            <p>{user?.[0].guarantor[0].relationship}</p>
          </div>
        </div>
      </section>
    </div>
        );
      case 'Documents':
        return <div className={styles.tabContent}>Empty</div>;
      case 'Bank Details':
        return <div className={styles.tabContent}>Empty</div>;
      case 'Loans':
        return <div className={styles.tabContent}>Empty</div>;
      case 'Savings':
        return <div className={styles.tabContent}>Empty</div>;
      case 'App and System':
        return <div className={styles.tabContent}>Empty</div>;
      default:
        return null;
    }
  };
if(loading){
  return <div style={{height:'100vh'}}><Spinner/></div>
}
if(error){
  return <h2>An error occurred, please reload!</h2>
}
  return (
    <div className={styles.userDetailsPage}>
      <Link to='/dashboard' className={styles.backNav}>
        <img src={left_arrow} alt="left arrow" />
        <span className={styles.backText}>Back to Users</span>
      </Link>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>User Details</h1>
        <div className={styles.actionButtons}>
          <button className={`${styles.actionButton} ${styles.blacklistButton}`}>BLACKLIST USER</button>
          <button className={`${styles.actionButton} ${styles.activateButton}`}>ACTIVATE USER</button>
        </div>
      </div>
      <div className={styles.userSummaryCard}>
        <div className={styles.userInfoTop}>
          <div className={styles.userAvatar}>
         <img src={user_icon} alt='avatar' />
          </div>
          <div className={styles.userNameId}>
            <h2 className={styles.userName}>{user?.[0].personalInformation.fullName}</h2>
            <p className={styles.userId}>{user?.[0].personalInformation.id.slice(0,10)}</p>
          </div>
          <div className={styles.userTier}>
            <span className={styles.tierLabel}>User's Tier</span>
            <div className={styles.userRating}><StarRating tier={user?.[0].userDetails?.tier||0}/></div>
          </div>
          <div className={styles.accountInfo}>
            <h2 className={styles.accountBalance}>{user?.[0].userDetails.accountBalance}</h2>
            <p className={styles.bankDetails}>{user?.[0].userDetails.accountNumber}/{user?.[0]?.userDetails.accountBank}</p>
          </div>
        </div>

        <div className={styles.tabs}>
          {['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tabContentArea}>
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default UserDetails;