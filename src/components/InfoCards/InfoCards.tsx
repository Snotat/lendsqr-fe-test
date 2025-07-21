import React, { useEffect, useState } from 'react';
import styles from './Infocards.module.scss'; 
import icon1 from '../../assets/icons/icon1.png'
import icon2 from '../../assets/icons/icon2.png'
import icon3 from '../../assets/icons/icon3.png'
import icon4 from '../../assets/icons/icon4.png'
import usersDataJson from '../../utils/mockUser.json'
import { Spinner } from '../Spinner/Spinner';
import { getUsers } from '../../API/getUsers';

interface StatCardProps {
  icon: string; 
  label: string;
  value: number;
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
const InfoPlate: React.FC<StatCardProps> = ({ icon, label, value}) => {

  
  return (
    <div className={styles.plate}>
      <div className={styles.icon} >
        <img src={icon} alt="" />
      </div>
      <p className={styles.text}>{label}</p>
      <h3 className={styles.number}>{value.toLocaleString()}</h3> 
    </div>
  );
};

const InfoCards: React.FC = () => {

  const infoData = [
    {
      icon:icon1,
      label: 'USERS',
      value: 2453,
    },
    {
      icon: icon2,
      label: 'ACTIVE USERS',
      value: 2453,
    },
    {
      icon: icon3,
      label: 'USERS WITH LOANS',
      value: 12453,
    },
    {
      icon: icon4,
      label: 'USERS WITH SAVINGS',
      value: 102453,
    },
  ];
  interface CardDataTypes{
totalUsers:number,
activeUsers:number,
loaningUsers:number,
savingUsers:number
  }
const [cardData, setCardData] = useState<StatCardProps[]>([
    {
      icon:icon1,
      label: 'USERS',
      value: 0,
    },
    {
      icon: icon2,
      label: 'ACTIVE USERS',
      value: 0,
    },
    {
      icon: icon3,
      label: 'USERS WITH LOANS',
      value: 0,
    },
    {
      icon: icon4,
      label: 'USERS WITH SAVINGS',
      value: 0,
    },
  ])
const [usersData, setUsersData] = useState<UserType[] | undefined>()
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
  useEffect(() => {
    const fetchAndSetUsers = async () => {
      setLoading(true);
      setError(false);
      try {
        const users = await getUsers();
        let activeUsers= users?.filter(user=>{
  return user.userDetails.userStatus === 'Active'
})
let loaningUser = users?.filter(user=>{
  return user.educationAndEmployment.loanRepayment!=='N0'
})
let savingUser = users?.filter(user=>{
  return user.educationAndEmployment.savings!=='N0'
})
users &&console.log('usershhh', users?.[0], 'activeUsers',activeUsers?.[0], activeUsers?.length, activeUsers?.[0], "loaningUser", loaningUser?.[0], loaningUser?.length, 'saving users', savingUser?.length, savingUser?.[0])
 setCardData([
     {
      icon:icon1,
      label: 'USERS',
      value: users?.length||0,
    },
    {
      icon: icon2,
      label: 'ACTIVE USERS',
      value: activeUsers?.length ||0,
    },
    {
      icon: icon3,
      label: 'USERS WITH LOANS',
      value: loaningUser?.length||0,
    },
    {
      icon: icon4,
      label: 'USERS WITH SAVINGS',
      value: savingUser?.length||0,
    },
 ])
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
  return <Spinner/>
}
if(error){
  return <h2>An error occured please refresh!</h2>
}
  return (
    <div className={styles.infocards}>
      <h2 className={styles.title}>Users</h2>
      <div className={styles.plates}>
        {cardData.map((data, index) => (
          <InfoPlate
            key={index}
            icon={data.icon}
            label={data.label}
            value={data.value}

          />
        ))}
      </div>
    </div>
  );
};

export default InfoCards;
