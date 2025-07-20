import React from 'react'
import styles from '../MenuCard/Usermenucard.module.scss'
import { PiEye } from "react-icons/pi";
import viewIcon from '../../assets/icons/view.png'
import activateIcon from '../../assets/icons/activate.png'
import blacklistIcon from '../../assets/icons/blacklist.png'

const UserMenuCard = () => {
  return (
    <div className={styles.user_menu_card}>
<span>
  <img src={viewIcon} alt="View Icon" /> 
  <p>View Details</p>
</span>
<span>
<img src={blacklistIcon} alt="Activate User" />
<p>Blacklist User</p>
</span>
<span>
<img src={activateIcon} alt="Activate User" />
<p>Activate User</p>
</span>
    </div>
  )
}

export default UserMenuCard