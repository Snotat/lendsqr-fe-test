import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom"; 
import { FiChevronDown } from "react-icons/fi";
import switch_org_icon from "../../assets/icons/briefcase 1.png"; 
import styles from "./Sidebar.module.scss";
import { sidebarData } from "./sidebar-data"; 
import logoutIcon from '../../assets/icons/logout_icon.png'
import { SidebarItem } from "../../types/UserTypes";
interface SidebarProps{
  open:boolean
}
const SideBar: React.FC<SidebarProps> = ({open}) => {
  useEffect(()=>{
console.log('opeeeeen', open)
  },[open])
  const location = useLocation();

  const isActiveLink = (linkPath: string | undefined): boolean => {
    if (!linkPath) return false;
    const currentPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
    const targetPath = linkPath.endsWith('/') ? linkPath.slice(0, -1) : linkPath;

    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  return (
    <div className={`${styles.side_container} ${open ? styles.side_container_open : ''}`}>
      <div className={styles.sidebar}> 
        <div className={styles.switch}>
          <img src={switch_org_icon} alt="Switch Organization" className={styles.switchIcon} />
          <p className={styles.text}>Switch Organization</p>
          <FiChevronDown className={styles.icon} />
        </div>

        <nav> 
          {sidebarData.map((item: SidebarItem, idx: number) => (
            <div className={styles.collection} key={idx}> 
              {item.children ? (
                <>
                  <p className={styles.heading}>{item.title}</p>
                  {item.children.map((child: SidebarItem, index: number) => (
                    <NavLink
                      key={index} 
                      to={child.link || "#"} 
                      className={({ isActive }) =>
                        `${styles.item} ${isActiveLink(child.link) ? styles.active : ""}` 
                      }
                      end 
                    >
                      {child.icon && <img src={child.icon} className={styles.img} alt={child.title} />}
                      <p className={styles.text}>{child.title}</p>
                    </NavLink>
                  ))}
                </>
              ) : (
                <NavLink
                  key={idx}
                  to={item.link || "#"}
                  className={({ isActive }) =>
                    `${styles.item} ${isActiveLink(item.link) ? styles.active : ""}`
                  }
                  end
                >
                  {item.icon && <img src={item.icon} className={styles.img} alt={item.title} />}
                  <p className={styles.text}>{item.title}</p>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
        <div className={styles.bottom_sec}>
          <div className={styles.item}>
            { <img src={logoutIcon} className={styles.img} alt='Logout Icon' />}
               <p className={styles.text}>Logout</p>
               
          </div>
          <span>v1.2.0</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;