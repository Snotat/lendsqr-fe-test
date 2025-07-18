import React from 'react';
import styles from './Infocards.module.scss'; 
import icon1 from '../../assets/icons/icon1.png'
import icon2 from '../../assets/icons/icon2.png'
import icon3 from '../../assets/icons/icon3.png'
import icon4 from '../../assets/icons/icon4.png'


interface StatCardProps {
  icon: string; 
  label: string;
  value: number;
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

  return (
    <div className={styles.infocards}>
      <h2 className={styles.title}>Users</h2>
      <div className={styles.plates}>
        {infoData.map((data, index) => (
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
