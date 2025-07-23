import styles from '../pages/Dashboard/Dashboard.module.scss'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/images/logo.png'
import lendsqrlogo from '../assets/images/lendsqr.png'
import Bell from '../assets/icons/bell.png'
import ProfilePicture from '../assets/images/profile_picture.png'
import { IoIosSearch } from "react-icons/io";
import { FaCaretDown } from 'react-icons/fa';
import bell from '../assets/images/bell.png'
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCancelPresentation } from "react-icons/md";
import {motion} from 'framer-motion'

type Props = {
  openSidebar:()=>void,
  sidebar:boolean
}

function NavBar({openSidebar, sidebar}: Props) {
  const navigate = useNavigate()
  return (
    <div className={styles.navbar}>
        <motion.div onClick={()=>navigate('/')} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }} viewport={{ amount: 0, once: true }} className={styles.navbar_logo} >
        <img src={logo}  style={{height:'23px', width:'23px'}}  alt="" />
        <img src={lendsqrlogo} alt="" />
       </motion.div >
       { sidebar?<MdOutlineCancelPresentation  onClick={openSidebar} className={styles.menu_icon} /> :<AiOutlineMenu onClick={openSidebar} className={styles.menu_icon} />}
       <div className={styles.navbar_right}>
        <div className={styles.nav_input}>
            <input type="text" placeholder='Search for anything'  />
            <button><IoIosSearch className={styles.icons} /></button>
        </div>
        <div className={styles.nav_input_right}>
           
            <Link state={{padding:"0 20px"}} to='https://github.com/Snotat/lendsqr-fe-test/blob/main/README.md'>Docs</Link>
            <img src={bell} alt=""/>
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