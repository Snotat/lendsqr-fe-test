import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import styles  from './Dashboard.module.scss'
import InfoCards from '../../components/InfoCards/InfoCards'
import MainDash from '../../components/MainDash/MainDash'
type Props = {}

function Dashboard({}: Props) {
  return (
    <div className={styles.dashboard}>
        <NavBar />
        <SideBar />
        <InfoCards />
        <MainDash />
    </div>
  )
}

export default Dashboard