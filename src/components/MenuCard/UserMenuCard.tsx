import React, { useEffect, useState } from 'react'
import styles from '../MenuCard/Usermenucard.module.scss'
import { PiEye } from "react-icons/pi";
import viewIcon from '../../assets/icons/view.png'
import activateIcon from '../../assets/icons/activate.png'
import blacklistIcon from '../../assets/icons/blacklist.png'
import UserMenuCardPortal from '../../UserMenuCardPortal';
import { Link } from 'react-router-dom';

type UserMenuCardProp = {
  index:number,
  id:string|null
}

const UserMenuCard = ({index, id}:UserMenuCardProp) => {
  const [position, setPosition] = useState(0)
useEffect(()=>{
console.log('position and index',position, index)
setPosition((index*63)+126 )
if (index ===10000000){
setPosition(35)
}
else if(index < 7){
  setPosition((index*63)+126 )
}else{

  setPosition((index*63)-63 )
}
}
,[index,position])
  return (
    <div className={styles.user_menu_card} style={{top:`${position}px`} }>
<Link to={'/userdetails/'+id}>
  <img src={viewIcon} alt="View Icon" /> 
  <p>View Details</p>
</Link>
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