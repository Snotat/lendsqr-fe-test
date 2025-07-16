import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import styles  from './Dashboard.module.scss'
type Props = {}

function Dashboard({}: Props) {
  return (
    <div className={styles.dashboard}>
        <NavBar />
        <SideBar />
    </div>
  )
}

export default Dashboard