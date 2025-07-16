import styles from '../pages/Dashboard/Dashboard.module.scss'
import {Link} from 'react-router-dom'
import logo from '../assets/images/logo.png'
import lendsqrlogo from '../assets/images/lendsqr.png'
import Bell from '../assets/icons/bell.png'
import ProfilePicture from '../assets/images/profile_picture.png'
import { IoIosSearch } from "react-icons/io";
import { FaCaretDown } from 'react-icons/fa';

type Props = {}

function NavBar({}: Props) {
  return (
    <div className={styles.navbar}>
        <div className={styles.navbar_logo} >
        <img src={logo}  style={{height:'23px', width:'23px'}}  alt="" />
        <img src={lendsqrlogo} alt="" />
       </div > 
       <div className={styles.navbar_right}>
        <div className={styles.nav_input}>
            <input type="text" placeholder='Search for anything'  />
            <button><IoIosSearch className={styles.icons} /></button>
        </div>
        <div className={styles.nav_input_right}>
           
            <Link state={{padding:"0 20px"}} to='/'>Docs</Link>
            <img src={Bell} alt=""/>
            <div className={styles.nav_user}>
            <img src={ProfilePicture} alt="" />
<span>Adedeji</span>
<FaCaretDown />
            </div>
  <div>
    </div>
        </div>
       </div>
    </div>
  )
}

export default NavBar